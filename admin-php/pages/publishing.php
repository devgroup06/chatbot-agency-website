<?php
/**
 * Connect (or change) publishing — the GitHub token the panel commits with.
 * Optional at install time, so this is where it gets filled in afterwards.
 */

$pageTitle = 'Publishing';
$cfg       = gh_config();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    check_csrf();

    $token  = trim($_POST['gh_token'] ?? '');
    $repo   = trim($_POST['gh_repo'] ?? '');
    $branch = trim($_POST['gh_branch'] ?? '') ?: 'main';

    if (($_POST['action'] ?? '') === 'disconnect') {
        $config = config();
        $config['github'] = ['token' => '', 'repo' => $repo, 'branch' => $branch];
        [$ok, $msg] = save_config($config);
        if ($ok) {
            $notice = 'Publishing disconnected. The token has been removed from this server.';
        } else {
            $error = $msg;
        }
        $cfg = gh_config();
    } else {
        // A blank token means "keep the stored one" so the repo or branch can
        // be changed without re-entering it.
        $token = $token !== '' ? $token : $cfg['token'];

        if ($token === '' || $repo === '') {
            $error = 'Enter both a GitHub token and a repository.';
        } else {
            [$ok, $msg] = gh_check_access($token, $repo);
            if (!$ok) {
                $error = $msg;
            } else {
                $config = config();
                $config['github'] = ['token' => $token, 'repo' => $repo, 'branch' => $branch];
                [$saved, $saveMsg] = save_config($config);
                if ($saved) {
                    $notice = 'Publishing connected. Saves now go live automatically.';
                } else {
                    $error = $saveMsg;
                }
                $cfg = gh_config();
            }
        }
    }
}

$connected = gh_configured();
[$ghOk, $ghMessage] = gh_check_access();

include __DIR__ . '/layout_top.php';
?>

<h1 class="page-title">Publishing</h1>
<p class="page-sub">This is what lets the panel save your changes to the live site. Optional — the panel
works without it, but nothing you save will reach dialoghive.com until it is connected.</p>

<div class="status <?= $ghOk ? 'ok' : 'bad' ?>">
  <strong>Status:</strong> <?= e($ghMessage) ?>
</div>

<form method="post" class="form narrow" style="margin-top:1.5rem">
  <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
  <div class="field">
    <label>GitHub token</label>
    <input type="password" name="gh_token" autocomplete="off"
           placeholder="<?= $connected ? 'Saved — leave blank to keep it' : 'ghp_…' ?>">
    <p class="hint">Create at <a href="https://github.com/settings/tokens/new" target="_blank" rel="noopener">github.com/settings/tokens/new</a>
    with the <strong>repo</strong> scope. Entered once, stored on your own server.</p>
  </div>
  <div class="field">
    <label>Repository</label>
    <input type="text" name="gh_repo" value="<?= e($cfg['repo']) ?>" placeholder="devgroup06/chatbot-agency-website">
  </div>
  <div class="field">
    <label>Branch</label>
    <input type="text" name="gh_branch" value="<?= e($cfg['branch'] ?: 'main') ?>">
  </div>
  <div class="form-actions">
    <button type="submit" class="btn"><?= $connected ? 'Update publishing' : 'Connect publishing' ?></button>
  </div>
</form>

<?php if ($connected): ?>
  <form method="post" class="form narrow" style="margin-top:1rem"
        onsubmit="return confirm('Remove the stored token? Saves will stop reaching the live site until you reconnect.')">
    <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
    <input type="hidden" name="action" value="disconnect">
    <input type="hidden" name="gh_repo" value="<?= e($cfg['repo']) ?>">
    <input type="hidden" name="gh_branch" value="<?= e($cfg['branch']) ?>">
    <p class="hint">Removes the token from this server. Your content is untouched.</p>
    <button type="submit" class="btn danger">Disconnect publishing</button>
  </form>
<?php endif; ?>

<?php include __DIR__ . '/layout_bottom.php'; ?>
