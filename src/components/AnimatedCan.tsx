'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';

// Cropped exports share a consistent frame without stretching the packaging.
const CANS = [
  { 
    id: 'purple', src: '/assets/cans/mint.webp', alt: 'DROP mint functional water can in premium purple aluminium packaging',
    filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.8))',
    mobileFilter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))'
  },
  { 
    id: 'red', src: '/assets/cans/clove.webp', alt: 'DROP clove water in a premium blood red aluminium can',
    filter: 'drop-shadow(0px 0px 1.5px rgba(0,0,0,0.5)) drop-shadow(0px 10px 30px rgba(0,0,0,0.15))',
    mobileFilter: 'drop-shadow(0px 5px 15px rgba(0,0,0,0.3))'
  },
  { 
    id: 'black', src: '/assets/cans/athlete.webp', alt: 'DROP athlete edition functional water in a matte black aluminium can',
    filter: 'drop-shadow(0px 0px 1.5px rgba(0,0,0,0.5)) drop-shadow(0px 10px 30px rgba(0,0,0,0.15))',
    mobileFilter: 'drop-shadow(0px 5px 15px rgba(0,0,0,0.3))'
  },
  {
    id: 'silver', src: '/assets/cans/original.webp', alt: 'DROP premium still water in a sleek silver aluminium can',
    filter: 'drop-shadow(0px 0px 1.5px rgba(0,0,0,0.5)) drop-shadow(0px 10px 30px rgba(0,0,0,0.15))',
    mobileFilter: 'drop-shadow(0px 5px 15px rgba(0,0,0,0.3))'
  }
];

export default function AnimatedCan({ activeIndex }: { activeIndex: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevIndexRef = useRef<number>(activeIndex);
  const isFirstRender = useRef(true);
  const isMobileRef = useRef(false);
  const floatingTweenRef = useRef<gsap.core.Tween | null>(null);
  const visibleRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => floatingTweenRef.current?.paused(!visibleRef.current || document.hidden || motion.matches);
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      sync();
    });
    observer.observe(container);
    document.addEventListener('visibilitychange', sync);
    motion.addEventListener('change', sync);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      motion.removeEventListener('change', sync);
    };
  }, []);

  // One-time mobile check via ref (no re-render)
  useEffect(() => {
    isMobileRef.current = window.innerWidth < 1024;
    
    const handleResize = () => {
      isMobileRef.current = window.innerWidth < 1024;
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper function to start floating loop on the active can (desktop only)
  const startFloatingLoop = (el: HTMLDivElement | null) => {
    if (!el || isMobileRef.current) return;

    // Kill previous floating tween
    if (floatingTweenRef.current) {
      floatingTweenRef.current.kill();
    }

    floatingTweenRef.current = gsap.to(el, {
      y: -20,
      rotationZ: 1,
      rotationY: 15,
      rotationX: 1,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      paused: !visibleRef.current || document.hidden || window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
  };

  useEffect(() => {
    const prevIndex = prevIndexRef.current;
    
    // Kill any active transitions/tweens on all cans
    canRefs.current.forEach(can => {
      if (can) gsap.killTweensOf(can);
    });
    if (floatingTweenRef.current) {
      floatingTweenRef.current.kill();
      floatingTweenRef.current = null;
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      
      const activeCan = canRefs.current[activeIndex];
      if (activeCan) {
        gsap.fromTo(activeCan,
          { opacity: 0, scale: 0.8, x: 100, y: 0, rotationZ: 0 },
          { 
            opacity: 1, 
            scale: 1, 
            x: 0, 
            y: 0,
            duration: isMobileRef.current ? 0.8 : 1.5, 
            ease: 'power3.out',
            onComplete: () => startFloatingLoop(activeCan)
          }
        );
      }
    } else {
      const prevCan = canRefs.current[prevIndex];
      const activeCan = canRefs.current[activeIndex];

      const duration = isMobileRef.current ? 0.6 : 1.2;

      if (prevCan) {
        gsap.to(prevCan, {
          x: '-100vw',
          y: isMobileRef.current ? -50 : -100,
          rotationZ: isMobileRef.current ? -45 : -90,
          opacity: 0,
          duration,
          ease: 'power3.inOut'
        });
      }

      if (activeCan) {
        gsap.fromTo(activeCan,
          { x: '100vw', y: isMobileRef.current ? 80 : 150, rotationZ: isMobileRef.current ? 45 : 90, opacity: 0 },
          { 
            x: 0, 
            y: 0, 
            rotationZ: 0, 
            opacity: 1, 
            duration, 
            ease: 'power3.out',
            onComplete: () => startFloatingLoop(activeCan)
          }
        );
      }
    }

    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Cleanup all GSAP tweens on unmount
  useEffect(() => {
    const cans = canRefs.current;
    return () => {
      cans.forEach(can => {
        if (can) gsap.killTweensOf(can);
      });
      if (floatingTweenRef.current) {
        floatingTweenRef.current.kill();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-[45] pointer-events-none flex flex-col items-center justify-center w-full max-w-[240px] h-[clamp(240px,34svh,320px)] mx-auto mb-8 overflow-visible lg:absolute lg:right-[30%] lg:translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:z-[60] lg:w-[30vw] lg:max-w-[500px] lg:h-[clamp(400px,60vh,700px)] lg:mx-0 lg:mb-0"
    >
      {CANS.map((can, idx) => (
        <div 
          key={can.id}
          ref={(el) => { canRefs.current[idx] = el; }}
          className="absolute w-full h-full overflow-visible"
          style={{ 
            perspective: 1000, 
            opacity: idx === activeIndex ? 1 : 0, 
            pointerEvents: idx === activeIndex ? 'auto' : 'none' 
          }}
        >
          <div className="relative w-full h-[100%] flex items-center justify-center overflow-visible">
            <Link data-can-id={can.id} href="/#products" className="relative w-full h-full block cursor-pointer transition-all duration-300">
              <Image
                src={can.src}
                alt={can.alt}
                fill
                priority={idx === 0}
                loading={idx === 0 ? 'eager' : 'lazy'}
                quality={90}
                sizes="(max-width: 1023px) 240px, (max-width: 1200px) 30vw, 500px"
                className="object-contain object-center p-3 lg:p-8"
                style={{ 
                  mixBlendMode: 'normal',
                }}
              />
              {/* Use lighter shadows on mobile */}
              <style dangerouslySetInnerHTML={{__html: `
                @media (min-width: 1024px) {
                  [data-can-id="${can.id}"] {
                    filter: ${can.filter};
                  }
                }
                @media (max-width: 1023px) {
                  [data-can-id="${can.id}"] {
                    filter: ${can.mobileFilter};
                  }
                }
              `}} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
