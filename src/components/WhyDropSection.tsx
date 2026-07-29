'use client';

import { Droplets, Recycle, Sparkles } from 'lucide-react';

const features = [
  {
    num: '01',
    title: 'Water, refined',
    body: 'Advanced filtration and natural trace minerals deliver a crisp, zero-compromise profile.',
    metric: '0',
    unit: 'SUGAR',
    icon: Droplets,
  },
  {
    num: '02',
    title: 'Made circular',
    body: 'Aluminium protects every pour from light and oxygen, then returns to the cycle again and again.',
    metric: '∞',
    unit: 'RECYCLABLE',
    icon: Recycle,
  },
  {
    num: '03',
    title: 'Designed to belong',
    body: 'A premium format for hotels, cafés, studios and the rituals that move modern life forward.',
    metric: '01',
    unit: 'STANDARD',
    icon: Sparkles,
  },
];

export default function WhyDropSection() {
  return (
    <section className="relative overflow-hidden bg-[#E9E2D6] text-[#151515]">
      <div className="absolute inset-x-0 top-0 h-px bg-black/10" />
      <div className="mx-auto grid max-w-[1500px] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative flex min-h-[58svh] flex-col justify-between overflow-hidden bg-[#C9A84C] px-6 py-16 sm:px-10 md:px-16 md:py-24 lg:min-h-[860px]">
          <span className="text-[10px] font-black tracking-[0.34em] uppercase">The DROP. standard / 03</span>

          <div className="relative z-10 my-20">
            <p className="mb-5 max-w-sm text-sm font-bold uppercase tracking-[0.18em] text-black/55">
              Less noise. More intention.
            </p>
            <h2 className="font-[var(--font-heading)] text-[clamp(4.5rem,15vw,10rem)] font-black uppercase leading-[0.76] tracking-[-0.055em]">
              Why
              <br />
              DROP.
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-8 border-t border-black/25 pt-6 text-xs font-bold uppercase tracking-[0.16em]">
            <span>Pure by design</span>
            <span className="text-right">Built for what&apos;s next</span>
          </div>

          <span aria-hidden="true" className="absolute -bottom-16 -right-4 select-none font-[var(--font-heading)] text-[16rem] font-black leading-none text-black/[0.055] sm:text-[23rem]">
            ?
          </span>
        </div>

        <div className="flex flex-col bg-[#151515] px-5 py-8 text-white sm:px-8 md:px-12 md:py-14 lg:px-16">
          <div className="mb-10 flex items-end justify-between border-b border-white/15 pb-6 md:mb-16">
            <p className="max-w-md text-base leading-relaxed text-white/55 md:text-lg">
              Hydration stripped back to its essential parts, then rebuilt with purpose.
            </p>
            <span className="hidden text-[10px] font-bold tracking-[0.3em] text-[#C9A84C] uppercase sm:block">
              Explore the system
            </span>
          </div>

          <div className="flex flex-1 flex-col justify-center">
            {features.map(({ num, title, body, metric, unit, icon: Icon }) => (
              <article
                key={num}
                className="group grid grid-cols-[3rem_1fr] gap-4 border-b border-white/15 py-8 transition-colors duration-500 first:border-t hover:bg-white/[0.035] sm:grid-cols-[4rem_1fr_auto] sm:gap-6 md:py-10"
              >
                <span className="pt-1 text-[10px] font-black tracking-[0.2em] text-[#C9A84C]">{num}</span>
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <Icon size={20} strokeWidth={1.7} className="text-[#C9A84C]" aria-hidden="true" />
                    <h3 className="text-2xl font-black uppercase tracking-tight md:text-4xl">{title}</h3>
                  </div>
                  <p className="max-w-xl text-sm leading-relaxed text-white/55 md:text-base">{body}</p>
                </div>
                <div className="col-start-2 mt-5 flex items-end gap-2 sm:col-start-auto sm:mt-0 sm:flex-col sm:items-end sm:justify-center">
                  <span className="font-[var(--font-heading)] text-5xl font-black leading-none text-[#C9A84C] md:text-7xl">{metric}</span>
                  <span className="text-[9px] font-black tracking-[0.22em] text-white/40">{unit}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
