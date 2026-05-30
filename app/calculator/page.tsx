import { Metadata } from 'next';
import HomePage from '../components/HomePage';

export const metadata: Metadata = {
  title: 'Free NPK Fertilizer Calculator | Professional Grade |',
  description: 'Calculate exact fertilizer requirements for any NPK ratio. Free professional-grade calculator with grams-per-liter precision.',
  alternates: {
    canonical: 'https://ferti-calc.vercel.app/calculator',
  }
};

export default function CalculatorRootPage() {
  return <HomePage initialUseCase="general" />;
}
