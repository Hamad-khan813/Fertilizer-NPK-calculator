import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ferti-calculator.vercel.app';

  // Base routes
  const routes = [
    '',
    '/fertilizers',
    '/user-guide',
    '/what-is-npk',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Blog posts
  const blogPosts = [
    'urea-vs-ammonium-nitrate',
    'what-is-npk-ratio',
  ].map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...blogPosts];
}
