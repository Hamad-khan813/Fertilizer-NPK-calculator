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
  metadataBase: new URL('https://ferti-calculator.vercel.app'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Free NPK Fertilizer Calculator | Precise Nutrient Recipes for Any Crop',
    template: '%s | FertiCalc',
  },
  description: 'Calculate exact fertilizer requirements with the world\'s most precise NPK calculator. Access 52+ fertilizers, generate custom recipes, and optimize your fertigation strategy instantly. No registration required.',
  keywords: [
    'npk fertilizer calculator', 'nutrient recipe calculator', 'fertilizer dilution calculator', 
    'crop nutrition planning', 'commercial fertilizer calculator', 'liquid fertilizer mixing guide',
    'hydroponic nutrient calculator', 'soil amendment calculator', 'fertigation basics'
  ],
  openGraph: {
    type: 'website',
    siteName: 'FertiCalc',
    url: 'https://ferti-calculator.vercel.app',
    title: 'NPK Fertilizer Calculator — Professional Grade Nutrient Planning',
    description: 'The #1 tool for professional agronomists and farmers. Calculate NPK ratios with 99.9% precision.',
  },
  verification: {
    google: 'nA6CNbhkt6FhyCDoQrXABe_G2lH00HfK4cikrh0TrWo',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
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
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
