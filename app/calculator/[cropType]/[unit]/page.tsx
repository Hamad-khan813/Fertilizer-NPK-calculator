import { Metadata } from 'next';
import HomePage from '../../../components/HomePage';
import BreadcrumbList from '../../../components/BreadcrumbList';

interface PageProps {
  params: Promise<{
    cropType: string;
    unit: string;
  }>;
}

export const dynamicParams = true; // equivalent to fallback: 'blocking'

export const cropUnitCombinations = [
  { cropType: "turf-grass",         unit: "lbs"    },
  { cropType: "hydroponic-tomato",  unit: "grams"  },
  { cropType: "wheat",              unit: "kg"     },
  { cropType: "sugarcane",          unit: "kg"     },
  { cropType: "rice",               unit: "kg"     },
  { cropType: "maize",              unit: "kg"     },
  { cropType: "lawn-grass",         unit: "lbs"    },
  { cropType: "indoor-cannabis",    unit: "grams"  },
  { cropType: "vegetable-garden",   unit: "oz"     },
  { cropType: "cotton",             unit: "kg"     },
];

export async function generateStaticParams() {
  return cropUnitCombinations;
}

function slugToLabel(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { cropType, unit } = resolvedParams;
  const readableCrop = slugToLabel(cropType);
  const title = `Fertilizer Calculator for ${readableCrop} in ${unit} | FertiCalc`;
  const description = `Calculate exact fertilizer quantities for ${readableCrop}. Get NPK recommendations in ${unit}. Free, no signup required.`;
  return {
    title,
    description,
    alternates: {
      canonical: `https://ferti-calc.vercel.app/calculator/${cropType}/${unit}`,
    }
  };
}

export default async function DynamicCalculatorPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { cropType, unit } = resolvedParams;
  const label = slugToLabel(cropType);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `${label} Fertilizer Calculator in ${unit} | FertiCalc`,
    "url": `https://ferti-calc.vercel.app/calculator/${cropType}/${unit}`,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "description": `Calculate exact fertilizer quantities for ${label}. Get NPK recommendations in ${unit}. Free, no signup required.`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbList cropType={cropType} unit={unit} />
      <HomePage cropType={cropType} unit={unit} />
    </>
  );
}
