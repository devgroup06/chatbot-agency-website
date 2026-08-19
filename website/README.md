# DialogHive Website

Branded marketing website for the AI Chatbot Agency platform, live at **https://demo.dialoghive.com**.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS**, exported as a fully static site (`output: 'export'`) and deployed to Hostinger shared hosting via FTP through GitHub Actions.

## Pages

| Route | Purpose |
|---|---|
| `/` | Landing page — hero, channels, features, how it works, industries, latest posts, FAQ |
| `/about/` | Company story, values, stats, FAQ |
| `/services/` | 8 service sections with anchor links (`#whatsapp`, `#instagram`, …), FAQ |
| `/pricing/` | 3 plans (Starter / Growth / Scale), FAQ |
| `/contact/` | Demo request form (mailto-based, works on static hosting), FAQ |
| `/blog/` | Blog index — posts from `content/blog/*.md` |
| `/blog/[slug]/` | Post page with related posts, BlogPosting + Breadcrumb schema |

## SEO Features

- Per-page `<title>` / meta description / canonical via the Next.js Metadata API
- Open Graph + Twitter card tags, `metadataBase` set to the production domain
- JSON-LD structured data: `Organization`, `WebSite`, `FAQPage` (every page), `BlogPosting`, `BreadcrumbList`
- `sitemap.xml` and `robots.txt` generated at build time (includes all blog posts)
- Semantic HTML (single `h1` per page, `nav`/`article`/`section` landmarks), descriptive anchor text
- Heavy internal interlinking: header, footer columns, in-content contextual links, related posts
- Clean trailing-slash URLs (`/about/`), Apache caching + HTTPS redirect via `public/.htaccess`

## Local Development

```bash
cd website
npm install
npm run dev        # http://localhost:3005
npm run build      # static export → website/out/
```

## Blog Automation (Mistral AI — 3 posts/day)

`scripts/generate-blog.mjs` calls the Mistral chat API and writes a ready-to-publish markdown post (with frontmatter) into `content/blog/`.

```bash
MISTRAL_API_KEY=... npm run generate:blog          # 1 post
MISTRAL_API_KEY=... node scripts/generate-blog.mjs --count=3
```

The GitHub Action **`.github/workflows/blog-autopost.yml`** runs 3× daily (05:15, 11:15, 17:15 UTC), generates a post, commits + pushes it, rebuilds the site and deploys to Hostinger.

## Automatic Deployment (Hostinger)

**`.github/workflows/deploy-website.yml`** builds and FTP-deploys `website/out/` on every push that touches `website/`.

### One-time setup — GitHub repository settings

Add these **Actions secrets** (Repo → Settings → Secrets and variables → Actions):

| Secret | Value |
|---|---|
| `HOSTINGER_FTP_SERVER` | FTP host from hPanel (e.g. `ftp.dialoghive.com` or an IP) |
| `HOSTINGER_FTP_USERNAME` | FTP account username |
| `HOSTINGER_FTP_PASSWORD` | FTP account password |
| `MISTRAL_API_KEY` | API key from https://console.mistral.ai |

Optional **Actions variable**: `HOSTINGER_SERVER_DIR` — the remote folder to deploy into (defaults to `./`, i.e. the FTP account's root).

### One-time setup — Hostinger hPanel

1. Add **demo.dialoghive.com** as a subdomain and note its document root (e.g. `public_html/demo`).
2. Create a dedicated **FTP account** whose root is that document root (then `HOSTINGER_SERVER_DIR` can stay `./`).
3. Enable SSL for the subdomain (the bundled `.htaccess` forces HTTPS).

After that, every push deploys automatically, and blog posts publish themselves 3× a day.

<!-- deployed via GitHub Actions -->
<!-- retry deploy -->
