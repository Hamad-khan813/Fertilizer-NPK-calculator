import React from 'react';

interface BreadcrumbListProps {
  cropType: string;
  unit: string;
}

export default function BreadcrumbList({ cropType, unit }: BreadcrumbListProps) {
  function slugToLabel(slug: string): string {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const label = slugToLabel(cropType);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://ferti-calc.vercel.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Calculator",
        "item": "https://ferti-calc.vercel.app/calculator"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${label} (${unit})`,
        "item": `https://ferti-calc.vercel.app/calculator/${cropType}/${unit}`
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
