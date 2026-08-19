<?php
$pageTitle = 'Dashboard';

$posts = array_values(array_filter(
    gh_list_dir('website/content/blog'),
    fn($f) => ($f['type'] ?? '') === 'file' && str_ends_with($f['name'], '.md')
));
[$ghOk, $ghMessage] = gh_check_access();

include __DIR__ . '/layout_top.php';
?>

<h1 class="page-title">Welcome back<?= $user['name'] ? ', ' . e(explode(' ', $user['name'])[0]) : '' ?></h1>
<p class="page-sub">Edit your website content here. Every save publishes automatically — the live site
updates about 2–3 minutes later.</p>

<div class="cards">
  <a class="card" href="index.php?page=blog">
    <p class="card-num"><?= count($posts) ?></p>
    <p class="card-label">Blog posts</p>
    <p class="card-hint">Write, edit or delete articles →</p>
  </a>
  <a class="card" href="index.php?page=content&file=pricing">
    <p class="card-num">3</p>
    <p class="card-label">Pricing plans</p>
    <p class="card-hint">Change prices and features →</p>
  </a>
  <a class="card" href="index.php?page=content&file=settings">
    <p class="card-num">◆</p>
    <p class="card-label">Brand &amp; contact</p>
    <p class="card-hint">Phone numbers, email, address →</p>
  </a>
</div>

<h2 class="section-head">Edit a page</h2>
<div class="tiles">
  <?php foreach (editable_files() as $key => $file): ?>
    <a class="tile" href="index.php?page=content&file=<?= e($key) ?>">
      <strong><?= e($file['label']) ?></strong>
      <span>Headings, text, FAQs</span>
    </a>
  <?php endforeach; ?>
</div>

<h2 class="section-head">Latest blog posts</h2>
<?php if (!$posts): ?>
  <p class="muted">No posts yet. <a href="index.php?page=post">Write your first one →</a></p>
<?php else: ?>
  <ul class="simple-list">
    <?php foreach (array_slice(array_reverse($posts), 0, 5) as $p): ?>
      <li>
        <a href="index.php?page=post&slug=<?= e(basename($p['name'], '.md')) ?>">
          <?= e(basename($p['name'], '.md')) ?>
        </a>
      </li>
    <?php endforeach; ?>
  </ul>
<?php endif; ?>

<div class="status <?= $ghOk ? 'ok' : 'bad' ?>">
  <strong>Publishing:</strong> <?= e($ghMessage) ?>
  <?php if (!$ghOk): ?><a href="index.php?page=publishing">Set it up →</a><?php endif; ?>
</div>

<?php include __DIR__ . '/layout_bottom.php'; ?>
