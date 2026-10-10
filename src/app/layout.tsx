import type { Metadata, Viewport } from 'next';
import { Inter, Oswald, Playfair_Display, Space_Mono } from 'next/font/google';
import './globals.css';


const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-heading', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif', display: 'swap', preload: false });
const spaceMono = Space_Mono({ weight: ['400'], subsets: ['latin'], variable: '--font-mono', display: 'swap', preload: false });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.dropwater.in'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Premium Canned Water in India | DROP.',
    template: '%s | DROP.',
  },
  description: 'Discover DROP., premium still and functional water packaged in recyclable aluminium cans. Launching in India in 2027. Join the early-access list.',
  keywords: ['Drop Water', 'drop water', 'DROP Water', 'Premium Canned Water', 'Canned Still Water', 'Aluminum Canned Water', 'Mint Water', 'Clove Water', 'Eco Friendly Water'],
  authors: [{ name: 'DROP. Team' }],
  creator: 'DROP.',
  publisher: 'DROP.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    url: 'https://www.dropwater.in',
    siteName: 'DROP.',
    title: 'Premium Canned Water in India | DROP.',
    description: 'Premium still and functional water in recyclable aluminium cans.',
    images: [
      {
        url: '/assets/new-can-2.png',
        width: 1200,
        height: 630,
        alt: 'DROP premium canned water',
      },
    ],
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Canned Water in India | DROP.',
    description: 'Premium still and functional water in recyclable aluminium cans.',
    images: ['/assets/new-can-2.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#0F1112',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} ${playfair.variable} ${spaceMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'DROP.',
              url: 'https://www.dropwater.in',
              logo: 'https://www.dropwater.in/assets/new-can-2.png',
              email: 'contactus@dropwater.in',
              description: 'An Indian premium water brand creating still and functional water in recyclable aluminium cans.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Vashi, Juhugaon',
                addressLocality: 'Navi Mumbai',
                addressRegion: 'Maharashtra',
                postalCode: '400703',
                addressCountry: 'IN'
              },
              telephone: '+918976127355',
              sameAs: [
                'https://www.instagram.com/dropwaterco',
                'https://x.com/dropofficialw',
                'https://www.facebook.com/share/19DAJZCxGM/?mibextid=wwXIfr'
              ]
            })
          }}
        />
      </head>
      <body className="antialiased overflow-x-hidden w-full max-w-[100vw]">
          {children}
      </body>
    </html>
  );
}
