<?php
$pageTitle = 'Blog Posts';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'delete') {
    check_csrf();
    $slug = preg_replace('/[^a-z0-9\-]/', '', $_POST['slug'] ?? '');
    if ($slug !== '') {
        [$ok, $msg] = gh_delete_file("website/content/blog/{$slug}.md", "blog: delete {$slug} (via admin)");
        $ok ? $notice = $msg : $error = $msg;
    }
}

$files = array_values(array_filter(
    gh_list_dir('website/content/blog'),
    fn($f) => ($f['type'] ?? '') === 'file' && str_ends_with($f['name'], '.md')
));
usort($files, fn($a, $b) => strcmp($b['name'], $a['name']));

include __DIR__ . '/layout_top.php';
?>

<div class="page-head">
  <div>
    <h1 class="page-title">Blog Posts</h1>
    <p class="page-sub">Mistral AI also adds posts here automatically, three times a day.</p>
  </div>
  <a class="btn" href="index.php?page=post">+ New post</a>
</div>

<?php if (!$files): ?>
  <p class="muted">No posts yet.</p>
<?php else: ?>
  <table class="table">
    <thead><tr><th>Post</th><th class="right">Actions</th></tr></thead>
    <tbody>
      <?php foreach ($files as $f): $slug = basename($f['name'], '.md'); ?>
        <tr>
          <td><a href="index.php?page=post&slug=<?= e($slug) ?>"><?= e($slug) ?></a></td>
          <td class="right">
            <a class="link" href="https://demo.dialoghive.com/blog/<?= e($slug) ?>/" target="_blank" rel="noopener">View ↗</a>
            <a class="link" href="index.php?page=post&slug=<?= e($slug) ?>">Edit</a>
            <form method="post" class="inline" onsubmit="return confirm('Delete this post permanently?');">
              <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
              <input type="hidden" name="action" value="delete">
              <input type="hidden" name="slug" value="<?= e($slug) ?>">
              <button type="submit" class="link danger">Delete</button>
            </form>
          </td>
        </tr>
      <?php endforeach; ?>
    </tbody>
  </table>
<?php endif; ?>

<?php include __DIR__ . '/layout_bottom.php'; ?>
