import StoryClient from './StoryClient';

export const metadata = {
  title: { absolute: 'Our Story | DROP.' },
  description: 'Explore DROP. still water, mint water, clove water and athlete hydration in premium recyclable aluminium cans.',
  alternates: {
    canonical: '/story',
  },
  openGraph: {
    title: 'Our Story | DROP.',
    description: 'Explore DROP. still water, mint water, clove water and athlete hydration in premium recyclable aluminium cans.',
    siteName: 'DROP.',
    locale: 'en_IN',
    url: 'https://www.dropwater.in/story',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Story | DROP.',
    description: 'Explore DROP. still water, mint water, clove water and athlete hydration in premium recyclable aluminium cans.',
  },
};

export default function StoryPage() {
  return (
    <main className="bg-[#F8F9FA] min-h-screen text-[#1A1A1A] overflow-x-hidden antialiased font-sans">
      <StoryClient />
    </main>
  );
}
