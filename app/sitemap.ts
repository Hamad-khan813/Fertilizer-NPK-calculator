import { MetadataRoute } from 'next';
import { getAllCombinations, BASE_URL, CROPS } from '@/lib/calculator-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static root pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // One entry per crop category landing page
  const categories = Array.from(new Set(CROPS.map(c => c.category)));
  const categoryRoutes: MetadataRoute.Sitemap = categories.map(cat => ({
    url: `${BASE_URL}/calculator/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  // Full crop × unit matrix
  const dynamicRoutes: MetadataRoute.Sitemap = getAllCombinations().map(({ url }) => ({
    url,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...dynamicRoutes];
}
