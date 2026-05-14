import FertilizersPage from './page';

export const metadata = {
  title: 'Fertilizer NPK Database | FertiCalc',
  description: 'Browse all 52 fertilizers with N, P₂O₅, and K₂O values. Find the perfect fertilizer for your NPK needs.',
  keywords: 'NPK fertilizer database, nitrogen phosphorus potassium, fertilizer analysis, agricultural fertilizers',
  openGraph: {
    title: 'Fertilizer NPK Database | FertiCalc',
    description: 'Browse all 52 fertilizers with N, P₂O₅, and K₂O values.',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}