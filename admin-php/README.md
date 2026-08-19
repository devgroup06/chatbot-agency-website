# DialogHive Admin (PHP)

Password-protected dashboard for editing the website, deployed to
**https://dialoghive.com/manage/** on Hostinger shared hosting.

It does **not** render the public site — that stays a Next.js static export. The panel edits the
content files in the GitHub repo; the push triggers the existing deploy workflow, so changes are
live 2–3 minutes after saving.

```
you → /manage/ (PHP) → GitHub commit → Actions build → FTP upload → live site
```

## What it edits

| Screen | Repo file |
|---|---|
| Blog Posts | `website/content/blog/*.md` |
| Home / About / Services / Pricing / Contact | `website/content/*.json` |
| Brand & Contact | `website/content/settings.json` |

Page forms are generated from the JSON itself, so adding a field to a content file automatically
adds it to the dashboard.

## First-time setup

1. **hPanel → Databases → MySQL Databases** — create a database and user, note the credentials.
2. Open **https://dialoghive.com/manage/install.php** and fill in:
   - the database details
   - your admin name, email and password (this becomes your login)
   - a GitHub token with the `repo` scope, from https://github.com/settings/tokens/new
3. Submit. It creates the `admin_users` table, your account, and writes `config.php`.
4. Delete `install.php` from the server, then log in at `/manage/`.

`config.php` is written on the server and is intentionally not in git — it holds the database
password and the GitHub token.

## Files

```
admin-php/
├─ index.php            # front controller + login handling
├─ install.php          # one-time setup wizard
├─ lib/
│  ├─ db.php            # config loader + PDO
│  ├─ auth.php          # sessions, login, CSRF
│  ├─ github.php        # Contents API read/write
│  └─ content.php       # frontmatter parsing + recursive form builder
├─ pages/               # login, dashboard, blog list/edit, content edit, account
└─ assets/style.css
```

Requires PHP 8.0+ with PDO MySQL and cURL (Hostinger has all three by default).
