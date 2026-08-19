<?php
$files = editable_files();
$key   = $_GET['file'] ?? 'settings';

if (!isset($files[$key])) {
    http_response_code(404);
    exit('Unknown page.');
}

$file      = $files[$key];
$pageTitle = $file['label'];

$loaded = gh_get_file($file['path']);
if (!$loaded) {
    $error = 'Could not load this content file from GitHub.';
    $data  = [];
} else {
    $data = json_decode($loaded['content'], true) ?? [];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $data) {
    check_csrf();
    $updated = merge_submission($data, $_POST['data'] ?? []);
    $json    = json_encode($updated, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . "\n";

    [$ok, $msg] = gh_put_file($file['path'], $json, "content: update {$file['label']} (via admin)");
    if ($ok) {
        $notice = $msg;
        $data   = $updated;
    } else {
        $error = $msg;
    }
}

include __DIR__ . '/layout_top.php';
?>

<div class="page-head">
  <div>
    <h1 class="page-title"><?= e($file['label']) ?></h1>
    <p class="page-sub">Change any text below and save — the live site updates in 2–3 minutes.</p>
  </div>
  <?php if ($key !== 'settings'): ?>
    <a class="link" href="https://dialoghive.com/<?= $key === 'home' ? '' : e($key) . '/' ?>"
       target="_blank" rel="noopener">View page ↗</a>
  <?php endif; ?>
</div>

<?php if ($data): ?>
  <form method="post" class="form">
    <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
    <?php render_fields($data, 'data'); ?>
    <div class="form-actions">
      <button type="submit" class="btn">Save &amp; publish</button>
    </div>
  </form>
<?php endif; ?>

<?php include __DIR__ . '/layout_bottom.php'; ?>
