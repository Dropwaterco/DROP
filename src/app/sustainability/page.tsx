import SustainabilityClient from './SustainabilityClient';

export const metadata = {
  title: { absolute: 'Sustainability | DROP. No Plastic. No Bullsh*t.' },
  description: 'Learn why DROP. uses recyclable aluminium cans to create a more sustainable alternative to single-use plastic water bottles.',
  alternates: {
    canonical: '/sustainability',
  },
  openGraph: {
    title: 'Sustainability | DROP. No Plastic. No Bullsh*t.',
    description: 'Learn why DROP. uses recyclable aluminium cans to create a more sustainable alternative to single-use plastic water bottles.',
    siteName: 'DROP.',
    locale: 'en_IN',
    url: 'https://www.dropwater.in/sustainability',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sustainability | DROP. No Plastic. No Bullsh*t.',
    description: 'Learn why DROP. uses recyclable aluminium cans to create a more sustainable alternative to single-use plastic water bottles.',
  },
};

export default function SustainabilityPage() {
  return <SustainabilityClient />;
}
