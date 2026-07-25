'use client';

import React from 'react';

const features = [
  {
    num: '01',
    title: 'The Water',
    body: 'Sourced with absolute precision. Our water undergoes advanced filtration to ensure a crisp, zero-compromise profile, fortified with natural trace minerals. No sugars, no synthetic additives, just pure cellular hydration.',
  },
  {
    num: '02',
    title: 'The Can',
    body: 'Aluminium isn\u2019t just an aesthetic choice; it\u2019s a structural and environmental necessity. Infinitely recyclable, it shields the water from light and oxygen degradation while keeping it colder for longer.',
  },
  {
    num: '03',
    title: 'The Experience',
    body: 'Engineered to elevate any environment. Whether stocking a premium boutique hotel, served at high-end fitness studios, or fueling your personal best, DROP is the definitive standard for modern hydration.',
  },
];

export default function WhyDropSection() {
  return (
    <section className="bg-[#060606] relative overflow-hidden">
      {/* ── CSS keyframes ── */}
      <style>{`
        @keyframes wd-pulse {
          0%, 100% { opacity: 0.04; transform: scale(1); }
          50%      { opacity: 0.08; transform: scale(1.05); }
        }
        @keyframes wd-line-grow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes wd-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .wd-card {
          --border-alpha: 0.06;
          border: 1px solid rgba(255,255,255, var(--border-alpha));
          transition: --border-alpha 0.5s, transform 0.5s cubic-bezier(.22,1,.36,1), box-shadow 0.5s;
        }
        .wd-card:hover {
          --border-alpha: 0.14;
          transform: translateY(-4px);
          box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.06);
        }
        .wd-num {
          background: linear-gradient(135deg, #C9A84C 0%, #8B7333 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .wd-title-line {
          transform-origin: left;
          animation: wd-line-grow 1.2s ease-out both;
        }
      `}</style>

      {/* ── Ambient orbs (CSS-only) ── */}
      <div
        className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
          animation: 'wd-pulse 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-[-15%] left-[-8%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
          animation: 'wd-pulse 10s ease-in-out infinite 2s',
        }}
      />

      {/* ── Content container ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-28 md:py-40 relative z-10">

        {/* ── Header block ── */}
        <div className="mb-24 md:mb-32">
          {/* Eyebrow */}
          <span className="inline-block text-[#C9A84C] text-[11px] font-semibold tracking-[0.25em] uppercase mb-6 opacity-70">
            Why Choose Us
          </span>

          <h2 className="font-[var(--font-heading)] text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold tracking-tight uppercase leading-[0.88] text-white/90">
            Why{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #C9A84C 0%, #E6D5A0 50%, #C9A84C 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'wd-shimmer 4s linear infinite',
              }}
            >
              Drop.
            </span>
          </h2>

          {/* Decorative gold line */}
          <div className="mt-8 mb-10 h-px w-24 bg-gradient-to-r from-[#C9A84C] to-transparent wd-title-line" />

          <p className="text-[#999] text-base md:text-lg max-w-lg leading-relaxed font-light">
            Hydration stripped back to its purest form, engineered for the demands of a high-performance life.
          </p>
        </div>

        {/* ── Feature cards ── */}
        <div className="flex flex-col gap-5">
          {features.map((f, i) => (
            <article
              key={f.num}
              className="wd-card group rounded-2xl md:rounded-3xl bg-white/[0.02] backdrop-blur-sm relative overflow-hidden"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Hover gold glow (CSS-only) */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.04) 0%, transparent 60%)',
                }}
              />

              <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-6 md:gap-12 p-8 md:p-12">
                {/* Number */}
                <div className="shrink-0 flex items-baseline gap-4 md:w-32">
                  <span className="wd-num text-5xl md:text-6xl font-bold tracking-tighter leading-none font-[var(--font-heading)]">
                    {f.num}
                  </span>
                </div>

                {/* Vertical separator — desktop only */}
                <div className="hidden md:block w-px self-stretch bg-gradient-to-b from-transparent via-[#C9A84C]/20 to-transparent" />

                {/* Text block */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight uppercase text-white/90 mb-3 font-[var(--font-heading)] group-hover:text-[#C9A84C] transition-colors duration-500">
                    {f.title}
                  </h3>
                  <p className="text-[#777] text-sm md:text-base leading-relaxed max-w-xl font-light group-hover:text-[#999] transition-colors duration-500">
                    {f.body}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="hidden md:flex items-center justify-center shrink-0 w-10 h-10 rounded-full border border-white/[0.08] group-hover:border-[#C9A84C]/30 group-hover:bg-[#C9A84C]/5 transition-all duration-500 self-center">
                  <svg
                    className="w-4 h-4 text-white/20 group-hover:text-[#C9A84C]/70 transition-colors duration-500 group-hover:translate-x-0.5 transform"
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

        {/* ── Bottom accent line ── */}
        <div className="mt-20 flex items-center gap-4 opacity-30">
          <div className="h-px flex-1 bg-gradient-to-r from-[#C9A84C]/40 to-transparent" />
          <span className="text-[10px] text-[#C9A84C] tracking-[0.3em] uppercase font-medium">
            Purity · Precision · Performance
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-[#C9A84C]/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
