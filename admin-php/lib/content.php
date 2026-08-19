<?php
/** Blog frontmatter parsing plus the recursive JSON form builder. */

/** Splits a markdown file into [frontmatter array, body string]. */
function parse_frontmatter(string $raw): array
{
    if (!preg_match('/^---\R(.*?)\R---\R?(.*)$/s', $raw, $m)) {
        return [[], $raw];
    }

    $meta = [];
    foreach (preg_split('/\R/', $m[1]) as $line) {
        if (!preg_match('/^([A-Za-z_]+):\s*(.*)$/', $line, $kv)) {
            continue;
        }
        $key   = $kv[1];
        $value = trim($kv[2]);

        if (str_starts_with($value, '[') && str_ends_with($value, ']')) {
            $decoded = json_decode($value, true);
            $meta[$key] = is_array($decoded)
                ? $decoded
                : array_values(array_filter(array_map(
                    fn($v) => trim($v, " \"'"),
                    explode(',', trim($value, '[]'))
                ), 'strlen'));
            continue;
        }
        $meta[$key] = trim($value, "\"'");
    }

    return [$meta, $m[2]];
}

function build_frontmatter(array $meta, string $body): string
{
    $lines = ['---'];
    foreach ($meta as $key => $value) {
        $lines[] = is_array($value)
            ? $key . ': ' . json_encode(array_values($value), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)
            : $key . ': ' . json_encode((string) $value, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }
    $lines[] = '---';
    $lines[] = '';

    return implode("\n", $lines) . rtrim($body) . "\n";
}

function slugify(string $text): string
{
    $text = strtolower(trim($text));
    $text = preg_replace('/[\x{2018}\x{2019}\']/u', '', $text);
    $text = preg_replace('/[^a-z0-9]+/', '-', $text);
    return substr(trim($text, '-'), 0, 70);
}

/**
 * Turns a human label out of a JSON key: heroTitle → "Hero title".
 */
function humanize(string $key): string
{
    $spaced = preg_replace('/(?<!^)[A-Z]/', ' $0', $key);
    $spaced = str_replace(['_', '-'], ' ', $spaced);
    return ucfirst(strtolower($spaced) === $spaced ? $spaced : strtolower($spaced));
}

/** Long-form keys get a textarea instead of a single-line input. */
function is_long_text(string $key, string $value): bool
{
    $longKeys = ['desc', 'description', 'a', 'answer', 'body', 'subtitle', 'intro',
                 'formIntro', 'heroSubtitle', 'seoDescription', 'tagline'];
    return in_array($key, $longKeys, true) || strlen($value) > 110;
}

/**
 * Renders a nested PHP value (decoded JSON) as form fields.
 * Field names are built as data[key][0][subkey], which PHP re-assembles
 * into the same nested shape on submit.
 */
function render_fields($value, string $name, string $label = '', int $depth = 0): void
{
    if (is_bool($value)) {
        $checked = $value ? 'checked' : '';
        echo '<label class="field checkbox">';
        echo '<input type="hidden" name="' . e($name) . '" value="0">';
        echo "<input type=\"checkbox\" name=\"" . e($name) . "\" value=\"1\" $checked> ";
        echo '<span>' . e($label) . '</span></label>';
        return;
    }

    if (is_scalar($value) || $value === null) {
        $value = (string) $value;
        $key   = $label;
        echo '<div class="field"><label>' . e($label) . '</label>';
        if (is_long_text($name, $value) || is_long_text($key, $value)) {
            echo '<textarea name="' . e($name) . '" rows="3">' . e($value) . '</textarea>';
        } else {
            echo '<input type="text" name="' . e($name) . '" value="' . e($value) . '">';
        }
        echo '</div>';
        return;
    }

    if (is_array($value) && array_is_list($value)) {
        echo '<div class="list-group" data-list data-base="' . e($name) . '">';
        echo '<div class="list-head"><strong>' . e($label) . '</strong>';
        echo '<button type="button" class="btn-mini" data-add>+ Add</button></div>';
        foreach ($value as $i => $item) {
            echo '<div class="list-item" data-item>';
            echo '<button type="button" class="btn-remove" data-remove title="Remove">×</button>';
            render_fields($item, $name . '[' . $i . ']', is_scalar($item) ? 'Item ' . ($i + 1) : '', $depth + 1);
            echo '</div>';
        }
        echo '</div>';
        return;
    }

    // Associative array → fieldset
    if ($depth > 0 && $label !== '') {
        echo '<fieldset class="group"><legend>' . e($label) . '</legend>';
    }
    foreach ($value as $key => $sub) {
        render_fields($sub, $name . '[' . $key . ']', humanize((string) $key), $depth + 1);
    }
    if ($depth > 0 && $label !== '') {
        echo '</fieldset>';
    }
}

/**
 * Submitted values arrive as strings; restore the booleans and drop the
 * blank rows that "+ Add" leaves behind, using the original as a template.
 */
function merge_submission($original, $submitted)
{
    if (is_bool($original)) {
        return (string) $submitted === '1';
    }

    if (is_array($original) && array_is_list($original)) {
        $template = $original[0] ?? '';
        $out      = [];
        foreach ((array) $submitted as $item) {
            $merged = merge_submission($template, $item);
            if (is_string($merged) && trim($merged) === '') {
                continue;
            }
            if (is_array($merged) && !array_filter($merged, fn($v) => is_string($v) ? trim($v) !== '' : true)) {
                continue;
            }
            $out[] = $merged;
        }
        return $out;
    }

    if (is_array($original)) {
        $out = [];
        foreach ($original as $key => $value) {
            $out[$key] = array_key_exists($key, (array) $submitted)
                ? merge_submission($value, $submitted[$key])
                : $value;
        }
        return $out;
    }

    return is_array($submitted) ? $original : (string) $submitted;
}

/** The pages the dashboard can edit, and where they live in the repo. */
function editable_files(): array
{
    return [
        'settings' => ['label' => 'Brand & Contact',  'path' => 'website/content/settings.json'],
        'home'     => ['label' => 'Home Page',        'path' => 'website/content/home.json'],
        'about'    => ['label' => 'About Page',       'path' => 'website/content/about.json'],
        'services' => ['label' => 'Services Page',    'path' => 'website/content/services.json'],
        'pricing'  => ['label' => 'Pricing Page',     'path' => 'website/content/pricing.json'],
        'contact'  => ['label' => 'Contact Page',     'path' => 'website/content/contact.json'],
    ];
}
