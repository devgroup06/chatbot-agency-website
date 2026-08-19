<?php $current = $_GET['page'] ?? 'dashboard'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title><?= isset($pageTitle) ? e($pageTitle) . ' — ' : '' ?>DialogHive Admin</title>
  <link rel="icon" href="/logo.svg">
  <link rel="stylesheet" href="assets/style.css">
</head>
<body>
<header class="topbar">
  <a class="brand" href="index.php">
    <span class="brand-mark">◆</span> Dialog<span class="brand-accent">Hive</span>
    <span class="brand-sub">Admin</span>
  </a>
  <div class="topbar-right">
    <a class="link" href="https://demo.dialoghive.com/" target="_blank" rel="noopener">View site ↗</a>
    <span class="who"><?= e($user['name'] ?: $user['email']) ?></span>
    <a class="link" href="index.php?page=logout">Log out</a>
  </div>
</header>

<div class="shell">
  <nav class="sidebar">
    <a class="<?= $current === 'dashboard' ? 'on' : '' ?>" href="index.php">Dashboard</a>
    <a class="<?= in_array($current, ['blog', 'post'], true) ? 'on' : '' ?>" href="index.php?page=blog">Blog Posts</a>
    <p class="side-label">Pages</p>
    <?php foreach (editable_files() as $key => $file): ?>
      <a class="<?= ($current === 'content' && ($_GET['file'] ?? '') === $key) ? 'on' : '' ?>"
         href="index.php?page=content&file=<?= e($key) ?>"><?= e($file['label']) ?></a>
    <?php endforeach; ?>
    <p class="side-label">Account</p>
    <a class="<?= $current === 'account' ? 'on' : '' ?>" href="index.php?page=account">Change password</a>
  </nav>

  <main class="main">
    <?php if (!empty($notice)): ?><div class="alert ok"><?= e($notice) ?></div><?php endif; ?>
    <?php if (!empty($error)): ?><div class="alert bad"><?= e($error) ?></div><?php endif; ?>
