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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'How much Urea per liter of water for foliar spray?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'A safe concentration is 5g to 10g of Urea (46-0-0) per 1 liter of water. Apply during cooler hours to prevent leaf burn.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How do I convert PPM to grams per liter of fertilizer?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Use the formula: Grams/L = (Target PPM / (Fertilizer % / 100)) / 1000.'
        }
      }
    ]
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
        __html: JSON.stringify([softwareSchema, organizationSchema, faqSchema]),
      }}
    />
  );
}
