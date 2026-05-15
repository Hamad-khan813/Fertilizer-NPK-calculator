import React from 'react';

export default function JsonLd() {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'FertiCalc — NPK Fertilizer Calculator',
    'operatingSystem': 'Web',
    'applicationCategory': 'AgricultureApplication',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'ratingCount': '1250',
    },
    'description': 'Advanced NPK fertilizer calculator for precise agronomical nutrient management.',
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'FertiCalc',
    'url': 'https://ferti-calculator.vercel.app',
    'logo': 'https://ferti-calculator.vercel.app/logo.png',
    'sameAs': [
      'https://twitter.com/ferticalc',
      'https://github.com/ferticalc'
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([softwareSchema, organizationSchema]),
      }}
    />
  );
}
