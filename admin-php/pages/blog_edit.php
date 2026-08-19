<?php
$slug      = preg_replace('/[^a-z0-9\-]/', '', $_GET['slug'] ?? '');
$isNew     = $slug === '';
$pageTitle = $isNew ? 'New post' : 'Edit post';

$meta = ['title' => '', 'description' => '', 'date' => date('Y-m-d'), 'tags' => [], 'author' => 'DialogHive Team'];
$body = '';

if (!$isNew) {
    $file = gh_get_file("website/content/blog/{$slug}.md");
    if ($file) {
        [$loadedMeta, $body] = parse_frontmatter($file['content']);
        $meta = array_merge($meta, $loadedMeta);
    } else {
        $error = 'That post could not be loaded.';
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    check_csrf();

    $meta['title']       = trim($_POST['title'] ?? '');
    $meta['description'] = trim($_POST['description'] ?? '');
    $meta['date']        = trim($_POST['date'] ?? date('Y-m-d'));
    $meta['author']      = trim($_POST['author'] ?? 'DialogHive Team');
    $meta['tags']        = array_values(array_filter(array_map('trim', explode(',', $_POST['tags'] ?? '')), 'strlen'));
    $body                = $_POST['body'] ?? '';

    if ($meta['title'] === '') {
        $error = 'Please give the post a title.';
    } else {
        $targetSlug = $isNew ? slugify($meta['title']) : $slug;
        [$ok, $msg] = gh_put_file(
            "website/content/blog/{$targetSlug}.md",
            build_frontmatter($meta, $body),
            ($isNew ? 'blog: add ' : 'blog: update ') . $targetSlug . ' (via admin)'
        );

        if ($ok) {
            header('Location: index.php?page=post&slug=' . urlencode($targetSlug) . '&saved=1');
            exit;
        }
        $error = $msg;
    }
}

if (isset($_GET['saved'])) {
    $notice = 'Saved. The site rebuilds and goes live in 2–3 minutes.';
}

include __DIR__ . '/layout_top.php';
?>

<div class="page-head">
  <h1 class="page-title"><?= $isNew ? 'New post' : 'Edit post' ?></h1>
  <a class="link" href="index.php?page=blog">← All posts</a>
</div>

<form method="post" class="form">
  <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">

  <div class="field">
    <label>Title</label>
    <input type="text" name="title" value="<?= e($meta['title']) ?>" required
           placeholder="How WhatsApp Chatbots Win More Customers">
  </div>

  <div class="field">
    <label>Meta description <span class="hint">— the grey text Google shows under your title</span></label>
    <textarea name="description" rows="2"><?= e($meta['description']) ?></textarea>
  </div>

  <div class="row">
    <div class="field">
      <label>Date</label>
      <input type="date" name="date" value="<?= e(substr((string) $meta['date'], 0, 10)) ?>">
    </div>
    <div class="field">
      <label>Author</label>
      <input type="text" name="author" value="<?= e($meta['author']) ?>">
    </div>
    <div class="field">
      <label>Tags <span class="hint">— comma separated</span></label>
      <input type="text" name="tags" value="<?= e(implode(', ', (array) $meta['tags'])) ?>"
             placeholder="WhatsApp, Automation">
    </div>
  </div>

  <div class="field">
    <label>Post content <span class="hint">— Markdown: ## Heading, **bold**, - bullet, [link](/contact/)</span></label>
    <textarea name="body" rows="22" class="mono"><?= e($body) ?></textarea>
  </div>

  <div class="form-actions">
    <button type="submit" class="btn">Save &amp; publish</button>
    <?php if (!$isNew): ?>
      <a class="link" href="https://dialoghive.com/blog/<?= e($slug) ?>/" target="_blank" rel="noopener">View live ↗</a>
    <?php endif; ?>
  </div>
</form>

<?php include __DIR__ . '/layout_bottom.php'; ?>
