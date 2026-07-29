'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import HeroNavbar from './HeroNavbar';
import AnimatedCan from './AnimatedCan';
import HeroParticles from './HeroParticles';

const THEMES = [
  { id: 'purple', name: 'MINT WATER', bg: '#1A0B2E', accentBg: '#2D1B4E', text: '#E9D5FF', dotColor: '#8b5cf6' },
  { id: 'red', name: 'CLOVE WATER', bg: '#3c0103', accentBg: '#5A0205', text: '#fca5a5', dotColor: '#ef4444' },
  { id: 'black', name: 'ATHLETE EDITION', bg: '#000000', accentBg: '#0A0A0A', text: '#FFFFFF', dotColor: '#52525b' },
  { id: 'silver', name: 'SPARKLING WATER', bg: '#08121C', accentBg: '#102A43', text: '#F0F4F8', dotColor: '#93C5FD' }
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!isAutoCycling) return;
    
    // Auto-cycle cans every 4 seconds
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % THEMES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoCycling]);

  useEffect(() => {
    const tl = gsap.timeline();

    // Headline subtly settles into place
    tl.fromTo(
      headlineRef.current,
      { y: 32, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.15 }
    );

    // Tagline fades in
    tl.fromTo(
      taglineRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.8'
    );

    return () => { tl.kill(); };
  }, []);

  const handleFlavorSelect = useCallback((index: number) => {
    setActiveIndex(index);
    setIsAutoCycling(false); // Stop auto-cycling when user interacts
  }, []);

  const currentTheme = THEMES[activeIndex];

  useEffect(() => {
    document.documentElement.style.setProperty('--drop-marquee-bg', currentTheme.text);
    document.documentElement.style.setProperty('--drop-marquee-text', currentTheme.bg);
  }, [currentTheme.bg, currentTheme.text]);

  return (
    <section
      id="hero"
      className="relative isolate w-full min-h-[100svh] overflow-hidden transition-colors duration-1000 flex flex-col md:block"
      style={{ backgroundColor: currentTheme.bg, clipPath: 'inset(0)' }}
    >
      <HeroNavbar activeIndex={activeIndex} />
      <HeroParticles />

      {/* Right Side/Bottom Accent Background (Curve Split) */}
      <div
        className="absolute right-0 bottom-0 md:top-0 w-full md:w-[35%] lg:w-[30%] h-[42%] md:h-full rounded-t-[42px] md:rounded-t-none md:rounded-l-[100px] transition-colors duration-1000 z-0"
        style={{ backgroundColor: currentTheme.accentBg }}
      >
        {/* Semi-circle shape on the line */}
        <div
          className="absolute left-1/2 top-0 md:left-0 md:top-1/2 -translate-x-1/2 -translate-y-1/2 w-[20vh] h-[20vh] md:w-[40vh] md:h-[40vh] rounded-full z-0 transition-colors duration-1000"
          style={{ backgroundColor: currentTheme.accentBg, opacity: 0.7 }}
        />
      </div>

      {/* Vertical Name Display - Hidden on mobile for cleaner layout */}
      <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-[10] pointer-events-none select-none overflow-hidden h-[80vh] hidden md:flex items-center justify-center vertical-text-container">
        <h2
          className="text-[10vh] md:text-[15vh] font-black tracking-tighter opacity-10 transition-colors duration-1000 whitespace-nowrap pointer-events-none select-none"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            color: currentTheme.text,
            fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif'
          }}
        >
          {currentTheme.name}
        </h2>
      </div>

      {/* Content Container (Centered & spaced vertically on mobile to prevent overlapping the absolute can) */}
      <div className="relative z-[50] w-full max-w-full md:w-[48%] px-5 sm:px-8 md:pl-16 lg:pl-24 flex flex-col items-center md:items-start gap-5 pt-28 pb-8 md:py-0 md:absolute md:inset-y-0 md:left-0 md:justify-center text-center md:text-left pointer-events-auto">

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="opacity-0 transition-colors duration-1000 mb-2 order-1"
          style={{
            fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif',
            fontSize: 'clamp(2rem, 8.5vw, 4.5rem)',
            color: currentTheme.text,
            fontWeight: 900,
            letterSpacing: 'clamp(0.01em, 0.4vw, 0.035em)',
            lineHeight: 1,
            textShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}
        >
          BUILDING INDIA&apos;S<br />
          PREMIUM CANNED<br />
          WATER BRAND
        </h1>

        {/* Interactive Flavor Selectors */}
        <div className="flex gap-5 items-center justify-center md:justify-start mb-1 z-[60] relative pointer-events-auto flavor-selector-btn order-3 md:order-2 mt-2 md:mt-0">
          {THEMES.map((theme, idx) => (
            <button
              key={theme.id}
              onClick={() => handleFlavorSelect(idx)}
              aria-label={`Select ${theme.name}`}
              className={`w-11 h-11 rounded-full border-[10px] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent ${activeIndex === idx ? 'border-white/70' : 'border-transparent hover:border-white/30'}`}
              style={{ 
                backgroundColor: theme.dotColor,
                boxShadow: activeIndex === idx ? `0 0 15px ${theme.dotColor}` : 'none'
              }}
            />
          ))}
        </div>

        {/* Buttons and Pricing Anchors */}
        <div className="mt-1 md:mt-6 flex flex-col items-center md:items-start gap-4 w-full relative z-[60] pointer-events-auto order-2 md:order-3">
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center md:justify-start items-center">
            <a
              href="#waitlist"
              className="px-8 sm:px-10 min-h-12 py-3.5 w-full max-w-[22rem] sm:w-auto sm:max-w-none font-bold tracking-[0.12em] sm:tracking-[0.18em] text-xs rounded-full shadow-xl hover:shadow-2xl md:hover:-translate-y-1 active:translate-y-0 transition-colors duration-300 ring-1 ring-white/20 text-center flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
              style={{
                backgroundColor: currentTheme.id === 'red' ? '#fca5a5' : currentTheme.id === 'purple' ? '#E9D5FF' : '#FFFFFF',
                color: currentTheme.id === 'red' ? '#450a0a' : currentTheme.id === 'purple' ? '#1A0B2E' : '#0A0A0A'
              }}
            >
              JOIN THE WAITLIST
            </a>
            
            <a
              href="#products"
              className="px-8 sm:px-10 min-h-12 py-3.5 w-full max-w-[22rem] sm:w-auto sm:max-w-none bg-transparent border border-white/20 font-bold tracking-[0.12em] sm:tracking-[0.18em] text-xs rounded-full hover:bg-white/10 hover:border-white/40 transition-colors duration-300 text-center flex items-center justify-center md:hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
              style={{ color: currentTheme.text }}
            >
              EXPLORE FLAVORS
            </a>
          </div>
        </div>

        {/* Sleek Footnote */}
        <div
          ref={taglineRef}
          className="mt-2 md:mt-7 font-semibold tracking-[0.1em] sm:tracking-[0.18em] md:tracking-[0.25em] text-xs opacity-0 transition-colors duration-1000 flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-2 sm:gap-x-5 uppercase max-w-[22rem] sm:max-w-none pointer-events-none order-4"
          style={{ color: currentTheme.text }}
        >
          <span className="opacity-70">330ML & 500ML</span>
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40 shadow-[0_0_10px_currentColor]"></span>
          <span className="opacity-70">STILL WATER</span>
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40 shadow-[0_0_10px_currentColor]"></span>
          <span className="opacity-70">LAUNCHING 2027</span>
        </div>
      </div>

      <AnimatedCan activeIndex={activeIndex} />
    </section>
  );
}
