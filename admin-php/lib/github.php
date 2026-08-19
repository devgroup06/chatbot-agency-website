<?php
/**
 * Thin GitHub Contents API client.
 *
 * The website is a static Next.js export built from this repository, so the
 * admin panel edits content by committing to GitHub — the push then triggers
 * the deploy workflow. Nothing is written to the web server itself.
 *
 * Publishing is optional at install time: until a token is saved the panel
 * still runs, and every call below reports that it is not connected yet.
 */

require_once __DIR__ . '/db.php';

const GH_NOT_CONNECTED = 'Publishing is not connected yet — add a GitHub token under Account → Publishing.';

/** Publishing settings, with defaults for installs that skipped setup step 3. */
function gh_config(): array
{
    $cfg = config()['github'] ?? [];
    return [
        'token'  => (string) ($cfg['token'] ?? ''),
        'repo'   => (string) ($cfg['repo'] ?? ''),
        'branch' => (string) ($cfg['branch'] ?? 'main'),
    ];
}

/** True once both a token and a repository have been saved. */
function gh_configured(): bool
{
    $cfg = gh_config();
    return $cfg['token'] !== '' && $cfg['repo'] !== '';
}

function gh_request(string $method, string $path, ?array $body = null): array
{
    $cfg = gh_config();
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
    $cfg = gh_config();
    return '/repos/' . $cfg['repo'] . '/contents/' . ltrim($path, '/')
        . '?ref=' . rawurlencode($cfg['branch']);
}

/** Returns ['content' => string, 'sha' => string] or null when missing. */
function gh_get_file(string $path): ?array
{
    if (!gh_configured()) {
        return null;
    }

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
    if (!gh_configured()) {
        return [];
    }

    $res = gh_request('GET', gh_repo_path($path));
    if ($res['status'] !== 200 || !is_array($res['data'])) {
        return [];
    }
    return $res['data'];
}

/** Creates or updates a file. Returns [ok, message]. */
function gh_put_file(string $path, string $content, string $message): array
{
    if (!gh_configured()) {
        return [false, GH_NOT_CONNECTED];
    }

    $cfg      = gh_config();
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
    if (!gh_configured()) {
        return [false, GH_NOT_CONNECTED];
    }

    $cfg      = gh_config();
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

/**
 * Verifies a token can write to a repo. Without arguments it checks whatever
 * is stored in config.php; the publishing page passes candidates to test them
 * before saving. Returns [ok, message].
 */
function gh_check_access(?string $token = null, ?string $repo = null): array
{
    if ($token === null && $repo === null) {
        if (!gh_configured()) {
            return [false, GH_NOT_CONNECTED];
        }
        $cfg   = gh_config();
        $token = $cfg['token'];
        $repo  = $cfg['repo'];
    }

    $ch = curl_init('https://api.github.com/repos/' . $repo);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER     => [
            'Accept: application/vnd.github+json',
            'Authorization: Bearer ' . $token,
            'X-GitHub-Api-Version: 2022-11-28',
            'User-Agent: DialogHive-Admin',
        ],
        CURLOPT_TIMEOUT => 20,
    ]);
    $raw    = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    $data = json_decode((string) $raw, true);

    if ($status !== 200) {
        return [false, "GitHub rejected the token (HTTP {$status}). Check the token and repository name."];
    }
    if (empty($data['permissions']['push'])) {
        return [false, 'That token cannot write to the repository. It needs the "repo" scope (classic) or Contents: Read and write (fine-grained).'];
    }
    return [true, 'Connected to ' . $repo];
}
