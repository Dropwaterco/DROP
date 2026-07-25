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
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
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
      className="relative bg-[#0A0A0A] py-24 sm:py-32 md:py-40 px-6 sm:px-10 md:px-16 text-white border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Asymmetric Split Layout */}
        <div ref={formRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Bold Headline & Brand Info */}
          <div className="lg:col-span-5 flex flex-col items-start pt-2">
            <div className="inline-block px-3 py-1 bg-white/5 border border-white/15 text-[#00E599] text-[10px] md:text-xs font-mono font-bold tracking-[0.2em] uppercase rounded-sm mb-6">
              {SIZES_TEXT}
            </div>

            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase leading-[0.92] text-white mb-6 font-sans"
              style={{ fontFamily: 'var(--font-heading), sans-serif' }}
            >
              BE FIRST<br />TO TRY IT.
            </h2>

            <p className="text-white/60 text-sm md:text-base font-normal tracking-wide leading-relaxed max-w-md">
              Launching 2027. The first batch goes to the list.
            </p>

            <div className="hidden lg:block mt-12 pt-8 border-t border-white/10 w-full text-white/40 text-xs font-mono tracking-widest uppercase">
              DROP. ESSENCE OF PURITY
            </div>
          </div>

          {/* Right Column: High-contrast Commercial DTC Form Container */}
          <div className="lg:col-span-7 bg-[#111111] border border-white/10 p-8 sm:p-10 md:p-12 rounded-sm shadow-2xl">
            <LeadForm config={waitlistConfig} />
          </div>

        </div>
      </div>
    </section>
  );
}
