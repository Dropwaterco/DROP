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
        { y: 50, opacity: 0, filter: 'blur(10px)', scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          scale: 1,
          duration: 1.2,
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
      className="relative bg-[#0A0A0B] py-28 sm:py-36 md:py-44 px-5 sm:px-8 md:px-16 overflow-hidden select-none"
    >
      {/* CSS Keyframe Animations for Water Caustics & Motes */}
      <style>{`
        @keyframes caustic-flow {
          0% { transform: rotate(0deg) scale(1); opacity: 0.15; }
          50% { transform: rotate(180deg) scale(1.15); opacity: 0.25; }
          100% { transform: rotate(360deg) scale(1); opacity: 0.15; }
        }
        @keyframes mote-drift-1 {
          0% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          50% { transform: translateY(-40px) translateX(15px); opacity: 0.6; }
          100% { transform: translateY(-80px) translateX(0px); opacity: 0; }
        }
        @keyframes mote-drift-2 {
          0% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-60px) translateX(-20px); opacity: 0.7; }
          100% { transform: translateY(-120px) translateX(0px); opacity: 0; }
        }
        .caustic-bg {
          animation: caustic-flow 25s ease-in-out infinite alternate;
        }
        .mote-1 { animation: mote-drift-1 12s ease-in-out infinite; }
        .mote-2 { animation: mote-drift-2 16s ease-in-out infinite 3s; }
      `}</style>

      {/* ── Ambient Background Lighting ── */}
      {/* Secondary Mineral Teal Glow Bleeding from Edges */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(950px,160vw)] h-[min(950px,160vw)] bg-[#1B3B36]/30 rounded-full blur-[120px] md:blur-[160px] pointer-events-none" />

      {/* Primary Gold Core Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(650px,120vw)] h-[min(650px,120vw)] bg-[#C9A46A]/[0.06] rounded-full blur-[90px] md:blur-[130px] pointer-events-none" />

      {/* Water Caustics Refraction Mesh Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div
          className="caustic-bg absolute top-[-30%] left-[-20%] w-[140%] h-[160%] rounded-[40%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(232,200,136,0.08) 0%, rgba(27,59,54,0.12) 45%, transparent 75%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Floating Ambient Condensation Droplets / Light Motes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="mote-1 absolute top-[70%] left-[20%] w-1.5 h-1.5 rounded-full bg-[#E8C888]/40 blur-[0.5px]" />
        <div className="mote-2 absolute top-[80%] left-[75%] w-2 h-2 rounded-full bg-[#1B3B36]/80 blur-[1px]" />
        <div className="mote-1 absolute top-[60%] left-[82%] w-1 h-1 rounded-full bg-[#F2EFEA]/30 blur-[0.5px]" />
        <div className="mote-2 absolute top-[75%] left-[15%] w-2.5 h-2.5 rounded-full bg-[#E8C888]/30 blur-[1px]" />
      </div>

      {/* ── Main Obsidian Glass Card ── */}
      <div
        ref={formRef}
        className="max-w-2xl mx-auto relative z-10 bg-[#0A0A0B]/70 backdrop-blur-2xl border border-[#C9A46A]/30 rounded-xl p-8 sm:p-12 md:p-16 shadow-[0_35px_90px_rgba(0,0,0,0.85),0_0_40px_rgba(27,59,54,0.25)]"
      >
        {/* Subtle internal rim lighting overlay */}
        <div className="absolute inset-0 rounded-xl pointer-events-none border border-white/[0.04] bg-gradient-to-b from-white/[0.03] to-transparent" />

        {/* ── Header ── */}
        <div className="text-center mb-14 relative z-10">
          <div className="inline-block mb-4 px-4 py-1 rounded-full border border-[#C9A46A]/40 bg-[#C9A46A]/[0.08] text-[#E8C888] text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase backdrop-blur-md shadow-[0_0_15px_rgba(201,164,106,0.15)]">
            {SIZES_TEXT}
          </div>

          <h2
            className="mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#E8C888] via-[#F2EFEA] to-[#C9A46A] tracking-tight font-serif"
            style={{
              fontFamily: 'var(--font-serif), "Playfair Display", Georgia, serif',
              fontSize: 'clamp(2.4rem, 6.5vw, 4.2rem)',
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            BE FIRST TO TRY IT.
          </h2>

          <p className="text-[#F2EFEA]/60 text-xs sm:text-sm font-light tracking-[0.2em] uppercase max-w-lg mx-auto leading-relaxed">
            Launching 2027. The first batch goes to the list.
          </p>

          <div className="mt-6 h-px w-16 mx-auto bg-gradient-to-r from-transparent via-[#C9A46A]/50 to-transparent" />
        </div>

        {/* ── Form ── */}
        <div className="relative z-10">
          <LeadForm config={waitlistConfig} />
        </div>
      </div>
    </section>
  );
}
