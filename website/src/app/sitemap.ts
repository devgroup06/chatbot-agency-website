import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${site.url}/about/`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/services/`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${site.url}/pricing/`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${site.url}/contact/`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/blog/`, changeFrequency: 'daily', priority: 0.9 },
  ];

  const posts: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${site.url}/blog/${p.slug}/`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...posts];
}
