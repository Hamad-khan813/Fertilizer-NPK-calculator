import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ferti-calc.vercel.app';

  // Base routes
  const routes = [
    '',
    '/fertilizers',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date('2026-05-15'),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Guides
  const guides = [
    '/guides/what-is-npk',
    '/guides/foliar-spray-guide',
    '/guides/ppm-conversion',
    '/guides/flowering-npk',
    '/guides/fertilizer-compatibility',
    '/guides/hydroponic-nutrients',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date('2026-05-15'),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Blog posts
  const blogPosts = [
    'urea-vs-ammonium-nitrate',
    'what-is-npk-ratio',
  ].map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date('2026-05-15'),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...guides, ...blogPosts];
}
