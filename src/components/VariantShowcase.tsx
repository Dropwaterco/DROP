'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import { LazyProduct3DScene } from './product-3d/LazyProduct3DScene';
import { PRODUCT_3D_CONFIG } from './product-3d/productConfig';

export default function VariantShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = PRODUCT_3D_CONFIG[activeIndex];
  const isDark = active.theme === 'dark';

  const selectProduct = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <section
      id="products"
      data-theme={active.theme}
      className={`relative isolate overflow-hidden md:min-h-[100svh] ${isDark ? 'text-[#F2F0F4]' : 'text-[#22201F]'}`}
      style={{ '--accent': active.accent, backgroundColor: active.background } as React.CSSProperties}
    >
      <div className="relative mx-auto grid w-full max-w-[1800px] grid-rows-[auto_1fr_auto] px-5 py-8 sm:px-10 md:min-h-[100svh] md:px-16 md:py-12">
        <header key={`header-${active.id}`} className="product-copy-enter relative z-20 flex flex-wrap items-center justify-between gap-3 text-[10px] font-medium tracking-[0.12em] md:text-xs md:tracking-[0.2em]">
          <span>DROP / {active.index}</span>
          <span className={isDark ? 'text-white/48' : 'text-black/48'}>{active.name} / {active.capacity}</span>
        </header>

        <div className="relative grid min-h-0 min-w-0 items-center gap-5 md:grid-cols-[minmax(0,39fr)_minmax(0,61fr)] md:gap-0">
          <div key={`copy-${active.id}`} className="product-copy-enter relative z-20 min-w-0 pt-8 md:pt-0">
            <h2 className={`${isDark ? 'font-sans font-light' : 'font-serif font-normal'} whitespace-pre-line text-[clamp(2rem,8.4vw,3.8rem)] leading-[1.02] tracking-[-0.04em] md:text-[clamp(2.8rem,5.4vw,6rem)] md:leading-[.96]`}>
              {active.headline.split('\n').map((line, index) => (
                <span key={line} className={`block ${index === 1 && active.id === 'mint' ? 'text-[var(--accent)]' : ''}`}>{line}</span>
              ))}
            </h2>
            <p className={`mt-4 max-w-[330px] text-base leading-relaxed md:mt-6 md:text-lg ${isDark ? 'text-white/65' : 'text-black/65'}`}>{active.description}</p>
            <p className={`mt-3 hidden text-[10px] font-medium uppercase tracking-[.22em] md:block ${isDark ? 'text-white/55' : 'text-black/55'}`}>
              {active.modelReady ? 'Drag to rotate' : 'Product study'}
            </p>
            <Link
              href="/#waitlist"
              className={`mt-5 inline-flex min-h-12 items-center justify-center rounded-full px-7 text-[11px] font-semibold uppercase tracking-[0.14em] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 md:mt-8 ${isDark ? 'bg-white text-black focus-visible:ring-offset-[#08090B]' : 'bg-[#22201F] text-white focus-visible:ring-offset-[#F4F1EB]'}`}
            >
              Be a customer now
            </Link>
          </div>

          {/* Blend the entire media layer with the section, outside its stacking context. */}
          <div className={`relative z-10 mx-auto h-[clamp(280px,48svh,420px)] w-full min-w-0 md:h-[min(72svh,720px)] md:min-h-[420px] ${isDark ? 'mix-blend-lighten' : ''}`}>
            <LazyProduct3DScene products={PRODUCT_3D_CONFIG} activeIndex={activeIndex} />
          </div>
        </div>

        <footer className="relative z-20 mx-auto w-full max-w-[1120px] pb-1">
          <div className={`mb-4 flex flex-wrap items-center justify-between gap-2 text-[9px] uppercase tracking-[.12em] sm:text-[10px] sm:tracking-[.2em] ${isDark ? 'text-white/60' : 'text-black/60'}`}>
            <span>{active.index} / {String(PRODUCT_3D_CONFIG.length).padStart(2, '0')}</span>
            <span>{active.capacity} / recyclable aluminium</span>
          </div>
          <div className={`h-px w-full ${isDark ? 'bg-white/18' : 'bg-black/20'}`} aria-hidden="true" />
          <nav className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-3" aria-label="Choose a DROP product">
            {PRODUCT_3D_CONFIG.map((product, index) => (
              <button
                key={product.id}
                type="button"
                onClick={() => selectProduct(index)}
                className={`min-h-11 rounded-full border px-3 py-2 text-[10px] uppercase tracking-[.12em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${index === activeIndex ? (isDark ? 'border-white/40 bg-white/10' : 'border-black/30 bg-black/5') : 'border-transparent opacity-60 hover:opacity-100'}`}
                aria-pressed={index === activeIndex}
              >
                {product.name}
              </button>
            ))}
          </nav>
        </footer>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes product-copy-enter {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .product-copy-enter { animation: product-copy-enter 320ms cubic-bezier(.22,.61,.36,1) both; }
        @media (prefers-reduced-motion: reduce) { .product-copy-enter { animation: none; } }
      ` }} />
    </section>
  );
}
