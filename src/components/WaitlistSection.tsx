'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LeadForm, { LeadFormConfig } from './ui/LeadForm';
import { PRODUCTS } from '@/lib/data/products';

gsap.registerPlugin(ScrollTrigger);

const DRINK_OPTIONS = ['Gym', 'Café', 'Home', 'Work', 'Events', 'Other'] as const;

// Extract unique sizes from all products
const ALL_SIZES = Array.from(
  new Set(PRODUCTS.flatMap(p => p.availableSizes || []))
).map(s => s.toUpperCase());
const SIZES_TEXT = ALL_SIZES.length > 0 ? `${ALL_SIZES.join(' & ')} CANS` : 'PREMIUM CANS';

const waitlistConfig: LeadFormConfig = {
  endpoint: '/api/v1/waitlist',
  submitText: 'Join the List',
  submitLoadingText: 'Joining...',
  successTitle: 'You\'re In',
  layout: 'stack',
  selectBgColor: '#0A0A0A',
  fields: [
    { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Your name' },
    { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@email.com' },
    { name: 'city', label: 'City', type: 'text', placeholder: 'Mumbai, Delhi, Bangalore...' },
    { name: 'drinkContext', label: 'Where would you drink DROP.?', type: 'select', options: DRINK_OPTIONS }
  ]
};

export default function WaitlistSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="waitlist"
      className="relative bg-[#1A1512] py-24 sm:py-28 md:py-36 px-5 sm:px-8 md:px-16 overflow-hidden"
    >
      {/* Warm ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(800px,150vw)] h-[min(800px,150vw)] bg-[#C9A84C]/[0.04] rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

      <div ref={formRef} className="max-w-2xl mx-auto relative z-10 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 sm:p-10 md:p-14 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-sm"
            style={{
              fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif',
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              fontWeight: 900,
              letterSpacing: 0,
              lineHeight: 0.95,
            }}
          >
            Be first to try it.
          </h2>
          <p className="text-white/60 text-sm md:text-base font-medium tracking-wide">
            Launching 2027. The first batch goes to the list.
          </p>
          <div className="inline-block mt-4 px-4 py-1.5 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 text-[#C9A84C] text-[10px] md:text-xs font-bold tracking-widest uppercase">
            {SIZES_TEXT}
          </div>
        </div>

        <LeadForm config={{ ...waitlistConfig, buttonTheme: 'outline' }} />
      </div>
    </section>
  );
}
