import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/calculator-data';
export default function robots(): MetadataRoute.Robots {
  return {
    sitemap: `${BASE_URL}/sitemap.xml`,
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      }
    ],
  };
}
