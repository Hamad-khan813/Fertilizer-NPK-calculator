import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/calculator-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static root pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const ,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const ,
      priority: 0.9,
    },
    ...['about', 'contact', 'editorial-policy', 'methodology', 'privacy', 'terms', 'fertilizers'].map((route) => ({
      url: `${BASE_URL}/${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ];

  return staticRoutes;
}
