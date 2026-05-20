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
  applicationName: 'FertiCalc',
  alternates: {
    canonical: '/',
  },
  title: 'NPK Fertilizer Calculator | Free Professional Nutrient Planning Tool',
  description: 'Calculate exact fertilizer requirements for any NPK ratio. Free professional-grade calculator with 52+ fertilizers, limiting nutrient detection, and grams-per-liter precision. No registration required.',
  keywords: [
    'npk fertilizer calculator', 'nutrient recipe calculator', 'fertilizer dilution calculator', 
    'crop nutrition planning', 'commercial fertilizer calculator', 'liquid fertilizer mixing guide',
    'hydroponic nutrient calculator', 'soil amendment calculator', 'fertigation basics'
  ],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
    apple: '/apple-icon',
  },
  openGraph: {
    type: 'website',
    siteName: 'FertiCalc',
    url: 'https://ferti-calc.vercel.app',
    title: 'Free NPK Fertilizer Calculator — Professional Grade',
    description: 'Eliminate guesswork in crop nutrition. Get precise fertilizer requirements for any target ratio with our advanced agronomical calculator.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FertiCalc NPK Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free NPK Fertilizer Calculator',
    description: 'Professional-grade nutrient planning tool. 52+ fertilizers, instant results.',
    images: ['/og-image.png'],
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
                "turf grass fertilizer",
                "hydroponic nutrient calculator",
                "wheat fertilizer kg",
                "free farming tool"
              ]
            })
          }}
        />
        <JsonLd />
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
        {/* WebMCP (Web Model Context Protocol) Early-Adoption Polyfill */}
        <Script id="webmcp-polyfill" strategy="beforeInteractive">
          {`
            (function() {
              if (typeof navigator.modelContext === 'undefined') {
                console.log('WebMCP not found, initializing polyfill surface...');
                // Placeholder for @mcp-b/global surface initialization
                window.navigator.modelContext = {
                  registerTool: function(tool) {
                    console.info('WebMCP Tool Registered (Polyfilled):', tool.toolname);
                  }
                };
              }
            })();
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
