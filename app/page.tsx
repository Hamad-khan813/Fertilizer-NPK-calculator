import type { Metadata } from 'next';
import HomePage from './components/HomePage';

export const metadata: Metadata = {
  title: 'NPK Fertilizer Calculator | FertiCalc',
  description: 'Free NPK fertilizer calculator. Convert fertilizer bag labels, P₂O₅ and K₂O values, and target ratios into practical amounts in grams, ounces, pounds, or kilograms.',
  alternates: { canonical: 'https://ferti-calc.vercel.app' },
  openGraph: {
    title: 'NPK Fertilizer Calculator | FertiCalc',
    description: 'Free NPK fertilizer calculator. Convert fertilizer bag labels, P₂O₅ and K₂O values, and target ratios into practical amounts in grams, ounces, pounds, or kilograms.',
    url: 'https://ferti-calc.vercel.app',
    siteName: 'FertiCalc',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NPK Fertilizer Calculator | FertiCalc',
    description: 'Free NPK fertilizer calculator. Convert fertilizer bag labels, P₂O₅ and K₂O values, and target ratios into practical amounts in grams, ounces, pounds, or kilograms.',
  },
};

export default function RootPage() {
  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'FertiCalc',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: 'NPK calculator, oxide-to-elemental conversion, fertilizer dose planning, grams and ounces conversions',
    url: 'https://ferti-calc.vercel.app',
    description: 'Free NPK fertilizer calculator for home gardeners and hydroponic growers. Convert bag labels and target ratios into practical grams, ounces, pounds, and kilograms.',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://ferti-calc.vercel.app',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <HomePage initialUseCase="general" />
    </>
  );
}
