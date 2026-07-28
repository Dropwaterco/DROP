'use client';

import React from 'react';

const features = [
  {
    num: '01',
    title: 'The Water',
    mobileBody: 'Crisp filtered water with natural trace minerals. No sugar or synthetic additives.',
    body: 'Sourced with absolute precision. Our water undergoes advanced filtration to ensure a crisp, zero-compromise profile, fortified with natural trace minerals. No sugars, no synthetic additives, just pure cellular hydration.',
  },
  {
    num: '02',
    title: 'The Can',
    mobileBody: 'Infinitely recyclable aluminium that protects flavour and stays colder for longer.',
    body: 'Aluminium isn\u2019t just an aesthetic choice; it\u2019s a structural and environmental necessity. Infinitely recyclable, it shields the water from light and oxygen degradation while keeping it colder for longer.',
  },
  {
    num: '03',
    title: 'The Experience',
    mobileBody: 'Premium hydration designed for hotels, cafés, studios and everyday performance.',
    body: 'Engineered to elevate any environment. Whether stocking a premium boutique hotel, served at high-end fitness studios, or fueling your personal best, DROP is the definitive standard for modern hydration.',
  },
];

export default function WhyDropSection() {
  return (
    <section className="bg-[#F5F0E8] relative overflow-hidden">
      {/* ── CSS keyframes ── */}
      <style>{`
        @keyframes wd-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes wd-float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33%      { transform: translate(12px, -8px) rotate(1deg); }
          66%      { transform: translate(-8px, 6px) rotate(-0.5deg); }
        }
        .wd-card {
          border: 1px solid rgba(17,17,17,0.06);
          transition: transform 0.5s cubic-bezier(.22,1,.36,1), box-shadow 0.5s, border-color 0.5s;
        }
        .wd-card:hover {
          border-color: rgba(201,168,76,0.25);
          transform: translateY(-3px);
          box-shadow: 0 24px 64px rgba(17,17,17,0.08), 0 0 0 1px rgba(201,168,76,0.08);
        }
        .wd-num {
          background: linear-gradient(135deg, #C9A84C 0%, #A68B3A 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* ── Decorative floating shapes (CSS-only) ── */}
      <div
        className="absolute top-[10%] right-[5%] w-[350px] h-[350px] rounded-full pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
          animation: 'wd-float 20s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-[5%] left-[3%] w-[280px] h-[280px] rounded-full pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
          animation: 'wd-float 16s ease-in-out infinite 4s',
        }}
      />

      {/* ── Content ── */}
      <div className="max-w-5xl w-full mx-auto px-5 sm:px-6 md:px-12 py-20 sm:py-28 md:py-40 relative z-10">

        {/* ── Header ── */}
        <div className="mb-14 sm:mb-20 md:mb-28">
          <span className="inline-block text-[#C9A84C] text-[11px] font-semibold tracking-[0.25em] uppercase mb-5">
            Why Choose Us
          </span>

          <h2 className="font-[var(--font-heading)] text-[clamp(2.75rem,13vw,6rem)] font-bold tracking-[-0.01em] uppercase leading-[0.95] text-[#111]">
            Why{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #C9A84C 0%, #D4B96A 50%, #A68B3A 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'wd-shimmer 5s linear infinite',
              }}
            >
              Drop.
            </span>
          </h2>

          {/* Gold accent line */}
          <div className="mt-7 mb-8 h-px w-20 bg-gradient-to-r from-[#C9A84C] to-transparent" />

          <p className="text-[#666] text-base md:text-lg max-w-md leading-relaxed font-light">
            <span className="md:hidden">Pure water. Smarter packaging. Better hydration.</span>
            <span className="hidden md:inline">Hydration stripped back to its purest form, engineered for the demands of a high-performance life.</span>
          </p>
        </div>

        {/* ── Feature cards ── */}
        <div className="flex flex-col gap-3 md:gap-4">
          {features.map((f, i) => (
            <article
              key={f.num}
              className="wd-card group rounded-2xl md:rounded-3xl bg-white/70 backdrop-blur-sm relative overflow-hidden"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Subtle hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 10% 50%, rgba(201,168,76,0.06) 0%, transparent 50%)',
                }}
              />

              <div className="relative z-10 flex flex-row md:items-start gap-4 md:gap-10 p-5 md:p-10">
                {/* Number */}
                <div className="shrink-0 w-10 md:w-24">
                  <span className="wd-num text-2xl md:text-5xl font-bold tracking-tighter leading-none font-[var(--font-heading)]">
                    {f.num}
                  </span>
                </div>

                {/* Vertical divider */}
                <div className="hidden md:block w-px self-stretch bg-gradient-to-b from-transparent via-[#C9A84C]/20 to-transparent" />

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight uppercase text-[#111] mb-2 font-[var(--font-heading)] group-hover:text-[#9A7B30] transition-colors duration-500">
                    {f.title}
                  </h3>
                  <p className="text-[#666] text-base leading-relaxed max-w-xl font-normal group-hover:text-[#555] transition-colors duration-500">
                    <span className="md:hidden">{f.mobileBody}</span>
                    <span className="hidden md:inline">{f.body}</span>
                  </p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center shrink-0 w-9 h-9 rounded-full border border-[#111]/[0.08] group-hover:border-[#C9A84C]/40 group-hover:bg-[#C9A84C]/[0.07] transition-all duration-500 self-center">
                  <svg
                    className="w-3.5 h-3.5 text-[#111]/20 group-hover:text-[#C9A84C] transition-all duration-500 group-hover:translate-x-0.5 transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── Bottom tagline ── */}
        <div className="mt-16 hidden md:flex items-center gap-4 opacity-25">
          <div className="h-px flex-1 bg-gradient-to-r from-[#C9A84C]/50 to-transparent" />
          <span className="text-[10px] text-[#9A7B30] tracking-[0.3em] uppercase font-medium whitespace-nowrap">
            Purity · Precision · Performance
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-[#C9A84C]/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
