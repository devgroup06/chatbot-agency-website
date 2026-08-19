#!/usr/bin/env node
/**
 * Generates SEO blog posts for the DialogHive website using the Mistral AI API.
 *
 * Usage:
 *   MISTRAL_API_KEY=... node scripts/generate-blog.mjs [--count=1]
 *
 * Writes markdown files (with frontmatter) into content/blog/.
 * Run from the website/ directory (CI does: `npm run generate:blog`).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BLOG_DIR = path.join(ROOT, 'content', 'blog');

const API_KEY = process.env.MISTRAL_API_KEY;
const MODEL = process.env.MISTRAL_MODEL || 'mistral-small-latest';
const COUNT = Number((process.argv.find((a) => a.startsWith('--count=')) || '--count=1').split('=')[1]) || 1;

if (!API_KEY) {
  console.error('ERROR: MISTRAL_API_KEY environment variable is not set.');
  process.exit(1);
}

const TOPIC_POOL = [
  'WhatsApp Business automation tips for a specific industry (pick one: salon, clinic, school, real estate, car workshop, fintech, e-commerce, restaurant)',
  'Instagram DM automation strategies for turning followers into customers',
  'Facebook Messenger marketing and chatbot best practices',
  'Website live chat / chat widget best practices for conversions',
  'AI customer support trends, ROI, and implementation guides',
  'Lead generation through conversational marketing',
  'WhatsApp broadcast and re-engagement campaign strategies',
  'Appointment reminders and reducing no-shows with chat automation',
  'Chatbot vs human support: hybrid support models',
  'How small businesses can compete with big brands using chat automation',
  'Conversational commerce: selling directly inside chat apps',
  'Customer experience metrics for chat: response time, CSAT, ratings',
];

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70);
}

function existingSlugs() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));
}

async function callMistral(messages) {
  const res = await fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.8,
      max_tokens: 4000,
      response_format: { type: 'json_object' },
    }),
  });
  if (!res.ok) {
    throw new Error(`Mistral API error ${res.status}: ${await res.text()}`);
  }
  const data = await res.json();
  return data.choices[0].message.content;
}

async function generatePost(existing) {
  const topic = TOPIC_POOL[Math.floor(Math.random() * TOPIC_POOL.length)];

  const prompt = `You are the content writer for DialogHive (https://dialoghive.com), an AI chatbot agency that builds chatbots for WhatsApp, Facebook Messenger, Instagram DM and websites, serving industries like restaurants, e-commerce, hospitals, salons, schools, real estate, fintech and car workshops.

Write ONE original, SEO-optimized blog post on this theme: "${topic}".

Rules:
- Do NOT duplicate any of these existing post slugs: ${existing.join(', ') || '(none)'}
- 900-1300 words of genuinely useful, practical content (not fluff)
- Use markdown: ## and ### headings, bullet lists, a blockquote example where natural
- Natural keyword usage for SEO; write for business owners, plain language
- End with a short paragraph mentioning DialogHive and inviting the reader to book a free demo, linking to /contact/ (relative markdown link)
- Where relevant, link naturally to /services/ or /pricing/ (relative markdown links, max 2 such links in the body)
- Do NOT include the title as a heading in the body (the site renders it separately)

Respond with ONLY a JSON object in this exact shape:
{
  "title": "Post title (60-70 chars, compelling, keyword-rich)",
  "description": "Meta description (140-160 chars)",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "markdown": "The full post body in markdown (escape newlines as \\n)"
}`;

  const raw = await callMistral([{ role: 'user', content: prompt }]);
  const post = JSON.parse(raw);

  if (!post.title || !post.markdown) throw new Error('Mistral response missing title or markdown');

  let slug = slugify(post.title);
  let suffix = 2;
  while (existing.includes(slug)) slug = `${slugify(post.title)}-${suffix++}`;

  const today = new Date().toISOString().slice(0, 10);
  const frontmatter = [
    '---',
    `title: ${JSON.stringify(post.title)}`,
    `description: ${JSON.stringify(post.description || '')}`,
    `date: "${today}"`,
    `tags: ${JSON.stringify(Array.isArray(post.tags) ? post.tags.slice(0, 4) : [])}`,
    'author: "DialogHive Team"',
    '---',
    '',
  ].join('\n');

  fs.mkdirSync(BLOG_DIR, { recursive: true });
  const file = path.join(BLOG_DIR, `${slug}.md`);
  fs.writeFileSync(file, frontmatter + post.markdown.trim() + '\n', 'utf8');
  console.log(`✓ Generated: content/blog/${slug}.md ("${post.title}")`);
  return slug;
}

const slugs = existingSlugs();
for (let i = 0; i < COUNT; i++) {
  try {
    const slug = await generatePost(slugs);
    slugs.push(slug);
  } catch (err) {
    console.error(`✗ Post ${i + 1} failed:`, err.message);
    process.exitCode = 1;
  }
}
