# DialogHive — Chatbot Agency Website

Branded marketing website for the AI Chatbot Agency product (multi-tenant AI chatbots for WhatsApp, Facebook Messenger, Instagram DM and websites), live at **https://demo.dialoghive.com**.

## Repo Layout

| Folder | Purpose |
|---|---|
| `/website` | Next.js marketing website (App Router + TypeScript + Tailwind, static export) |
| `/.github/workflows` | CI: auto blog posting (Mistral AI, 3×/day) + auto deploy to Hostinger via FTP |

## Quick Start

```bash
cd website
npm install
npm run dev        # http://localhost:3005
npm run build      # static export → website/out/
```

## Highlights

- **Brand + logo** — custom DialogHive logo (hive hexagon + chat bubble), amber/ink palette
- **Pages** — Home (landing), About, Services, Pricing, Contact, Blog (+ per-post pages)
- **FAQs & interlinking** — every page has an FAQ section with `FAQPage` JSON-LD, plus heavy internal linking (header, footer, contextual links, related posts)
- **On-page SEO** — per-page titles/descriptions/canonicals, Open Graph, JSON-LD (Organization, WebSite, FAQPage, BlogPosting, BreadcrumbList), `sitemap.xml`, `robots.txt`, semantic HTML
- **Auto blogging** — `website/scripts/generate-blog.mjs` writes SEO posts with the Mistral AI API; a scheduled GitHub Action publishes 3 posts/day and redeploys
- **Auto deploy** — every push to `main` that touches `website/` builds the static site and FTP-deploys it to Hostinger (demo.dialoghive.com)

See [website/README.md](website/README.md) for full setup (GitHub secrets, Hostinger hPanel steps).
