import type { Metadata } from 'next';
import HomePage from '@/app/components/HomePage';
import { CROPS } from '@/lib/calculator-data';

interface PageProps {
  params: Promise<{ crop: string }>;
}

function slugToLabel(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateStaticParams() {
  // TODO(owner): confirm the final set of crop pages before adding crop-specific content.
  return CROPS.slice(0, 8).map((crop) => ({ crop: crop.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { crop } = await params;
  const cropLabel = CROPS.find((entry) => entry.slug === crop)?.label ?? slugToLabel(crop);

  return {
    title: `${cropLabel} Fertilizer Calculator | FertiCalc`,
    description: `Estimate a practical fertilizer recipe for ${cropLabel}. Use the calculator with target NPK values, product analysis, and your solution volume to plan a starting rate.`,
    alternates: { canonical: `https://ferti-calc.vercel.app/calculator/${crop}` },
    robots: { index: false, follow: true },
  };
}

export default async function CropCalculatorPage({ params }: PageProps) {
  const { crop } = await params;
  const cropLabel = CROPS.find((entry) => entry.slug === crop)?.label ?? slugToLabel(crop);

  return (
    <>
      <HomePage cropType={crop} />
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900">{cropLabel} fertilizer planning</h2>
        <p className="mt-4 text-slate-600 leading-7">
          Use this page to estimate a starting recipe for {cropLabel}. The calculator converts your target NPK values, the chosen fertilizer analysis, and the total solution volume into a practical amount to weigh or mix. The output should still be checked against the product label, soil test, and local extension guidance before use.
        </p>
      </section>
    </>
  );
}