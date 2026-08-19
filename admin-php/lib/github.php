<?php
/**
 * Thin GitHub Contents API client.
 *
 * The website is a static Next.js export built from this repository, so the
 * admin panel edits content by committing to GitHub — the push then triggers
 * the deploy workflow. Nothing is written to the web server itself.
 */

require_once __DIR__ . '/db.php';

function gh_request(string $method, string $path, ?array $body = null): array
{
    $cfg = config()['github'];
    $url = 'https://api.github.com' . $path;

    $ch = curl_init($url);
    $headers = [
        'Accept: application/vnd.github+json',
        'Authorization: Bearer ' . $cfg['token'],
        'X-GitHub-Api-Version: 2022-11-28',
        'User-Agent: DialogHive-Admin',
    ];

    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST  => $method,
        CURLOPT_HTTPHEADER     => $headers,
        CURLOPT_TIMEOUT        => 30,
    ]);

    if ($body !== null) {
        $headers[] = 'Content-Type: application/json';
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
    }

    $raw    = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error  = curl_error($ch);
    curl_close($ch);

    if ($raw === false) {
        return ['status' => 0, 'data' => null, 'error' => $error];
    }

    return ['status' => $status, 'data' => json_decode($raw, true), 'error' => null];
}

function gh_repo_path(string $path): string
{
    $cfg = config()['github'];
    return '/repos/' . $cfg['repo'] . '/contents/' . ltrim($path, '/')
        . '?ref=' . rawurlencode($cfg['branch']);
}

/** Returns ['content' => string, 'sha' => string] or null when missing. */
function gh_get_file(string $path): ?array
{
    $res = gh_request('GET', gh_repo_path($path));
    if ($res['status'] !== 200 || empty($res['data']['content'])) {
        return null;
    }
    return [
        'content' => base64_decode(str_replace("\n", '', $res['data']['content'])),
        'sha'     => $res['data']['sha'],
    ];
}

/** Lists files in a repository directory. */
function gh_list_dir(string $path): array
{
    $res = gh_request('GET', gh_repo_path($path));
    if ($res['status'] !== 200 || !is_array($res['data'])) {
        return [];
    }
    return $res['data'];
}

/** Creates or updates a file. Returns [ok, message]. */
function gh_put_file(string $path, string $content, string $message): array
{
    $cfg      = config()['github'];
    $existing = gh_get_file($path);

    $body = [
        'message' => $message,
        'content' => base64_encode($content),
        'branch'  => $cfg['branch'],
    ];
    if ($existing) {
        $body['sha'] = $existing['sha'];
    }

    $res = gh_request('PUT', '/repos/' . $cfg['repo'] . '/contents/' . ltrim($path, '/'), $body);

    if (in_array($res['status'], [200, 201], true)) {
        return [true, 'Saved. The site rebuilds and goes live in 2–3 minutes.'];
    }

    $detail = $res['data']['message'] ?? $res['error'] ?? 'Unknown error';
    return [false, "GitHub rejected the save (HTTP {$res['status']}): {$detail}"];
}

function gh_delete_file(string $path, string $message): array
{
    $cfg      = config()['github'];
    $existing = gh_get_file($path);
    if (!$existing) {
        return [false, 'That file no longer exists.'];
    }

    $res = gh_request('DELETE', '/repos/' . $cfg['repo'] . '/contents/' . ltrim($path, '/'), [
        'message' => $message,
        'sha'     => $existing['sha'],
        'branch'  => $cfg['branch'],
    ]);

    return $res['status'] === 200
        ? [true, 'Deleted. The site rebuilds in 2–3 minutes.']
        : [false, 'Could not delete: ' . ($res['data']['message'] ?? 'unknown error')];
}

/** Verifies the stored token can write to the configured repo. */
function gh_check_access(): array
{
    $cfg = config()['github'];
    $res = gh_request('GET', '/repos/' . $cfg['repo']);
    if ($res['status'] !== 200) {
        return [false, 'Cannot reach the repository (HTTP ' . $res['status'] . ').'];
    }
    if (empty($res['data']['permissions']['push'])) {
        return [false, 'The saved GitHub token cannot write to this repository.'];
    }
    return [true, 'Connected to ' . $cfg['repo']];
}
