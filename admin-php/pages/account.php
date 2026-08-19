<?php
$pageTitle = 'Change password';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    check_csrf();
    $currentPassword = $_POST['current'] ?? '';
    $new             = $_POST['new'] ?? '';
    $confirm         = $_POST['confirm'] ?? '';

    $stmt = db()->prepare('SELECT password_hash FROM admin_users WHERE id = ?');
    $stmt->execute([$user['id']]);
    $row = $stmt->fetch();

    if (!$row || !password_verify($currentPassword, $row['password_hash'])) {
        $error = 'Your current password is not correct.';
    } elseif (strlen($new) < 8) {
        $error = 'The new password must be at least 8 characters.';
    } elseif ($new !== $confirm) {
        $error = 'The two new passwords do not match.';
    } else {
        db()->prepare('UPDATE admin_users SET password_hash = ? WHERE id = ?')
            ->execute([password_hash($new, PASSWORD_DEFAULT), $user['id']]);
        $notice = 'Password changed.';
    }
}

include __DIR__ . '/layout_top.php';
?>

<h1 class="page-title">Change password</h1>
<p class="page-sub">Signed in as <?= e($user['email']) ?></p>

<form method="post" class="form narrow">
  <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
  <div class="field">
    <label>Current password</label>
    <input type="password" name="current" required autocomplete="current-password">
  </div>
  <div class="field">
    <label>New password <span class="hint">— at least 8 characters</span></label>
    <input type="password" name="new" required autocomplete="new-password">
  </div>
  <div class="field">
    <label>Repeat new password</label>
    <input type="password" name="confirm" required autocomplete="new-password">
  </div>
  <div class="form-actions">
    <button type="submit" class="btn">Update password</button>
  </div>
</form>

<?php include __DIR__ . '/layout_bottom.php'; ?>
