'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Droplet, Recycle, Ban, Zap } from 'lucide-react';

const COL_1_ITEMS = [
  { src: '/assets/Add_some_details_to_the_202606301348.jpeg', alt: 'DROP premium still water in a silver aluminium can', height: 380, width: 280 },
  { src: '/assets/lifestyle-4.jpeg', alt: 'DROP mint functional water can in premium purple aluminium packaging', height: 280, width: 350 },
  { src: '/assets/lifestyle-5.jpeg', alt: 'DROP premium canned water for gyms and fitness studios', height: 440, width: 280 },
  { src: '/assets/clove_can.jpeg', alt: 'DROP clove water in a premium blood red aluminium can', height: 320, width: 320 },
  { src: '/assets/screenshot-1.png', alt: 'DROP sustainable packaged water brand website interface screenshot', height: 350, width: 350 },
];

const COL_2_ITEMS = [
  { src: '/assets/screenshot-2.png', alt: 'DROP premium water brand India waitlist counter screenshot', height: 300, width: 380 },
  { src: '/assets/lifestyle-1.jpeg', alt: 'DROP recyclable canned water served at a fitness studio', height: 420, width: 280 },
  { src: '/assets/lifestyle-2.jpeg', alt: 'Infinitely recyclable aluminium water cans on display at a café', height: 350, width: 300 },
  { src: '/assets/lifestyle-3.jpeg', alt: 'DROP premium still water served cold at a luxury hotel lobby', height: 280, width: 400 },
];

export default function FeatureSplitSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Pause marquee animations when section is off-screen
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '100px' }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (marquee1Ref.current) {
      marquee1Ref.current.style.animationPlayState = isVisible ? 'running' : 'paused';
    }
    if (marquee2Ref.current) {
      marquee2Ref.current.style.animationPlayState = isVisible ? 'running' : 'paused';
    }
  }, [isVisible]);

  return (
    <section 
      id="features" 
      ref={sectionRef}
      className="relative w-full min-h-[100svh] bg-[#F4F4F3] text-[#111111] flex flex-col lg:flex-row overflow-hidden border-b border-[#E5E5E5]/30 z-10 m-0 p-0"
      style={{ marginTop: 0, marginBottom: 0 }}
    >
      
      {/* Left side: Image Marquee (Horizontal on Mobile, Vertical on Desktop) */}
      <div className="w-full lg:w-[49%] h-[50svh] lg:h-[100svh] relative overflow-hidden bg-[#EBEBEA] select-none pointer-events-none">
        
        <div className="absolute inset-0 flex flex-col lg:flex-row gap-3 lg:gap-4 p-3 lg:p-4 justify-center">
          
          {/* Column/Row 1 */}
          <div className="w-full lg:w-1/2 h-1/2 lg:h-full overflow-hidden relative flex lg:block">
            <div ref={marquee1Ref} className="flex flex-row lg:flex-col gap-3 lg:gap-4 h-full lg:w-full animate-marquee-1 items-center lg:items-stretch">
              {[...COL_1_ITEMS, ...COL_1_ITEMS].map((item, i) => (
                <div 
                  key={`col1-${i}`} 
                  className="marquee-item relative overflow-hidden rounded-[20px] lg:rounded-[28px] bg-[#E1E1E0] shadow-sm shrink-0"
                  style={{ 
                    '--item-w': `${item.width}px`,
                    '--item-h': `${item.height}px`
                  } as React.CSSProperties}
                >
                  <Image 
                    src={item.src} 
                    alt={item.alt} 
                    fill 
                    sizes="(max-width: 1024px) 40vw, 25vw"
                    className="object-contain p-2 lg:p-3"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Column/Row 2 */}
          <div className="w-full lg:w-1/2 h-1/2 lg:h-full overflow-hidden relative flex lg:block">
            <div ref={marquee2Ref} className="flex flex-row lg:flex-col gap-3 lg:gap-4 h-full lg:w-full animate-marquee-2 items-center lg:items-stretch">
              {[...COL_2_ITEMS, ...COL_2_ITEMS].map((item, i) => (
                <div 
                  key={`col2-${i}`} 
                  className="marquee-item relative overflow-hidden rounded-[20px] lg:rounded-[28px] bg-[#E1E1E0] shadow-sm shrink-0"
                  style={{ 
                    '--item-w': `${item.width}px`,
                    '--item-h': `${item.height}px`
                  } as React.CSSProperties}
                >
                  <Image 
                    src={item.src} 
                    alt={item.alt} 
                    fill 
                    sizes="(max-width: 1024px) 40vw, 25vw"
                    className="object-contain p-2 lg:p-3"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Right side: Content Block */}
      <div className="w-full lg:w-[51%] flex flex-col justify-center px-6 py-12 md:px-16 lg:px-24 bg-[#F4F4F3] relative z-10">
        <div className="max-w-[580px] w-full mx-auto lg:mx-0">
          <h2 
            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.05] mb-6 uppercase"
            style={{
              fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif',
              fontWeight: 900,
            }}
          >
            Filtered to be better.<br />
            <span className="text-[#1A5F7A]">Naturally.</span>
          </h2>
          
          <p className="text-base md:text-lg font-medium text-[#111111]/70 leading-relaxed mb-12">
            Our purity comes from the power of pristine sources. We&apos;ve created a collection of premium functional waters for you, without a single compromise.
          </p>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 gap-6 md:gap-8 mb-12">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-full shadow-md text-[#1A5F7A]">
                <Ban size={24} strokeWidth={2.5} />
              </div>
              <div className="font-black uppercase tracking-widest text-[10px] md:text-xs">No<br/>Plastic</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-full shadow-md text-[#1A5F7A]">
                <Droplet size={24} strokeWidth={2.5} />
              </div>
              <div className="font-black uppercase tracking-widest text-[10px] md:text-xs">Real<br/>Minerals</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-full shadow-md text-[#1A5F7A]">
                <Zap size={24} strokeWidth={2.5} />
              </div>
              <div className="font-black uppercase tracking-widest text-[10px] md:text-xs">Zero<br/>Sugar</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-full shadow-md text-[#1A5F7A]">
                <Recycle size={24} strokeWidth={2.5} />
              </div>
              <div className="font-black uppercase tracking-widest text-[10px] md:text-xs">100%<br/>Recyclable</div>
            </div>
          </div>

          <div>
            <Link
              href="/#waitlist"
              className="inline-block bg-[#D62828] text-white px-8 md:px-12 py-4 text-xs font-black tracking-[0.2em] uppercase rounded-full hover:bg-[#A81D1D] hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-300 shadow-xl shadow-[#D62828]/20 focus:outline-none focus:ring-2 focus:ring-[#D62828] focus:ring-offset-2 focus:ring-offset-[#F4F4F3] touch-manipulation"
            >
              Check Availability
            </Link>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .marquee-item {
          width: var(--item-w);
          height: 100%;
        }

        @media (min-width: 1024px) {
          .marquee-item {
            width: 100%;
            height: var(--item-h);
          }
        }

        @keyframes marqueeLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }

        @keyframes marqueeDown {
          0% { transform: translate3d(0, -50%, 0); }
          100% { transform: translate3d(0, 0%, 0); }
        }

        .animate-marquee-1 {
          animation: marqueeLeft 20s linear infinite;
        }

        .animate-marquee-2 {
          animation: marqueeLeft 25s linear infinite;
          animation-direction: reverse;
        }

        @media (min-width: 1024px) {
          .animate-marquee-1 {
            animation: marqueeDown 20s linear infinite;
            animation-direction: normal;
          }
          
          .animate-marquee-2 {
            animation: marqueeDown 25s linear infinite;
            animation-direction: normal;
            animation-delay: -10s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-1, .animate-marquee-2 {
            animation: none !important;
            transform: translate3d(0, 0, 0) !important;
          }
        }
      `}} />
    </section>
  );
}
