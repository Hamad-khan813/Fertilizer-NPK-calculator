import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
    default: 'NPK Fertilizer Calculator | FertiCalc',
    template: '%s | FertiCalc'
  },
  description: 'Free NPK fertilizer calculator. Convert fertilizer bag labels, P₂O₅/K₂O values and target ratios into amounts in grams, ounces, pounds or kilograms.',
  authors: [{ name: 'Hamad Khan', url: 'https://ferti-calc.vercel.app' }],
  creator: 'Hamad Khan',

  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
    apple: '/apple-icon',
  },
  openGraph: {
    title: 'NPK Fertilizer Calculator | FertiCalc',
    description: 'Free NPK fertilizer calculator. Convert fertilizer bag labels, P₂O₅/K₂O values and target ratios into amounts in grams, ounces, pounds or kilograms.',
    url: 'https://ferti-calc.vercel.app',
    siteName: 'FertiCalc',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FertiCalc NPK Fertilizer Calculator',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NPK Fertilizer Calculator | FertiCalc',
    description: 'Free NPK fertilizer calculator. Convert fertilizer bag labels, P₂O₅/K₂O values and target ratios into amounts in grams, ounces, pounds or kilograms.',
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
    google: 'nA6CNbhkt6FhyCDoQrXABe_G2lH00HfK4cikrh0TrWo',
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
        <meta
          name="google-site-verification"
          content="nA6CNbhkt6FhyCDoQrXABe_G2lH00HfK4cikrh0TrWo"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "FertiCalc",
              "url": "https://ferti-calc.vercel.app",
              "applicationCategory": "UtilitiesApplication",
              "operatingSystem": "Any",
              "description": "Free NPK fertilizer calculator for home gardens and hydroponic growers. Convert bag labels and target ratios into grams, ounces, pounds, and kilograms.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "inLanguage": "en"
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  '@id': 'https://ferti-calc.vercel.app/#website',
                  name: 'FertiCalc',
                  url: 'https://ferti-calc.vercel.app',
                },
                {
                  '@type': 'Organization',
                  '@id': 'https://ferti-calc.vercel.app/#organization',
                  name: 'FertiCalc',
                  url: 'https://ferti-calc.vercel.app',
                },
              ],
            }),
          }}
        />
        {/* TODO(owner): connect the selected CMP to Consent Mode v2 before enabling GTM or ad tags. */}

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
