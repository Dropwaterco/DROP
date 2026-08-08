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
      className={`relative isolate min-h-[100svh] overflow-hidden transition-[background-color,color] duration-700 ${isDark ? 'text-[#F2F0F4]' : 'text-[#22201F]'}`}
      style={{ '--accent': active.accent, backgroundColor: active.background } as React.CSSProperties}
    >
      <div className="relative mx-auto grid min-h-[100svh] w-full max-w-[1800px] grid-rows-[auto_1fr_auto] px-6 py-8 sm:px-10 md:px-16 md:py-12">
        <header key={`header-${active.id}`} className="product-copy-enter relative z-20 flex items-center justify-between text-[10px] font-medium tracking-[0.2em] md:text-xs">
          <span>DROP / {active.index}</span>
          <span className={isDark ? 'text-white/48' : 'text-black/48'}>{active.name} / {active.capacity}</span>
        </header>

        <div className="relative grid min-h-0 items-center md:grid-cols-[39%_61%]">
          <div key={`copy-${active.id}`} className="product-copy-enter relative z-20 pt-10 md:pt-0">
            <h2 className={`${isDark ? 'font-sans font-light' : 'font-serif font-normal'} whitespace-pre-line text-[clamp(2.8rem,5.4vw,6rem)] leading-[.96] tracking-[-0.05em]`}>
              {active.headline.split('\n').map((line, index) => (
                <span key={line} className={`block ${index === 1 && active.id === 'mint' ? 'text-[var(--accent)]' : ''}`}>{line}</span>
              ))}
            </h2>
            <p className={`mt-6 max-w-[330px] text-base leading-relaxed md:text-lg ${isDark ? 'text-white/48' : 'text-black/58'}`}>{active.description}</p>
            <p className={`mt-4 text-[10px] font-medium uppercase tracking-[.22em] ${isDark ? 'text-white/38' : 'text-black/42'}`}>
              {active.modelReady ? 'Drag to rotate' : 'Product study'}
            </p>
            <Link
              href="/#waitlist"
              className={`mt-8 inline-flex min-h-12 items-center justify-center rounded-full px-7 text-[10px] font-semibold uppercase tracking-[0.18em] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 ${isDark ? 'bg-white text-black focus-visible:ring-offset-[#08090B]' : 'bg-[#22201F] text-white focus-visible:ring-offset-[#F4F1EB]'}`}
            >
              Be a customer now
            </Link>
          </div>

          <div className="relative z-10 h-[58svh] min-h-[430px] md:h-[79svh]">
            <LazyProduct3DScene products={PRODUCT_3D_CONFIG} activeIndex={activeIndex} />
          </div>
        </div>

        <footer className="relative z-20 mx-auto w-full max-w-[1120px] pb-1">
          <div className={`mb-4 flex items-center justify-between text-[10px] uppercase tracking-[.2em] ${isDark ? 'text-white/45' : 'text-black/48'}`}>
            <span>{active.index} / {String(PRODUCT_3D_CONFIG.length).padStart(2, '0')}</span>
            <span>{active.capacity} / recyclable aluminium</span>
          </div>
          <div className={`h-px w-full ${isDark ? 'bg-white/18' : 'bg-black/20'}`} aria-hidden="true" />
          <nav className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3" aria-label="Choose a DROP product">
            {PRODUCT_3D_CONFIG.map((product, index) => (
              <button
                key={product.id}
                type="button"
                onClick={() => selectProduct(index)}
                className={`min-h-8 text-[10px] uppercase tracking-[.17em] transition-opacity ${index === activeIndex ? 'opacity-100' : 'opacity-35 hover:opacity-70'}`}
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
