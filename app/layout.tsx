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
  title: {
    default: 'FertiCalc — NPK Fertilizer Calculator',
    template: '%s | FertiCalc',
  },
  description: 'Free NPK fertilizer calculator. Calculate exact fertilizer amounts for any target NPK ratio. Plus guides and resources for farmers and agronomists.',
  keywords: ['npk calculator', 'fertilizer calculator', 'npk ratio', 'urea calculator', 'DAP calculator', 'fertilizer dilution'],
  openGraph: {
    type: 'website',
    siteName: 'FertiCalc',
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
      <body className="min-h-full flex flex-col">
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
