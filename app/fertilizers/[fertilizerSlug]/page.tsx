import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { FERTILIZERS, getFertilizerBySlug } from '@/lib/fertilizer-data';
import FertilizerClientPage from './FertilizerClientPage';

interface PageProps {
  params: Promise<{
    fertilizerSlug: string;
  }>;
}

export const dynamicParams = true;

// Pre-render the 10 high-priority fertilizer pages at build time
export async function generateStaticParams() {
  return FERTILIZERS.map((f) => ({
    fertilizerSlug: f.slug,
  }));
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { fertilizerSlug } = resolvedParams;
  const fertilizer = getFertilizerBySlug(fertilizerSlug);

  if (!fertilizer) {
    return {
      title: 'Fertilizer Not Found | Ferti-Calc',
    };
  }

  const title = `${fertilizer.name} (${fertilizer.npk}) Calculator & Dosage Guide | Ferti-Calc`;
  const description = `Review the listed analysis and mixing notes for ${fertilizer.name}. Use the calculator to estimate a product amount from your target concentration and solution volume.`;

  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `https://ferti-calc.vercel.app/fertilizers/${fertilizerSlug}`
    },
    openGraph: {
      title,
      description,
      url: `https://ferti-calc.vercel.app/fertilizers/${fertilizerSlug}`,
      siteName: 'FertiCalc',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    }
  };
}

export default async function FertilizerDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { fertilizerSlug } = resolvedParams;
  const fertilizer = getFertilizerBySlug(fertilizerSlug);

  if (!fertilizer) {
    notFound();
  }

  const breadcrumbSchema = {
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
        "name": "Fertilizers",
        "item": "https://ferti-calc.vercel.app/fertilizers"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${fertilizer.name} Calculator`,
        "item": `https://ferti-calc.vercel.app/fertilizers/${fertilizerSlug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FertilizerClientPage details={fertilizer} />
    </>
  );
}
