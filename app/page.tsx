import { Metadata } from 'next';
import { headers } from 'next/headers';
import HomePage from './components/HomePage';

type SEOMetadata = {
  title: string;
  desc: string;
  lang: string;
};

// Programmatic mapping for 18+ global regions targeting specific localized keywords
const SEO_LOCALE_MAP: Record<string, SEOMetadata> = {
  US: { title: "Lawn Fertilizer Calculator lbs | FertiCalc", desc: "Calculate exact fertilizer requirements in lbs and sq ft. Precision nutrient mixing tool for the US.", lang: "en-US" },
  CA: { title: "Lawn Fertilizer Calculator kg | FertiCalc", desc: "Calculate exact fertilizer requirements for Canadian soil and hydroponic systems.", lang: "en-CA" },
  AU: { title: "Turf Nutrient Calculator kg | FertiCalc Australia", desc: "Calculate exact turf nutrient requirements in kg and sq meters. The ultimate NPK calculator for Australia.", lang: "en-AU" },
  GB: { title: "NPK Fertilizer Calculator UK | FertiCalc", desc: "Professional nutrient planning tool for UK growers. Instant NPK conversion in kg and sq meters.", lang: "en-GB" },
  IE: { title: "Fertiliser Nutrient Calculator | FertiCalc Ireland", desc: "Precision fertiliser mixing tool for Irish agriculture.", lang: "en-IE" },
  NZ: { title: "Turf & Crop Nutrient Calculator | FertiCalc NZ", desc: "Advanced NPK calculator for New Zealand growers.", lang: "en-NZ" },
  ZA: { title: "Fertilizer Blending Calculator | FertiCalc SA", desc: "Calculate exact nutrient requirements for South African crops.", lang: "en-ZA" },
  IN: { title: "Agriculture Fertilizer Calculator | FertiCalc India", desc: "NPK nutrient calculator for Indian farming and agriculture.", lang: "en-IN" },
  SG: { title: "Hydroponics Nutrient Calculator | FertiCalc Singapore", desc: "Precision hydroponics and urban farming calculator for Singapore.", lang: "en-SG" },
  PH: { title: "Crop Fertilizer Calculator | FertiCalc Philippines", desc: "NPK formulation tool for Philippine agriculture.", lang: "en-PH" },
  MY: { title: "Plant Nutrient Calculator | FertiCalc Malaysia", desc: "Accurate NPK blending calculator for Malaysian plantations.", lang: "en-MY" },
  DE: { title: "NPK Dünger Rechner | FertiCalc Germany", desc: "Nutrient planning tool optimized for European standards.", lang: "en-DE" },
  FR: { title: "Calculateur d'Engrais NPK | FertiCalc France", desc: "Precision fertilizer calculator for French agriculture.", lang: "en-FR" },
  ES: { title: "Calculadora de Fertilizantes NPK | FertiCalc Spain", desc: "Agronomical nutrient calculator for Spain.", lang: "en-ES" },
  IT: { title: "Calcolatore di Fertilizzanti | FertiCalc Italy", desc: "Professional fertilizer calculator for Italian growers.", lang: "en-IT" },
  NL: { title: "NPK Meststof Calculator | FertiCalc Netherlands", desc: "Greenhouse and hydroponics nutrient calculator for the Netherlands.", lang: "en-NL" },
  SE: { title: "Gödselkalkylator | FertiCalc Sweden", desc: "Precision nutrient tool for Swedish agriculture.", lang: "en-SE" },
  DK: { title: "Gødningsberegner | FertiCalc Denmark", desc: "Advanced fertilizer calculator for Denmark.", lang: "en-DK" },
  DEFAULT: { title: "Free NPK Fertilizer Calculator | Professional Grade | FertiCalc", desc: "Calculate exact fertilizer requirements for any NPK ratio. Free professional-grade calculator with grams-per-liter precision.", lang: "en" }
};

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ useCase?: string }> }): Promise<Metadata> {
  const headersList = await headers();
  // Read Vercel edge country header, fallback to DEFAULT
  const countryCode = headersList.get('x-vercel-ip-country') || 'DEFAULT';
  const localeData = SEO_LOCALE_MAP[countryCode] || SEO_LOCALE_MAP['DEFAULT'];
  
  const resolvedParams = await searchParams;
  const useCase = (resolvedParams.useCase as 'turf' | 'hydroponics' | 'agriculture' | 'general') || 'general';

  // Override title based on useCase programmatic logic
  let title = localeData.title;
  const isImperial = ['US', 'CA', 'GB'].includes(countryCode);
  
  if (useCase === 'hydroponics' && !isImperial) title = "Hydroponic NPK Nutrient Calculator (Grams & Liters) | FertiCalc";
  if (useCase === 'hydroponics' && isImperial) title = "Hydroponic NPK Nutrient Calculator (Fl Oz & Gallons) | FertiCalc";
  if (useCase === 'turf' && isImperial) title = "Lawn Fertilizer NPK Spreader Calculator (Lbs per 1,000 Sq Ft) | FertiCalc";
  if (useCase === 'turf' && !isImperial) title = "Turf Fertilizer NPK Calculator (Kg per Sq Meter) | FertiCalc";
  if (useCase === 'agriculture') title = "Commercial Crop Production NPK Calculator | FertiCalc";

  let desc = localeData.desc;
  if (useCase === 'hydroponics') desc = "Calculate hydroponic liquid nutrient solution recipes. Parse elemental NPK values to oxide & elemental ratios instantly for water reservoirs.";
  if (useCase === 'turf') desc = "Calculate turf grass fertilizer spreader application rates. Enter target NPK in lbs per 1,000 sq ft or kg per sq meter.";
  if (useCase === 'agriculture') desc = "Calculate commercial crop fertilizer blends. Optimize NPK inputs to meet agronomic crop needs with elemental oxide conversions.";

  // Construct hreflang dictionary for alternates
  const languages: Record<string, string> = {
    'x-default': 'https://ferti-calc.vercel.app',
  };

  // Populate dynamic hreflang tags
  Object.entries(SEO_LOCALE_MAP).forEach(([code, data]) => {
    if (code !== 'DEFAULT') {
      languages[data.lang] = `https://ferti-calc.vercel.app?cc=${code.toLowerCase()}`;
    }
  });

  return {
    title: title,
    description: desc,
    alternates: {
      canonical: 'https://ferti-calc.vercel.app',
      languages,
    },
    openGraph: {
      title: title,
      description: desc,
      url: 'https://ferti-calc.vercel.app',
      siteName: 'FertiCalc',
      locale: localeData.lang.replace('-', '_'), // e.g. en_US
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: desc,
    }
  };
}

export default async function RootPage({ searchParams }: { searchParams: Promise<{ useCase?: string }> }) {
  const resolvedParams = await searchParams;
  const useCase = resolvedParams.useCase || 'general';
  return <HomePage initialUseCase={useCase} />;
}
