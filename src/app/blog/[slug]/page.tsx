import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import HeroNavbar from '@/components/HeroNavbar';
import Footer from '@/components/Footer';
import WaitlistSection from '@/components/WaitlistSection';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';

interface Article {
  title: string;
  metaDescription: string;
  category: string;
  date: string;
  datePublished: string;
  readTime: string;
  image: string;
  content: React.ReactNode;
}

const ARTICLES_DATA: Record<string, Article> = {
  'why-aluminium-cans-alternative-to-plastic': {
    title: 'Why Aluminium Cans Are the Ultimate Alternative to Plastic Bottles',
    metaDescription: 'Explore why infinitely recyclable aluminium is replacing single-use plastic, keeping water colder and protecting oceans from microplastics.',
    category: 'Sustainability',
    date: 'July 18, 2026',
    datePublished: '2026-07-18',
    readTime: '4 min read',
    image: '/assets/Add_some_details_to_the_202606301348.jpeg',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-base sm:text-lg">
        <p>
          Every year, millions of tons of plastic water bottles end up in landfills, rivers, and oceans. Despite global recycling efforts, only a small fraction of plastic is recycled, and the rest degrades over centuries into harmful microplastics.
        </p>
        <p>
          At DROP., we believe that the solution isn&apos;t just better recycling habits; it&apos;s changing the vessel itself. That&apos;s why we package our premium still and functional water in 100% recyclable aluminium cans. Here&apos;s why aluminium is the sustainable alternative we need.
        </p>

        <h2 className="text-2xl font-bold text-white uppercase mt-10 mb-4" style={{ fontFamily: '"Anton", sans-serif' }}>
          1. Infinitely Recyclable
        </h2>
        <p>
          Unlike plastic, which downgrades in quality each time it is recycled (and can typically only be recycled once or twice before becoming unusable waste), aluminium is infinitely recyclable. It does not lose its structural integrity during the recycling process.
        </p>
        <p>
          This means that a DROP. can today can be melted down and turned into a brand-new aluminium can within 60 days, repeatedly, forever. In fact, nearly 75% of all aluminium ever produced is still in active use today!
        </p>

        <h2 className="text-2xl font-bold text-white uppercase mt-10 mb-4" style={{ fontFamily: '"Anton", sans-serif' }}>
          2. No Microplastics in Your Water
        </h2>
        <p>
          Recent scientific studies have revealed that bottled water contains hundreds of thousands of microscopic plastic particles (nanoplastics) per liter. When plastic bottles are exposed to heat, transport friction, or simple storage time, they shed particles directly into the water.
        </p>
        <p>
          By choosing aluminium, you eliminate the risk of consuming microplastics, ensuring that your hydration is as pure and clean as nature intended.
        </p>

        <h2 className="text-2xl font-bold text-white uppercase mt-10 mb-4" style={{ fontFamily: '"Anton", sans-serif' }}>
          3. Stays Colder, Longer
        </h2>
        <p>
          Beyond environmental benefits, aluminium possesses high thermal conductivity. It chills rapidly and retains cold temperatures much more effectively than PET plastic or glass, giving you a crisp, refreshing, ice-cold drink every time.
        </p>

        <blockquote className="border-l-4 border-[#C9A84C] bg-white/[0.02] p-6 rounded-r-2xl my-8 italic text-white/90">
          &quot;The beverage packaging of the future is not plastic. It is a material that endures, circulates in a closed loop, and preserves both product quality and planetary health.&quot;
        </blockquote>

        <p>
          We are launching in major Indian cities like Mumbai and Bangalore in 2027. Join our early-access waitlist to secure priority access to our first batch.
        </p>
      </div>
    ),
  },
  'what-is-functional-water': {
    title: 'What Is Functional Water? Savor Hydration Beyond Simple H2O',
    metaDescription: 'Learn about the science of functional water, mineral infusions, electrolytes, and how it helps elevate training, recovery, and wellness.',
    category: 'Science & Health',
    date: 'July 15, 2026',
    datePublished: '2026-07-15',
    readTime: '5 min read',
    image: '/assets/new-can-variant-1.png',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-base sm:text-lg">
        <p>
          Our bodies are composed of roughly 60% water. While standard hydration keeps us alive, functional water is designed to help us thrive. In recent years, functional beverages have taken the health and fitness world by storm. But what exactly is functional water, and how does it work?
        </p>
        <p>
          Functional water is pure water that has been enhanced with health-promoting ingredients, such as natural herbal extracts, vitamins, trace minerals, or active electrolytes.
        </p>

        <h2 className="text-2xl font-bold text-white uppercase mt-10 mb-4" style={{ fontFamily: '"Anton", sans-serif' }}>
          Electrolytes and Performance
        </h2>
        <p>
          For athletes and fitness enthusiasts, standard water is sometimes not enough to replenish what is lost during sweat. Active exercise expels critical salts like sodium, potassium, and magnesium. 
        </p>
        <p>
          Our DROP. Athlete Edition functional water is packed with trace minerals and higher electrolyte concentrations to accelerate muscle recovery, prevent cramping, and optimize cellular hydration.
        </p>

        <h2 className="text-2xl font-bold text-white uppercase mt-10 mb-4" style={{ fontFamily: '"Anton", sans-serif' }}>
          Botanical Infusions
        </h2>
        <p>
          Functional water can also harness the power of plants. By infusing water with natural extracts like mint or clove, we unlock digestive and cooling benefits.
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li><strong>Mint Infusion:</strong> Sourced to provide crisp sensory cooling, aid digestion, and boost alertness.</li>
          <li><strong>Clove Infusion:</strong> Sourced to provide traditional vitality, antioxidant support, and oral wellness.</li>
        </ul>

        <p>
          By keeping functional water free from added sugars, artificial sweeteners, and coloring, DROP. provides a clean, premium alternative to sugary sports drinks.
        </p>
      </div>
    ),
  },
  'what-is-clove-water': {
    title: 'What Is Clove Water? Ancient Spices Meet Modern Hydration',
    metaDescription: 'Uncover the traditional wellness and digestive benefits of organic clove-infused water, from oral care to active antioxidant support.',
    category: 'Wellness',
    date: 'July 12, 2026',
    datePublished: '2026-07-12',
    readTime: '3 min read',
    image: '/assets/clove_can.jpeg',
    content: (
      <div className="space-y-6 text-white/70 leading-relaxed text-base sm:text-lg">
        <p>
          For centuries, traditional wellness systems across Asia have used cloves (Syzygium aromaticum) as a natural remedy. From digestion to oral care, cloves are rich in eugenol, a compound known for its strong antioxidant and anti-inflammatory properties.
        </p>
        <p>
          At DROP., we have modernised this ancient secret by creating DROP Clove Water—a premium, sugar-free functional water infused with organic clove extracts, served cold in infinitely recyclable aluminium cans.
        </p>

        <h2 className="text-2xl font-bold text-white uppercase mt-10 mb-4" style={{ fontFamily: '"Anton", sans-serif' }}>
          Digestive & Vitality Support
        </h2>
        <p>
          Drinking clove water after meals is a popular traditional practice in India. Clove extract stimulates digestive enzymes, reduces bloating, and supports gut comfort.
        </p>

        <h2 className="text-2xl font-bold text-white uppercase mt-10 mb-4" style={{ fontFamily: '"Anton", sans-serif' }}>
          Antioxidant Powerhouse
        </h2>
        <p>
          Cloves rank exceptionally high on the ORAC (Oxygen Radical Absorbance Capacity) scale, meaning they are incredibly effective at neutralizing free radicals and supporting cellular wellness. Our clove water delivers these benefits in a clean, refreshing daily format.
        </p>

        <blockquote className="border-l-4 border-red-500 bg-white/[0.02] p-6 rounded-r-2xl my-8 italic text-white/90">
          &quot;Uniting traditional Indian spice wisdom with modern clean hydration is our way of redefining functional beverages for health-conscious consumers.&quot;
        </blockquote>

        <p>
          Join our waitlist today to be among the first to experience the aromatic, restoring benefits of DROP Clove Water.
        </p>
      </div>
    ),
  },
};

export async function generateStaticParams() {
  return Object.keys(ARTICLES_DATA).map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES_DATA[slug];
  if (!article) return {};

  return {
    title: article.title,
    description: article.metaDescription,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: `${article.title} | DROP.`,
      description: article.metaDescription,
      type: 'article',
      siteName: 'DROP.',
      locale: 'en_IN',
      url: `https://www.dropwater.in/blog/${slug}`,
      publishedTime: article.datePublished,
      authors: ['DROP. Editorial Team'],
      images: [article.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} | DROP.`,
      description: article.metaDescription,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES_DATA[slug];

  if (!article) {
    notFound();
  }

  const articleUrl = `https://www.dropwater.in/blog/${slug}`;
  const articleImage = new URL(article.image, 'https://www.dropwater.in').toString();
  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    datePublished: article.datePublished,
    author: {
      '@type': 'Organization',
      name: 'DROP. Editorial Team',
    },
    image: articleImage,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'DROP.',
      url: 'https://www.dropwater.in',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.dropwater.in/assets/new-can-2.png',
      },
    },
  };

  return (
    <div className="bg-[#0F1112] min-h-screen text-white flex flex-col font-sans selection:bg-[#C9A84C] selection:text-[#111111]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <HeroNavbar />
      
      <main className="flex-grow pt-28 md:pt-36">
        <article className="max-w-3xl mx-auto px-5 sm:px-8 md:px-16 mb-20">
          {/* Back link */}
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Meta header */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#C9A84C] mb-6">
            <span>{article.category}</span>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-1.5 text-white/40">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.date}</span>
            </div>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-1.5 text-white/40">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </div>
          </div>

          {/* Title */}
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none mb-10 uppercase text-white"
            style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif' }}
          >
            {article.title}
          </h1>

          {/* Author/Byline */}
          <div className="flex items-center gap-3 pb-8 border-b border-white/10 mb-10">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <User className="w-4 h-4 text-white/60" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-white/80">DROP. Editorial Team</p>
              <p className="text-white/40 uppercase tracking-widest font-semibold mt-0.5">Written for People</p>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-invert max-w-none">
            {article.content}
          </div>
        </article>

        {/* Call to action Waitlist */}
        <WaitlistSection />
      </main>

      <Footer theme="default" />
    </div>
  );
}
