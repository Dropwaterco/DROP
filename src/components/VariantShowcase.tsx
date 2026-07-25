'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export interface CollectionItem {
  title: string;
  desc: string;
  benefits: string;
  format: string;
  img: string;
  altText: string;
}

export const collectionData: Record<'still' | 'mint' | 'athlete' | 'clove', CollectionItem> = {
  still: {
    title: 'STILL WATER',
    desc: 'Pure, crisp still water in a premium recyclable aluminium can. The standard for everyday hydration.',
    benefits: 'Everyday Hydration',
    format: '330ML / 500ML CAN',
    img: '/assets/new-can-2.png',
    altText: 'DROP premium still water in a sleek silver aluminium can',
  },
  mint: {
    title: 'MINT WATER',
    desc: 'Crisp, cooling mint infusion crafted to refresh and reset.',
    benefits: 'Recovery & Focus',
    format: '330ML / 500ML CAN',
    img: '/assets/new-can-variant-1.png',
    altText: 'DROP mint functional water can in premium purple aluminium packaging',
  },
  athlete: {
    title: 'ATHLETE EDITION',
    desc: 'Zero-compromise performance hydration with elevated electrolytes.',
    benefits: 'High-intensity Training',
    format: '330ML / 500ML CAN',
    img: '/assets/black_can_raw.png',
    altText: 'DROP athlete edition functional water in a matte black aluminium can',
  },
  clove: {
    title: 'CLOVE WATER',
    desc: 'Infused with aromatic clove extracts to restore natural vitality.',
    benefits: 'Vitality & Digestion',
    format: '330ML / 500ML CAN',
    img: '/assets/clove_can_transparent.png',
    altText: 'DROP clove water in a premium blood red aluminium can',
  },
};

type CollectionKey = keyof typeof collectionData;
const KEYS = Object.keys(collectionData) as CollectionKey[];

export default function VariantShowcase() {
  const [activeKey, setActiveKey] = useState<CollectionKey>('still');
  const activeProduct = collectionData[activeKey];
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActiveKey((prev) => {
        const currentIndex = KEYS.indexOf(prev);
        const nextIndex = (currentIndex + 1) % KEYS.length;
        return KEYS[nextIndex];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isVisible]);

  const getGradient = (key: CollectionKey) => {
    switch (key) {
      case 'mint': return 'linear-gradient(180deg, #07030A 0%, #150A21 100%)';
      case 'athlete': return 'linear-gradient(180deg, #050505 0%, #111111 100%)';
      case 'clove': return 'linear-gradient(180deg, #0A0203 0%, #1F0506 100%)';
      case 'still':
      default: return 'linear-gradient(180deg, #050709 0%, #0C1217 100%)';
    }
  };

  const getAccentColor = (key: CollectionKey) => {
    switch (key) {
      case 'mint': return '#D6BCFA';
      case 'athlete': return '#F8FAFC';
      case 'clove': return '#FEB2B2';
      case 'still':
      default: return '#E2E8F0';
    }
  };

  const getTitleStyles = (key: CollectionKey) => {
    const base = { color: getAccentColor(key) };
    switch (key) {
      case 'mint':
        return { ...base, fontFamily: 'var(--font-heading)', textTransform: 'uppercase' as const, letterSpacing: '0.02em', fontWeight: 600 };
      case 'athlete':
        return { ...base, fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif', textTransform: 'uppercase' as const, letterSpacing: '-0.02em', fontWeight: 900, transform: 'scaleY(1.1)' };
      case 'clove':
        return { ...base, fontFamily: 'var(--font-serif)', textTransform: 'none' as const, letterSpacing: '0', fontWeight: 400, fontStyle: 'italic' };
      case 'still':
      default:
        return { ...base, fontFamily: 'var(--font-body)', textTransform: 'uppercase' as const, letterSpacing: '-0.04em', fontWeight: 800 };
    }
  };

  const accentColor = getAccentColor(activeKey);
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const shouldFloat = isVisible && !isMobile && !prefersReducedMotion;

  return (
    <section ref={sectionRef} id="products" className="relative w-full text-white font-sans min-h-screen flex overflow-hidden bg-[#050505]">
      {/* Background Gradient Layers */}
      {KEYS.map((key) => (
        <div
          key={key}
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000"
          style={{
            background: getGradient(key),
            opacity: activeKey === key ? 1 : 0,
          }}
        />
      ))}
      
      <div className="max-w-[1600px] w-full mx-auto flex flex-col md:flex-row relative z-10 overflow-hidden">
        
        {/* Left Sticky Tab Navigation (aside) */}
        <aside className="w-full md:w-1/3 lg:w-1/4 pt-24 md:pt-40 px-6 md:px-12 lg:px-16 flex flex-col md:border-r border-white/5 md:sticky md:top-0 h-auto md:h-screen z-20">
          <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-white/40 mb-10 pl-4">
            The Collection
          </h2>
          
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-6 md:pb-0 scrollbar-hide">
            {KEYS.map((key) => {
              const p = collectionData[key];
              const isActive = activeKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveKey(key)}
                  className={`relative flex items-center px-5 py-4 md:py-5 rounded-2xl transition-all duration-500 text-left focus:outline-none group overflow-hidden touch-manipulation border ${
                    isActive 
                      ? 'bg-white/5 border-white/10' 
                      : 'border-transparent hover:bg-white/[0.02]'
                  }`}
                >
                  <span 
                    className={`text-sm md:text-base font-bold uppercase tracking-widest transition-colors duration-500 relative z-10 ${
                      isActive ? 'text-white' : 'text-white/30 group-hover:text-white/60'
                    }`}
                  >
                    {p.title}
                  </span>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute left-0 top-0 bottom-0 w-[3px] hidden md:block z-20"
                      style={{ backgroundColor: getAccentColor(key) }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Dynamic Viewport (main) */}
        <main className="w-full md:w-2/3 lg:w-3/4 flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 lg:px-24 py-12 md:py-32 relative z-10 overflow-hidden">
          
          {/* Text Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center z-20 mt-16 md:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeKey}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <h2 
                  className="text-5xl md:text-6xl lg:text-[6rem] mb-6 leading-[1.15] md:leading-[1.1] origin-left py-1" 
                  style={getTitleStyles(activeKey)}
                >
                  {activeProduct.title}
                </h2>
                
                <p className="text-base lg:text-lg font-light leading-relaxed text-white/70 mb-10 max-w-md">
                  {activeProduct.desc}
                </p>
                
                <div className="flex flex-col gap-4 mb-12">
                  <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 w-32">
                      Designed for
                    </span>
                    <span className="text-sm font-semibold tracking-wide text-white/90">
                      {activeProduct.benefits}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 w-32">
                      Format
                    </span>
                    <span className="text-sm font-semibold tracking-wide text-white/90">
                      {activeProduct.format}
                    </span>
                  </div>
                </div>
                
                <Link 
                  href="/#waitlist" 
                  className="inline-flex items-center justify-center px-10 py-5 text-xs font-bold tracking-[0.2em] uppercase border hover:bg-white hover:text-black transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent w-max group touch-manipulation"
                  style={{ 
                    borderColor: accentColor,
                    color: '#FFFFFF'
                  }}
                >
                  <span>Join The List</span>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Clean Floating Can Display Viewport */}
          <div className="w-full md:w-1/2 flex justify-center items-center relative h-[45vh] md:h-[75vh] z-10 overflow-hidden">
            {KEYS.map((key) => {
              const p = collectionData[key];
              const isActive = activeKey === key;
              return (
                <div
                  key={key}
                  className="absolute w-[200px] h-[400px] md:w-[280px] md:h-[560px] lg:w-[420px] lg:h-[840px] flex items-center justify-center transition-all duration-500 pointer-events-none"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                    visibility: isActive ? 'visible' : 'hidden',
                  }}
                >
                  <div 
                    className={`w-full h-full flex items-center justify-center ${
                      isActive && !prefersReducedMotion ? 'variant-showcase-float' : ''
                    }`}
                    style={{
                      filter: 'drop-shadow(0px 25px 25px rgba(0,0,0,0.5))',
                    }}
                  >
                    <img
                      src={p.img}
                      alt={p.altText}
                      className={`w-full h-full object-contain pointer-events-none transition-transform duration-500 ${
                        key === 'athlete' 
                          ? 'variant-showcase-img-athlete' 
                          : key === 'still'
                          ? 'variant-showcase-img-still' 
                          : 'variant-showcase-img-other'
                      }`}
                      style={{
                        transformOrigin: 'center'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

        </main>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-can {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @media (min-width: 768px) {
          .variant-showcase-float {
            animation: float-can 6s ease-in-out infinite;
          }
        }
        .variant-showcase-img-athlete { transform: scale(0.75) !important; }
        .variant-showcase-img-still { transform: scale(2.4) !important; }
        .variant-showcase-img-other { transform: scale(2.4) !important; }
      `}} />
    </section>
  );
}
