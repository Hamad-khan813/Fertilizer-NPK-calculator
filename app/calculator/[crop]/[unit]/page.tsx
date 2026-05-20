import { Metadata } from 'next';
import HomePage from '../../../components/HomePage';
import BreadcrumbList from '../../../components/BreadcrumbList';
import { getAllCombinations, CROPS, UNITS } from '@/lib/calculator-data';

interface PageProps {
  params: Promise<{
    crop: string;
    unit: string;
  }>;
}

// Controls behavior for slugs NOT in the pre-rendered list
export const dynamicParams = true;

// Runs at BUILD TIME — tells Vercel which pages to pre-render
export async function generateStaticParams() {
  const combinations = getAllCombinations();
  return combinations.map(({ crop, unit }) => ({
    crop,
    unit,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { crop, unit } = resolvedParams;

  const cropData = CROPS.find(c => c.slug === crop);
  const unitData = UNITS.find(u => u.slug === unit);

  // Graceful fallback if slug not found in arrays
  const cropLabel = cropData?.label ?? crop;
  const unitLabel = unitData?.label ?? unit;

  return {
    title: `${cropLabel} Fertilizer Calculator in ${unitLabel} | FertiCalc`,
    description: `Calculate exact NPK fertilizer quantities for ${cropLabel}. Free calculator — results in ${unitLabel}. No signup required.`,
    alternates: {
      canonical: `https://ferti-calc.vercel.app/calculator/${crop}/${unit}`
    },
    openGraph: {
      title: `${cropLabel} Fertilizer Calculator — FertiCalc`,
      description: `Free NPK calculator for ${cropLabel} in ${unitLabel}.`,
      url: `https://ferti-calc.vercel.app/calculator/${crop}/${unit}`,
      siteName: 'FertiCalc',
      type: 'website',
    }
  };
}

export default async function DynamicCalculatorPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { crop, unit } = resolvedParams;

  const cropData = CROPS.find(c => c.slug === crop);
  const cropLabel = cropData?.label ?? crop;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `${cropLabel} Fertilizer Calculator in ${unit} | FertiCalc`,
    "url": `https://ferti-calc.vercel.app/calculator/${crop}/${unit}`,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "description": `Calculate exact fertilizer quantities for ${cropLabel}. Get NPK recommendations in ${unit}. Free, no signup required.`,
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
      <BreadcrumbList cropType={crop} unit={unit} />
      <HomePage cropType={crop} unit={unit} />
    </>
  );
}
