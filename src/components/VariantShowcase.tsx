'use client';

import Image from 'next/image';
import { PointerEvent, useEffect, useRef, useState } from 'react';

const variants = [
  {
    name: 'MINT INFUSION', index: '01', image: '/assets/turntable/mint-front.png', accent: '#A987E9',
    theme: 'dark', headline: 'WATER.\nAS IT SHOULD BE.', prompt: 'Drag to explore', scale: 'large',
  },
  {
    name: 'ORIGINAL', index: '02', image: '/assets/turntable/original-front.png', accent: '#383838',
    theme: 'light', headline: 'THE\nESSENTIAL.', prompt: 'DRAG', scale: 'large',
  },
  {
    name: 'ATHLETE EDITION', index: '03', image: '/assets/turntable/athlete-front.png', accent: '#A987E9',
    theme: 'dark', headline: 'WATER.\nAS IT SHOULD BE.', prompt: 'Drag to explore', scale: 'athlete',
  },
  {
    name: 'CLOVE INFUSION', index: '04', image: '/assets/clove_can_transparent_fixed.png', accent: '#8E5045',
    theme: 'light', headline: 'THE\nESSENTIAL.', prompt: 'DRAG', scale: 'large',
  },
] as const;

export default function VariantShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, rotation: 0 });
  const active = variants[activeIndex];
  const isDark = active.theme === 'dark';
  const displayRotation = ((rotation % 360) + 360) % 360;
  const turnRadians = (displayRotation * Math.PI) / 180;
  const turnWidth = Math.max(0.12, Math.abs(Math.cos(turnRadians)));
  const isRearHalf = displayRotation > 90 && displayRotation < 270;

  useEffect(() => {
    if (dragging || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let previous = performance.now();
    const tick = (now: number) => {
      const elapsed = Math.min(now - previous, 40);
      previous = now;
      setRotation((value) => value + elapsed * 0.018);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [dragging]);

  useEffect(() => {
    if (dragging || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % variants.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [dragging]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = { x: event.clientX, rotation };
    setDragging(true);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setRotation(dragStart.current.rotation + (event.clientX - dragStart.current.x) * (window.innerWidth < 768 ? 0.8 : 0.5));
  };

  const setVariant = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section
      id="products"
      data-theme={active.theme}
      className={`relative isolate min-h-[100svh] overflow-hidden transition-colors duration-700 ${
        isDark ? 'bg-[#08090B] text-[#F2F0F4]' : 'bg-[#F4F1EB] text-[#22201F]'
      }`}
      style={{ '--accent': active.accent } as React.CSSProperties}
    >
      <div className={`absolute inset-0 transition-opacity duration-700 ${isDark ? 'opacity-100' : 'opacity-0'} bg-[radial-gradient(circle_at_65%_48%,rgba(104,76,143,.18),transparent_34%)]`} />

      <div className="relative mx-auto grid min-h-[100svh] w-full max-w-[1800px] grid-rows-[auto_1fr_auto] px-6 py-8 sm:px-10 md:px-16 md:py-12">
        <div className="relative z-30 flex items-center justify-between text-[10px] font-medium tracking-[0.2em] md:text-xs">
          <span>{active.theme === 'light' ? `${active.index} — ${active.name}` : `DROP / ${active.index}`}</span>
          <span className={`${isDark ? 'block' : 'hidden'} text-white/45 md:hidden`}>{active.name} / 330ML</span>
        </div>

        <div className="relative grid min-h-0 items-center md:grid-cols-[38%_62%]">
          <div className={`relative z-20 pt-8 md:pt-0 ${isDark ? 'block' : 'block'}`}>
            <h2
              className={`${
                isDark
                  ? 'font-sans text-[clamp(2.5rem,5vw,5.6rem)] font-light leading-[1.02] tracking-[-0.045em]'
                  : 'font-serif text-[clamp(3rem,6vw,7rem)] font-normal leading-[.9] tracking-[-0.045em]'
              } whitespace-pre-line`}
            >
              {active.headline.split('\n').map((line) => (
                <span key={line} className="block">
                  {line === 'AS IT SHOULD BE.' && isDark ? <span className="text-[var(--accent)]">{line}</span> : line}
                </span>
              ))}
            </h2>
            <p className={`mt-6 max-w-[290px] text-base leading-relaxed md:text-lg ${isDark ? 'text-white/48' : 'text-black/65'}`}>
              {isDark ? 'Drag to explore' : 'Still water in infinitely recyclable aluminium.'}
            </p>
            {isDark && (
              <div className="mt-14 hidden gap-3 md:flex" aria-hidden="true">
                {variants.map((variant, index) => (
                  <span key={variant.name} className="h-2.5 w-2.5 rounded-full" style={{ background: variant.accent, opacity: index === activeIndex ? 1 : .28 }} />
                ))}
              </div>
            )}
          </div>

          <div
            className={`relative z-10 flex h-[58svh] min-h-[440px] cursor-ew-resize touch-none select-none items-center justify-center overflow-hidden md:h-[79svh] ${dragging ? 'cursor-grabbing' : ''}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={() => setDragging(false)}
            onPointerCancel={() => setDragging(false)}
            onLostPointerCapture={() => setDragging(false)}
            role="slider"
            tabIndex={0}
            aria-label={`Rotate ${active.name} can`}
            aria-valuemin={0}
            aria-valuemax={360}
            aria-valuenow={Math.round(displayRotation)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') setRotation(rotation - 12);
              if (event.key === 'ArrowRight') setRotation(rotation + 12);
            }}
          >
            <div className="relative h-full w-full">
              <div
                key={active.name}
                className="can-product-enter absolute inset-0 will-change-transform"
                style={{
                  transform: `scaleX(${turnWidth}) translateX(${Math.sin(turnRadians) * 2.25}%)`,
                  filter: `brightness(${isRearHalf ? 0.78 : 1}) saturate(${isRearHalf ? 0.84 : 1})`,
                }}
              >
                  <Image
                    src={active.image}
                    alt={`DROP ${active.name.toLowerCase()} canned water`}
                    fill
                    priority
                    quality={100}
                    sizes="(max-width: 767px) 92vw, 62vw"
                    draggable={false}
                    className={`pointer-events-none object-contain drop-shadow-[0_30px_28px_rgba(0,0,0,.28)] ${
                      active.scale === 'athlete' ? 'scale-[.84] md:scale-[.98]' : 'scale-[.9] md:scale-[1.08]'
                    }`}
                  />
              </div>
            </div>
          </div>

          {!isDark && <div className="pointer-events-none absolute bottom-[2%] right-[8%] h-[18px] w-[45%] rounded-[50%] bg-black/10 blur-xl" />}
        </div>

        <div className="relative z-30 mx-auto w-full max-w-[1120px] pb-1">
          <div className="mb-3 flex justify-center gap-3 md:hidden">
            {variants.map((variant, index) => (
              <button key={variant.name} onClick={() => setVariant(index)} className="flex h-8 w-8 items-center justify-center" aria-label={`Show ${variant.name}`} aria-pressed={index === activeIndex}>
                <span className="rounded-full" style={{ width: index === activeIndex ? 10 : 6, height: index === activeIndex ? 10 : 6, background: variant.accent, opacity: index === activeIndex ? 1 : .35 }} />
              </button>
            ))}
          </div>

          <div className={`relative ${isDark ? '' : 'mx-auto max-w-[620px]'}`}>
            {!isDark && <div className="pointer-events-none absolute -top-20 left-1/2 h-24 w-full -translate-x-1/2 rounded-[50%] border-b border-black/55" />}
            <div className={`mb-2 flex items-center justify-between text-[11px] md:text-xs ${isDark ? 'text-white/70' : 'justify-center tracking-[.28em]'}`}>
              {isDark ? <><span>00°</span><span>360°</span></> : <span>{active.prompt}</span>}
            </div>
            {isDark && (
              <div
                className="relative h-5 cursor-ew-resize touch-none before:absolute before:inset-x-0 before:top-1/2 before:h-px before:bg-white/22"
                onPointerDown={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  setRotation(((event.clientX - rect.left) / rect.width) * 360);
                }}
              >
                <span className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]" style={{ left: `${displayRotation / 3.6}%` }} />
              </div>
            )}
          </div>

          <div className="mt-4 hidden items-center justify-center gap-5 md:flex" aria-label="Choose a DROP variant">
            {variants.map((variant, index) => (
              <button
                key={variant.name}
                onClick={() => setVariant(index)}
                className={`text-[10px] tracking-[.16em] transition-opacity ${index === activeIndex ? 'opacity-100' : 'opacity-35 hover:opacity-70'}`}
                aria-pressed={index === activeIndex}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes can-product-enter {
          from { opacity: 0; filter: blur(10px); }
          to { opacity: 1; filter: blur(0); }
        }
        .can-product-enter { animation: can-product-enter 700ms cubic-bezier(.22,.61,.36,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .can-product-enter { animation: none; }
        }
      ` }} />
    </section>
  );
}
