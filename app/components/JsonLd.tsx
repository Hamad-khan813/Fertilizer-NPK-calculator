import React from 'react';

export default function JsonLd() {
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'FertiCalc NPK Calculator',
    'applicationCategory': 'AgricultureApplication',
    'operatingSystem': 'Web',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.8',
      'ratingCount': '1',
    },
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
          'text': 'For most plants, a safe concentration is 5g to 10g of Urea (46-0-0) per 1 liter of water. Always apply during cooler hours to prevent leaf burn. Our calculator handles these dilution rates automatically.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How do I convert PPM to grams per liter of fertilizer?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Use the formula: Grams/L = (Target PPM / (Fertilizer % / 100)) / 1000. Our professional calculator performs this conversion automatically so you can focus on target NPK ratios.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What is the best NPK ratio for the flowering stage?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'During flowering, plants need higher Phosphorus and Potassium. A ratio like 1:3:2 (e.g., 5-15-10) is common in both soil and hydroponic systems.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Can I mix different fertilizers together safely?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, but check compatibility first. Never mix Calcium Nitrate with Magnesium Sulfate in the same concentrate tank — they form insoluble Gypsum. Always use compatibility logic before mixing.'
        }
      }
    ]
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'FertiCalc',
    'url': 'https://ferti-calc.vercel.app',
    'logo': 'https://ferti-calc.vercel.app/logo.png',
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
