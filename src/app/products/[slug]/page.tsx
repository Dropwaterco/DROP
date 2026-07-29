import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import HeroNavbar from '@/components/HeroNavbar';
import WaitlistSection from '@/components/WaitlistSection';
import Footer from '@/components/Footer';
import FAQAccordion from './FAQAccordion';

interface FAQ {
  question: string;
  answer: string;
}

interface ProductDetails {
  title: string;
  metaDescription: string;
  h1: string;
  explanation: string;
  ingredients: string;
  canSize: string;
  sugar: string;
  minerals: string;
  intendedUse: string;
  launch: string;
  img: string;
  altText: string;
  accentColor: string;
  faqs: FAQ[];
}

const PRODUCT_DATA: Record<string, ProductDetails> = {
  'still-water': {
    title: 'Premium Still Water in Recyclable Aluminium Cans | DROP.',
    metaDescription: 'Crisp, premium still water packaged in infinitely recyclable aluminium cans. Safe, clean, and plastic-free everyday hydration.',
    h1: 'Premium Still Water in Recyclable Aluminium Cans',
    explanation: 'Pure, crisp water sourced from premium aquifers, filtered to perfection and canned in aluminum to protect against light and air, keeping it colder longer. The future of sustainable everyday hydration.',
    ingredients: 'Purified Water, Natural Minerals.',
    canSize: '330ml & 500ml',
    sugar: '0g Sugar (100% Sugar-Free)',
    minerals: 'Calcium, Magnesium, Potassium (natural balance)',
    intendedUse: 'Everyday hydration, office spaces, dining, hotels, and general health.',
    launch: 'Launching in India in 2027. Join the early-access waitlist.',
    img: '/assets/new-can-2.png',
    altText: 'DROP premium still water in a silver aluminium can',
    accentColor: '#C9A84C',
    faqs: [
      {
        question: 'Why choose canned still water over plastic?',
        answer: 'Aluminium cans are infinitely recyclable, meaning 100% of the can can be recycled back into a new can. Over 75% of all aluminium ever produced is still in use today. Additionally, aluminium cans keep water colder for much longer and are completely free from microplastics.'
      },
      {
        question: 'Where is DROP. Still Water sourced?',
        answer: 'Sourced from pristine local aquifers under strict quality controls, preserving natural crispness.'
      },
      {
        question: 'When will it be available?',
        answer: 'We are launching in major cities across India in 2027. You can secure priority access by joining our waitlist now.'
      }
    ]
  },
  'mint-water': {
    title: 'Cooling Mint Infused Canned Water | DROP.',
    metaDescription: 'Refresh and recover with DROP Mint functional water. Cooling natural mint infusion in premium aluminium cans with zero sugar.',
    h1: 'Cooling Mint Functional Water in Recyclable Cans',
    explanation: 'A crisp, cooling natural mint-infused functional water. Perfect to reset your day, revitalize your senses, and recover from intense activities. Zero calories, zero sweeteners, 100% natural.',
    ingredients: 'Purified Water, Natural Mint Extracts, Electrolytes.',
    canSize: '330ml & 500ml',
    sugar: '0g Sugar (No Sweeteners)',
    minerals: 'Magnesium, Potassium, Sodium',
    intendedUse: 'Mid-day refresh, workout recovery, mental reset, and clean hydration.',
    launch: 'Launching in India in 2027. Pre-order now open.',
    img: '/assets/new-can-variant-1.png',
    altText: 'DROP mint functional water can in premium purple aluminium packaging',
    accentColor: '#8b5cf6',
    faqs: [
      {
        question: 'Does it contain artificial flavors?',
        answer: 'No. DROP Mint Water is infused with 100% natural mint extracts with zero artificial additives, sweeteners, or preservatives.'
      },
      {
        question: 'Is it carbonated?',
        answer: 'No, this is a still water infusion, providing a smooth and clean drinking experience.'
      }
    ]
  },
  'clove-water': {
    title: 'Aromatic Clove Infused Vitality Water | DROP.',
    metaDescription: 'Restore natural vitality with DROP Clove functional water. Savor traditional health benefits of clove extract in premium canned water.',
    h1: 'Aromatic Clove Functional Water in Recyclable Cans',
    explanation: 'A unique functional water infused with aromatic organic clove extracts. Sourced from traditional Indian spices, clove extract helps restore vitality, aids digestion, and provides natural antioxidant properties.',
    ingredients: 'Purified Water, Organic Clove Extracts, Active Minerals.',
    canSize: '330ml & 500ml',
    sugar: '0g Sugar (All-Natural)',
    minerals: 'Calcium, Magnesium, Zinc',
    intendedUse: 'Post-meal digestion, daily wellness booster, vitality enhancement, and premium hydration.',
    launch: 'Launching in India in 2027. Join the early-access list.',
    img: '/assets/clove_can_transparent_fixed.png',
    altText: 'DROP clove water in a premium blood red aluminium can',
    accentColor: '#EF4444',
    faqs: [
      {
        question: 'What are the benefits of clove water?',
        answer: 'Clove has traditional wellness properties. It is widely known to aid digestion, support oral hygiene, act as a natural antioxidant, and promote general vitality.'
      },
      {
        question: 'Is the taste strong?',
        answer: 'We have carefully balanced the infusion to provide a subtle, soothing clove aroma and taste without being overpowering.'
      }
    ]
  },
  'athlete-water': {
    title: 'High-Performance Athlete Hydration Canned Water | DROP.',
    metaDescription: 'Elevated hydration for high-performance training. DROP Athlete Edition is mineral-rich canned water with zero sugar.',
    h1: 'High-Performance Athlete Hydration in Recyclable Cans',
    explanation: 'Engineered for high-intensity training. DROP Athlete Edition packs an elevated blend of essential electrolytes and trace minerals to fuel recovery, prevent dehydration, and optimize performance. Fully sugar-free.',
    ingredients: 'Purified Water, Sodium Chloride, Potassium Bicarbonate, Magnesium Carbonate, Trace Minerals.',
    canSize: '330ml & 500ml',
    sugar: '0g Sugar (Zero Carbs)',
    minerals: 'Sodium (110mg), Potassium (90mg), Magnesium (30mg)',
    intendedUse: 'Fitness training, running, athletics, yoga, and high-performance recovery.',
    launch: 'Launching in India in 2027. Pre-order active.',
    img: '/assets/black_can_raw.png',
    altText: 'DROP athlete edition functional water in a matte black aluminium can',
    accentColor: '#1F2937',
    faqs: [
      {
        question: 'How does this compare to standard sports drinks?',
        answer: 'Most sports drinks are loaded with sugars and artificial coloring. DROP Athlete Edition provides the same essential electrolytes but with 0g sugar, 0 calories, and zero artificial dyes, served cold in a premium aluminium can.'
      },
      {
        question: 'Can I drink it daily?',
        answer: 'Yes, it is excellent for everyday hydration, especially for active individuals.'
      }
    ]
  }
};

export async function generateStaticParams() {
  return Object.keys(PRODUCT_DATA).map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCT_DATA[slug];
  if (!product) return {};

  return {
    title: product.title,
    description: product.metaDescription,
    alternates: {
      canonical: `/products/${slug}`,
    },
    openGraph: {
      title: product.title,
      description: product.metaDescription,
      images: [{ url: product.img, alt: product.altText }]
    }
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCT_DATA[slug];

  if (!product) {
    notFound();
  }

  const specList = [
    { label: 'Ingredients', value: product.ingredients },
    { label: 'Can Sizes', value: product.canSize },
    { label: 'Sugar Info', value: product.sugar },
    { label: 'Minerals & Electrolytes', value: product.minerals },
    { label: 'Intended Use', value: product.intendedUse },
    { label: 'Launch Availability', value: product.launch },
  ];

  return (
    <div className="bg-[#0F1112] min-h-screen text-white flex flex-col font-sans selection:bg-[#C9A84C] selection:text-[#111111]">
      <HeroNavbar />

      <main className="flex-grow pt-28 md:pt-36">
        {/* Product Details Section */}
        <section className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16 mb-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            
            {/* Image Gallery Column */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div 
                className="relative w-[70vw] sm:w-[45vw] md:w-[35vw] lg:w-[25vw] aspect-[37/100] max-w-[320px] rounded-3xl p-6 transition-all duration-700"
                style={{
                  filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.65))',
                }}
              >
                <Image
                  src={product.img}
                  alt={product.altText}
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 768px) 70vw, 25vw"
                />
              </div>
            </div>

            {/* Info Column */}
            <div className="w-full lg:w-1/2 flex flex-col">
              <span className="text-[#C9A84C] text-xs font-black tracking-[0.3em] uppercase mb-3">
                Premium Hydration
              </span>
              <h1 
                className="text-4xl md:text-5xl font-black tracking-tight leading-none mb-6 uppercase"
                style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif' }}
              >
                {product.h1}
              </h1>
              
              <p className="text-white/70 text-base md:text-lg mb-8 leading-relaxed">
                {product.explanation}
              </p>

              {/* Specifications Block */}
              <div className="border border-white/10 rounded-2xl p-6 md:p-8 bg-white/[0.01] mb-8 space-y-4">
                {specList.map((spec, i) => (
                  <div key={i} className="flex flex-col sm:flex-row justify-between sm:items-center py-3 border-b border-white/5 last:border-0 last:pb-0 first:pt-0">
                    <span className="text-white/40 text-xs font-bold tracking-widest uppercase mb-1 sm:mb-0">
                      {spec.label}
                    </span>
                    <span className="text-white/90 text-sm font-semibold sm:text-right">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* FAQs Accordion */}
        <section className="bg-white/[0.02] border-t border-b border-white/5 py-20 md:py-28 px-5 sm:px-8 md:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 
                className="text-3xl md:text-4xl font-black uppercase mb-4"
                style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif' }}
              >
                Frequently Asked Questions
              </h2>
              <p className="text-white/50 text-sm">
                Everything you need to know about {product.h1.toLowerCase()}.
              </p>
            </div>
            
            <FAQAccordion faqs={product.faqs} />
          </div>
        </section>

        {/* Waitlist Call-to-action */}
        <WaitlistSection />
      </main>

      <Footer theme="default" />
    </div>
  );
}
