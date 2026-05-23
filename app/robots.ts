import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/calculator-data';

export default function robots(): MetadataRoute.Robots {
  return {
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
