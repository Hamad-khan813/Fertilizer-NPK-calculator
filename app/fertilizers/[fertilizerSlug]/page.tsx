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

// Helper to resolve specific HowTo details for the programmatic SEO pages
function getHowToDetails(slug: string) {
  const defaults = {
    cropStage: "active growth",
    targetPpm: "150",
    nutrient: "nitrogen",
    approximateGrams: "50",
    target: "optimal development"
  };

  const lookup: Record<string, typeof defaults> = {
    "urea-46-0-0": {
      cropStage: "vegetative growth",
      targetPpm: "150",
      nutrient: "nitrogen",
      approximateGrams: "33",
      target: "leafy green development"
    },
    "calcium-nitrate-15-5-0-0": {
      cropStage: "early vegetative stage",
      targetPpm: "150",
      nutrient: "nitrogen and calcium",
      approximateGrams: "97",
      target: "robust leaf and stem growth"
    },
    "dap-18-46-0": {
      cropStage: "root development phase",
      targetPpm: "200",
      nutrient: "phosphate",
      approximateGrams: "43",
      target: "healthy root establishment"
    },
    "mop-0-0-60": {
      cropStage: "fruiting and flowering stage",
      targetPpm: "200",
      nutrient: "potassium",
      approximateGrams: "33",
      target: "enhanced fruit sizing and stress tolerance"
    },
    "potassium-sulfate-0-0-50": {
      cropStage: "flowering stage",
      targetPpm: "200",
      nutrient: "potassium and sulfur",
      approximateGrams: "40",
      target: "improved bloom quality and disease resistance"
    },
    "ammonium-nitrate-34-0-0": {
      cropStage: "rapid vegetative growth",
      targetPpm: "150",
      nutrient: "nitrogen",
      approximateGrams: "44",
      target: "vigorous canopy expansion"
    },
    "ammonium-sulfate-21-0-0": {
      cropStage: "early growth stage",
      targetPpm: "150",
      nutrient: "nitrogen and sulfur",
      approximateGrams: "71",
      target: "correcting sulfur deficiency and boosting growth"
    },
    "map-12-61-0": {
      cropStage: "seedling starter phase",
      targetPpm: "200",
      nutrient: "phosphate",
      approximateGrams: "33",
      target: "strong early root initiation"
    },
    "potassium-nitrate-13-0-46": {
      cropStage: "fruiting stage",
      targetPpm: "200",
      nutrient: "potassium and nitrogen",
      approximateGrams: "43",
      target: "improved yield and fruit sweetness"
    },
    "magnesium-sulfate-epsom": {
      cropStage: "all growth stages",
      targetPpm: "50",
      nutrient: "magnesium and sulfur",
      approximateGrams: "50",
      target: "photosynthesis and chlorophyll synthesis"
    }
  };

  return lookup[slug] || defaults;
}

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
  const description = `Calculate exact dosage for ${fertilizer.name} (${fertilizer.npk}). Solubility: ${fertilizer.solubility} g/L. Ideal for ${fertilizer.crops[0]} & ${fertilizer.crops[1]}. Click to calculate now.`;

  return {
    title,
    description,
    keywords: [
      `${fertilizer.name.toLowerCase()} calculator`,
      `${fertilizer.slug} dosage`,
      `calculate ${fertilizer.name.toLowerCase()}`,
      `${fertilizer.npk} fertilizer calculator`,
      `hydroponic ${fertilizer.name.toLowerCase()} guide`
    ],
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

  const howToDetails = getHowToDetails(fertilizerSlug);

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Mix ${fertilizer.name} for Hydroponics`,
    "description": `Step-by-step guide to calculating and mixing ${fertilizer.name} for a 100L reservoir.`,
    "totalTime": "PT5M",
    "supply": [
      {
        "@type": "HowToSupply",
        "name": fertilizer.name
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "Digital scale (0.1g precision)"
      },
      {
        "@type": "HowToTool",
        "name": "EC/PPM meter"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "name": "Calculate Required Amount",
        "text": `Enter your target PPM and reservoir volume into Ferti-Calc. For ${howToDetails.cropStage} in 100L, target ${howToDetails.targetPpm}ppm ${howToDetails.nutrient}.`,
        "url": `https://ferti-calc.vercel.app/fertilizers/${fertilizerSlug}#step1`
      },
      {
        "@type": "HowToStep",
        "name": "Weigh the Fertilizer",
        "text": `Using a digital scale, weigh out ${howToDetails.approximateGrams}g of ${fertilizer.name} for ${howToDetails.target}.`,
        "url": `https://ferti-calc.vercel.app/fertilizers/${fertilizerSlug}#step2`
      },
      {
        "@type": "HowToStep",
        "name": "Dissolve and Verify",
        "text": "Add to reservoir, mix thoroughly, verify EC/PPM with meter. Check compatibility warnings before mixing with other fertilizers.",
        "url": `https://ferti-calc.vercel.app/fertilizers/${fertilizerSlug}#step3`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <FertilizerClientPage details={fertilizer} />
    </>
  );
}
