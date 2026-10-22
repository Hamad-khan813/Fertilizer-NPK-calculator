export const metadata = {
  title: 'Fertilizer NPK Database | FertiCalc',
  description: 'Browse fertilizer products and compare their listed nitrogen, phosphate (P₂O₅), and potash (K₂O) analyses.',
  alternates: { canonical: 'https://ferti-calc.vercel.app/fertilizers' },
  openGraph: {
    title: 'Fertilizer NPK Database | FertiCalc',
    description: 'Browse fertilizer products and compare their listed nitrogen, phosphate (P₂O₅), and potash (K₂O) analyses.',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}