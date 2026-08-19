<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>Log in — DialogHive Admin</title>
  <link rel="icon" href="/logo.svg">
  <link rel="stylesheet" href="assets/style.css">
</head>
<body class="login-body">
  <form class="login-card" method="post" action="index.php?page=login">
    <div class="login-logo">
      <svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
        <path d="M32 3 56 16.5v27L32 57 8 43.5v-27L32 3Z" fill="#0f172a" stroke="#f59e0b" stroke-width="3" stroke-linejoin="round"/>
        <path d="M20 22h24a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H31l-7 6v-6h-4a3 3 0 0 1-3-3V25a3 3 0 0 1 3-3Z" fill="#f59e0b"/>
        <circle cx="25.5" cy="31" r="2.4" fill="#0f172a"/><circle cx="32" cy="31" r="2.4" fill="#0f172a"/><circle cx="38.5" cy="31" r="2.4" fill="#0f172a"/>
      </svg>
    </div>
    <h1>DialogHive Admin</h1>
    <p class="login-sub">Sign in to manage your website content.</p>

    <?php if (!empty($error)): ?><div class="alert bad"><?= e($error) ?></div><?php endif; ?>

    <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
    <label>Email</label>
    <input type="email" name="email" required autofocus autocomplete="username" placeholder="you@dialoghive.com">
    <label>Password</label>
    <input type="password" name="password" required autocomplete="current-password" placeholder="••••••••">
    <button type="submit">Log in</button>
  </form>
</body>
</html>
