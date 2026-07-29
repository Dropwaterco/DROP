'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CANS = [
  { id: 'purple', name: 'Mint Infusion', desc: 'Soothes digestion and naturally cools the body. No artificial cooling agents.', image: '/assets/new-can-variant-1.png', color: '#E9D5FF' },
  { id: 'black', name: 'Athlete Edition', desc: 'Enhanced with trace minerals for rapid cellular hydration and recovery.', image: '/assets/black_can_extracted.png', color: '#FFFFFF' },
  { id: 'gold', name: 'Clove Infusion', desc: 'A subtle, earthy warmth that aids immunity and restores natural vitality.', image: '/assets/clove_can_transparent_fixed.png', color: '#C9A84C' },
  { id: 'silver', name: 'Sparkling', desc: 'Crisp, perfectly carbonated effervescence for a sharper mouthfeel.', image: '/assets/new-can-2.png', color: '#E2E8F0' },
];

export default function ProductShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cansRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      if (cansRef.current) {
        const canElements = cansRef.current.querySelectorAll('.can-item');
        gsap.fromTo(
          canElements,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cansRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative bg-[#0A0A0A] py-24 sm:py-28 md:py-36 px-5 sm:px-8 md:px-16 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2
          ref={headlineRef}
          className="opacity-0 text-white mb-6"
          style={{
            fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif',
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            fontWeight: 900,
            letterSpacing: 0,
            lineHeight: 0.95,
          }}
        >
          DROP. Still Water — 330ML & 500ML
        </h2>
        <p className="text-white/60 text-base md:text-lg leading-relaxed font-medium max-w-2xl mx-auto mb-20">
          Still water. Recyclable aluminium can. No plastic, no sugar, no flavour unless you want it —<br className="hidden md:block" />
          <span className="text-white font-bold">mint, clove, and mineral infusions available.</span><br className="hidden md:block" />
          One SKU. Built right, before we build more.
        </p>

        {/* Can renders */}
        <div ref={cansRef} className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-4 gap-10 min-[420px]:gap-8 md:gap-12">
          {CANS.map((can) => (
            <div key={can.id} className="can-item opacity-0 flex flex-col items-center group">
              <div className="relative w-full max-w-[13rem] min-[420px]:max-w-none mx-auto aspect-[3/5] mb-4">
                <Image
                  src={can.image}
                  alt={`DROP. ${can.name}`}
                  fill
                  sizes="(max-width: 420px) 60vw, (max-width: 768px) 40vw, (max-width: 1200px) 20vw, 250px"
                  className="object-contain transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: 'drop-shadow(0px 5px 15px rgba(0,0,0,0.4))' }}
                  quality={85}
                />
              </div>
              <div className="mt-4 text-center px-2">
                <h3
                  className="text-sm font-black tracking-[0.2em] uppercase mb-2"
                  style={{ color: can.color }}
                >
                  {can.name}
                </h3>
                <p className="text-white/50 text-[10px] md:text-xs font-medium leading-relaxed max-w-[200px] mx-auto">
                  {can.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
