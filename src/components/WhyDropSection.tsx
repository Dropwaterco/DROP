'use client';

import React from 'react';

export default function WhyDropSection() {
  return (
    <section className="bg-[#050505] py-24 md:py-36 px-6 sm:px-8 md:px-20 text-[#e9e1d7] relative overflow-hidden">
      {/* Ambient gold glow behind the section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[80vh] bg-[#C9A84C]/[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Hero Header */}
        <div className="mb-20 md:mb-28 text-center md:text-left">
          <h2
            className="text-[80px] md:text-[120px] tracking-[0.02em] uppercase leading-[0.85] mb-8"
            style={{
              fontFamily: '"Bebas Neue", "Anton", Impact, sans-serif',
              background: 'linear-gradient(180deg, #FFFFFF 0%, #888888 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            WHY DROP.
          </h2>
          <p
            className="text-[#d0c5b2] text-lg md:text-xl max-w-2xl md:ml-1 leading-relaxed"
            style={{ fontFamily: '"DM Sans", sans-serif' }}
          >
            Hydration stripped back to its purest form, engineered for the demands of a high-performance life.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Card 1: The Water — spans 7 cols on left */}
          <article
            className="md:col-span-7 rounded-[2.5rem] p-10 relative overflow-hidden group min-h-[400px] flex flex-col justify-end transition-all duration-500"
            style={{
              background: 'rgba(22, 19, 13, 0.4)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(249, 249, 249, 0.1)',
            }}
          >
            {/* Gold glow on hover */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
              style={{
                background: 'radial-gradient(circle, rgba(201, 168, 76, 0.08) 0%, rgba(201, 168, 76, 0) 70%)',
              }}
            />

            {/* Animated SVG water flow decoration */}
            <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
              <svg
                viewBox="0 0 200 100"
                width="200"
                height="100"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  d="M0 50 Q 50 20 100 50 T 200 50"
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <animate
                    attributeName="d"
                    dur="5s"
                    repeatCount="indefinite"
                    values="M0 50 Q 50 20 100 50 T 200 50;
                            M0 50 Q 50 80 100 50 T 200 50;
                            M0 50 Q 50 20 100 50 T 200 50"
                  />
                </path>
                <path
                  d="M0 60 Q 50 30 100 60 T 200 60"
                  fill="none"
                  stroke="#C9A84C"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeOpacity="0.4"
                >
                  <animate
                    attributeName="d"
                    dur="7s"
                    repeatCount="indefinite"
                    values="M0 60 Q 50 30 100 60 T 200 60;
                            M0 60 Q 50 90 100 60 T 200 60;
                            M0 60 Q 50 30 100 60 T 200 60"
                  />
                </path>
              </svg>
            </div>

            {/* Large ghost number */}
            <span
              className="absolute top-10 right-10 text-[80px] text-[#C9A84C] opacity-20 group-hover:opacity-40 transition-opacity duration-500 z-10 leading-none"
              style={{ fontFamily: '"Bebas Neue", sans-serif' }}
            >
              01
            </span>

            {/* Content */}
            <div className="relative z-10 w-full md:w-3/4">
              <div className="inline-block px-3 py-1 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 mb-6">
                <span
                  className="text-[#C9A84C] text-xs font-bold tracking-[0.1em] uppercase"
                  style={{ fontFamily: '"DM Sans", sans-serif' }}
                >
                  Core Element
                </span>
              </div>
              <h3
                className="text-5xl tracking-[0.04em] text-[#e9e1d7] mb-4"
                style={{ fontFamily: '"Bebas Neue", sans-serif' }}
              >
                THE WATER
              </h3>
              <p
                className="text-base text-[#d0c5b2] leading-relaxed"
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                Sourced with absolute precision. Our water undergoes advanced filtration to ensure a crisp, zero-compromise profile, fortified with natural trace minerals. No sugars, no synthetic additives, just pure cellular hydration.
              </p>
            </div>
          </article>

          {/* Card 3: The Experience — spans 5 cols, 2 rows on right */}
          <article className="md:col-span-5 md:row-span-2 bg-gradient-to-br from-[#e9e1d7] to-[#F9F9F9] text-[#111111] rounded-[2.5rem] p-10 relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(233,225,215,0.05)] transition-shadow duration-500 min-h-[500px] flex flex-col">
            {/* Ghost number */}
            <span
              className="absolute top-10 right-10 text-[80px] text-[#111111] opacity-10 group-hover:opacity-20 transition-opacity duration-500 leading-none"
              style={{ fontFamily: '"Bebas Neue", sans-serif' }}
            >
              03
            </span>

            <div className="flex-grow flex flex-col justify-end">
              <div className="inline-block px-3 py-1 rounded-full bg-[#111111]/5 border border-[#111111]/10 mb-6 self-start">
                <span
                  className="text-[#111111] text-xs font-bold tracking-[0.1em] uppercase"
                  style={{ fontFamily: '"DM Sans", sans-serif' }}
                >
                  Lifestyle
                </span>
              </div>
              <h3
                className="text-5xl tracking-[0.04em] text-[#111111] mb-4"
                style={{ fontFamily: '"Bebas Neue", sans-serif' }}
              >
                THE EXPERIENCE
              </h3>
              <p
                className="text-base text-[#343029] leading-relaxed"
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                Engineered to elevate any environment. Whether stocking a premium boutique hotel, served at high-end fitness studios, or fueling your personal best, DROP is designed to be the definitive standard for modern hydration.
              </p>
            </div>
          </article>

          {/* Card 2: The Can — spans 7 cols on left */}
          <article
            className="md:col-span-7 rounded-[2.5rem] p-10 relative overflow-hidden group min-h-[300px] flex flex-col justify-end transition-all duration-500"
            style={{
              background: 'rgba(22, 19, 13, 0.4)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(249, 249, 249, 0.1)',
            }}
          >
            {/* Gold glow on hover */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
              style={{
                background: 'radial-gradient(circle, rgba(201, 168, 76, 0.08) 0%, rgba(201, 168, 76, 0) 70%)',
              }}
            />

            {/* Ghost number */}
            <span
              className="absolute top-10 right-10 text-[80px] opacity-10 group-hover:opacity-30 transition-opacity duration-500 leading-none z-10"
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                background: 'linear-gradient(to right, #e2e2e2, #c6c6c7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              02
            </span>

            {/* Content */}
            <div className="relative z-10 w-full md:w-3/4">
              <div className="inline-block px-3 py-1 rounded-full bg-[#e2e2e2]/5 border border-[#e2e2e2]/10 mb-6">
                <span
                  className="text-[#e2e2e2] text-xs font-bold tracking-[0.1em] uppercase"
                  style={{ fontFamily: '"DM Sans", sans-serif' }}
                >
                  Vessel
                </span>
              </div>
              <h3
                className="text-5xl md:text-6xl tracking-[0.04em] mb-4"
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  background: 'linear-gradient(to right, #e2e2e2, #c6c6c7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                THE CAN
              </h3>
              <p
                className="text-base text-[#d0c5b2] leading-relaxed"
                style={{ fontFamily: '"DM Sans", sans-serif' }}
              >
                Aluminium isn&apos;t just an aesthetic choice; it&apos;s a structural and environmental necessity. Infinitely recyclable, it shields the water from light and oxygen degradation while keeping it colder for longer. Pure performance packaging.
              </p>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}
