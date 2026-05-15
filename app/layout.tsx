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
