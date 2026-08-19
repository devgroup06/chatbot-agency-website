<?php
/** Session-based login against the `admin_users` table. */

require_once __DIR__ . '/db.php';

function start_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    session_set_cookie_params([
        'httponly' => true,
        'samesite' => 'Lax',
        'secure'   => !empty($_SERVER['HTTPS']),
    ]);
    session_start();
}

function attempt_login(string $email, string $password): bool
{
    $stmt = db()->prepare('SELECT * FROM admin_users WHERE email = ? LIMIT 1');
    $stmt->execute([strtolower(trim($email))]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        return false;
    }

    start_session();
    session_regenerate_id(true);
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['email']   = $user['email'];
    $_SESSION['name']    = $user['name'];

    db()->prepare('UPDATE admin_users SET last_login_at = NOW() WHERE id = ?')
        ->execute([$user['id']]);

    return true;
}

function logout(): void
{
    start_session();
    $_SESSION = [];
    session_destroy();
}

function current_user(): ?array
{
    start_session();
    if (empty($_SESSION['user_id'])) {
        return null;
    }
    return [
        'id'    => $_SESSION['user_id'],
        'email' => $_SESSION['email'],
        'name'  => $_SESSION['name'] ?? '',
    ];
}

function require_login(): array
{
    $user = current_user();
    if (!$user) {
        header('Location: index.php?page=login');
        exit;
    }
    return $user;
}

/** CSRF: one token per session, checked on every POST. */
function csrf_token(): string
{
    start_session();
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf'];
}

function check_csrf(): void
{
    start_session();
    $sent = $_POST['csrf'] ?? '';
    if (!hash_equals($_SESSION['csrf'] ?? '', $sent)) {
        http_response_code(400);
        exit('Invalid request token. Please reload the page and try again.');
    }
}

function e(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}
