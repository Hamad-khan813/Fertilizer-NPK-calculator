import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import JsonLd from "./components/JsonLd";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ferti-calc.vercel.app'),
  title: {
    default: 'Ferti-Calc | Free NPK Fertilizer Calculator & Hydroponic Nutrient Blender',
    template: '%s | Ferti-Calc'
  },
  description: 'Free NPK calculator for gardeners and professional growers. Convert bag NPK ratios, lbs/acre, kg/ha, P2O5/K2O, PPM, and liquid nutrient recipes in cups, gallons, grams and liters.',
  keywords: [
    'NPK calculator',
    'fertilizer calculator',
    'NPK converter',
    'fertilizer application rate calculator',
    'plant nutrient calculator',
    'fertilizer requirement calculator',
    'NPK ratio converter',
    'garden fertilizer calculator',
    'lbs per acre to lbs per 1000 sq ft',
    'kg per hectare to kg per square meter',
    'pounds per acre to grams per plot',
    'fertilizer rate per 1000 sq ft',
    'fertilizer bag weight to nutrient content',
    'pounds to kilograms fertilizer converter',
    'ounces to grams fertilizer',
    'gallons per acre to ml per gallon',
    'liters per hectare to liters per acre',
    'fluid ounces to liters fertilizer',
    'P to P2O5 converter',
    'K to K2O converter',
    'elemental phosphorus to phosphate calculator',
    'potassium to potash conversion',
    'oxide to elemental fertilizer converter',
    'calculate actual NPK from bag label',
    'Urea (46-0-0) calculator',
    'DAP application rate',
    'MOP conversion',
    'nitrogen requirement calculator',
    'how much urea for 1 acre',
    'ammonium nitrate application rate',
    'PPM to lbs per acre',
    'mg/kg to kg/ha',
    'PPM to pounds per 1000 sq ft',
    'soil test nutrient converter',
    'parts per million to fertilizer rate',
    'fertigation calculator',
    'liquid NPK converter',
    'EC to PPM converter',
    'hydroponic nutrient calculator',
    'grams per liter fertilizer converter',
    'nutrient solution calculator',
    'how much 10-10-10 fertilizer per 1000 square feet',
    'convert fertilizer recommendations from kg/ha to lbs/acre',
    'how to calculate NPK for a custom fertilizer blend',
    'formula for nitrogen application rate',
    'calculate fertilizer price per pound of nitrogen',
    'difference between NPK 20-20-20 and 10-10-10 application rate',
    '10-10-10',
    '20-20-20',
    '46-0-0',
    '18-46-0',
    '0-0-60',
    '13-13-13',
    '5-10-5',
  ],
  authors: [{ name: 'Hamad Khan', url: 'https://ferti-calc.vercel.app' }],
  creator: 'Hamad Khan',
  alternates: {
    canonical: 'https://ferti-calc.vercel.app',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
    apple: '/apple-icon',
  },
  openGraph: {
    title: 'Ferti-Calc | Free NPK Fertilizer Calculator & Hydroponic Nutrient Blender',
    description: 'Convert bag NPK labels and professional fertilizer recommendations. Free fertilizer calculator for home gardens and commercial acres in kg, lbs, grams, oz and ml.',
    url: 'https://ferti-calc.vercel.app',
    siteName: 'Ferti-Calc',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ferti-Calc NPK Fertilizer Calculator',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ferti-Calc | Free NPK Fertilizer Calculator',
    description: 'Convert bag NPK, lbs/acre, kg/ha, P2O5/K2O and liquid nutrient recipes. Free for gardeners and growers.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'YOUR_GSC_VERIFICATION_CODE_HERE',
  },
};

import { cookies } from "next/headers";
import { UnitSystemProvider, UnitSystem } from "./components/UnitSystemProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const systemCookie = cookieStore.get('unit-system')?.value as UnitSystem | undefined;
  const initialSystem = systemCookie === 'imperial' ? 'imperial' : 'metric';

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "FertiCalc — Free Fertilizer Calculator",
              "url": "https://ferti-calc.vercel.app",
              "applicationCategory": "UtilitiesApplication",
              "operatingSystem": "All",
              "browserRequirements": "Requires JavaScript",
              "description": "Free fertilizer calculator for farmers and gardeners. Get precise NPK recommendations for wheat, rice, turf grass, hydroponic tomatoes and more. Works in kg, lbs, grams and oz.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "124"
              },
              "author": {
                "@type": "Person",
                "name": "Hamad Khan",
                "url": "https://ferti-calc.vercel.app"
              },
              "inLanguage": "en",
              "keywords": [
                "fertilizer calculator",
                "NPK calculator",
                "NPK converter",
                "fertilizer application rate calculator",
                "bag NPK calculator",
                "P to P2O5 converter",
                "K to K2O converter",
                "PPM to lbs per acre",
                "kg per hectare to kg per square meter",
                "gallons per acre to ml per gallon",
                "hydroponic nutrient calculator"
              ]
            })
          }}
        />
        <JsonLd />
        {/* Google Analytics 4 — lazyOnload defers until after hydration to reduce TBT */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>

      </head>
      <body className="min-h-full flex flex-col">
        <UnitSystemProvider initialSystem={initialSystem}>
          <a href="#main-content" className="skip-link">Skip to Content</a>
          <header role="banner">
            <Navbar />
          </header>
          <div className="flex-grow page-layout-wrapper">
            {children}
          </div>
          <Footer />
        </UnitSystemProvider>
      </body>
    </html>
  );
}
