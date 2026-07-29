import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import HeroNavbar from '@/components/HeroNavbar';
import Footer from '@/components/Footer';
import { ArrowRight, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hydration & Sustainability Guides',
  description: 'Explore insights on sustainable packaging, aluminium recycling in India, functional water benefits, and premium hydration guides.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'The DROP. Journal | Hydration & Sustainability Guides',
    description: 'Explore insights on sustainable packaging, aluminium recycling in India, functional water benefits, and premium hydration guides.',
    siteName: 'DROP.',
    locale: 'en_IN',
    url: 'https://www.dropwater.in/blog',
    type: 'website',
    images: ['/assets/new-can-2.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The DROP. Journal | Hydration & Sustainability Guides',
    description: 'Explore insights on sustainable packaging, aluminium recycling in India, functional water benefits, and premium hydration guides.',
    images: ['/assets/new-can-2.png'],
  },
};

const BLOG_POSTS = [
  {
    slug: 'why-aluminium-cans-alternative-to-plastic',
    title: 'Why Aluminium Cans Are the Ultimate Alternative to Plastic Bottles',
    excerpt: 'Explore why infinitely recyclable aluminium is replacing single-use plastic, keeping water colder and protecting oceans from microplastics.',
    category: 'Sustainability',
    date: 'July 18, 2026',
    readTime: '4 min read',
    accentColor: '#C9A84C',
  },
  {
    slug: 'what-is-functional-water',
    title: 'What Is Functional Water? Savor Hydration Beyond Simple H2O',
    excerpt: 'Learn about the science of functional water, mineral infusions, electrolytes, and how it helps elevate training, recovery, and wellness.',
    category: 'Science & Health',
    date: 'July 15, 2026',
    readTime: '5 min read',
    accentColor: '#8b5cf6',
  },
  {
    slug: 'what-is-clove-water',
    title: 'What Is Clove Water? Ancient Spices Meet Modern Hydration',
    excerpt: 'Uncover the traditional wellness and digestive benefits of organic clove-infused water, from oral care to active antioxidant support.',
    category: 'Wellness',
    date: 'July 12, 2026',
    readTime: '3 min read',
    accentColor: '#EF4444',
  },
];

export default function BlogPage() {
  return (
    <div className="bg-[#0F1112] min-h-screen text-white flex flex-col font-sans selection:bg-[#C9A84C] selection:text-[#111111]">
      <HeroNavbar />
      
      <main className="pt-28 md:pt-36 flex-grow">
        {/* Header */}
        <section className="max-w-5xl mx-auto px-5 sm:px-8 md:px-16 text-center mb-16">
          <span className="text-[#C9A84C] text-xs font-black tracking-[0.3em] uppercase block mb-4">
            Educational Content & Guides
          </span>
          <h1 
            className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6"
            style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif' }}
          >
            The DROP. Journal
          </h1>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Discover the facts about aluminium recycling, functional hydration, and how canned water is 
            shaping a plastic-free future in India.
          </p>
        </section>

        {/* Blog Grid */}
        <section className="max-w-5xl mx-auto px-5 sm:px-8 md:px-16 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, i) => (
              <article 
                key={i}
                className="bg-white/[0.01] border border-white/5 hover:border-white/10 p-8 rounded-3xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1"
              >
                {/* Meta Row */}
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4">
                  <span className="text-[#C9A84C]">{post.category}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold tracking-tight text-white mb-4 line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>

                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-white hover:text-[#C9A84C] transition-colors duration-300 w-max group"
                >
                  Read Article 
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer theme="default" />
    </div>
  );
}
