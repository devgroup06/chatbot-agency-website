<?php
/**
 * DialogHive admin — front controller.
 *
 * Edits are committed to GitHub, which triggers the deploy workflow that
 * rebuilds and uploads the static site. Nothing here serves the public site.
 */

require_once __DIR__ . '/lib/db.php';
require_once __DIR__ . '/lib/auth.php';
require_once __DIR__ . '/lib/github.php';
require_once __DIR__ . '/lib/content.php';

$page   = $_GET['page'] ?? 'dashboard';
$notice = null;
$error  = null;

// ------------------------------------------------------------------ logout
if ($page === 'logout') {
    logout();
    header('Location: index.php?page=login');
    exit;
}

// ------------------------------------------------------------------- login
if ($page === 'login') {
    if (current_user()) {
        header('Location: index.php');
        exit;
    }
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        check_csrf();
        if (attempt_login($_POST['email'] ?? '', $_POST['password'] ?? '')) {
            header('Location: index.php');
            exit;
        }
        $error = 'Wrong email or password.';
    }
    include __DIR__ . '/pages/login.php';
    exit;
}

// Everything below needs a session.
$user = require_login();

switch ($page) {
    case 'blog':
        include __DIR__ . '/pages/blog_list.php';
        break;
    case 'post':
        include __DIR__ . '/pages/blog_edit.php';
        break;
    case 'content':
        include __DIR__ . '/pages/content_edit.php';
        break;
    case 'publishing':
        include __DIR__ . '/pages/publishing.php';
        break;
    case 'account':
        include __DIR__ . '/pages/account.php';
        break;
    default:
        include __DIR__ . '/pages/dashboard.php';
}
