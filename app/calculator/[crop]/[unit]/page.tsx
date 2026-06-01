import { Metadata } from 'next';
import HomePage from '../../../components/HomePage';
import BreadcrumbList from '../../../components/BreadcrumbList';
import { getAllCombinations, CROPS } from '@/lib/calculator-data';
import { cropContent } from '../../../../lib/crop-content';

interface PageProps {
  params: Promise<{
    crop: string;
    unit: string;
  }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const combinations = getAllCombinations();
  return combinations.map(({ crop, unit }) => ({
    crop,
    unit,
  }));
}

function slugToLabel(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { crop, unit } = resolvedParams;
  const cropLabel = slugToLabel(crop);
  const unitLabel = unit.toLowerCase();
  const description = `Calculate exact NPK fertilizer rates for ${cropLabel} in ${unitLabel}. Use FertiCalc to convert ratios and calculate application rates with crop-targeted precision for accurate nutrient planning.`;

  return {
    title: `${cropLabel} Fertiliser Calculator in ${unitLabel} | FertiCalc`,
    description,
    alternates: {
      canonical: `https://ferti-calc.vercel.app/calculator/${crop}/${unit}`,
    },
    openGraph: {
      title: `${cropLabel} Fertiliser Calculator in ${unitLabel} | FertiCalc`,
      description,
      url: `https://ferti-calc.vercel.app/calculator/${crop}/${unit}`,
    },
  };
}

export default async function DynamicCalculatorPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { crop, unit } = resolvedParams;
  const cropData = CROPS.find((c) => c.slug === crop);
  const cropLabel = cropData?.label ?? crop;
  const content = cropContent[crop] ?? `Fertiliser recommendations for ${cropLabel} depend on crop stage and soil needs. Adjust NPK based on target yield and local conditions.`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${cropLabel} Fertiliser Calculator in ${unit} | FertiCalc`,
    url: `https://ferti-calc.vercel.app/calculator/${crop}/${unit}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'All',
    description: `Calculate exact fertilizer quantities for ${cropLabel}. Get NPK recommendations in ${unit}. Free, no signup required.`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbList cropType={crop} unit={unit} />
      <HomePage cropType={crop} unit={unit} />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">About Fertilising {cropLabel}</h2>
        <p className="text-slate-600 leading-7">{content}</p>
      </section>
    </>
  );
}
