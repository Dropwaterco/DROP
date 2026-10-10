'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const DESKTOP_PARTICLE_COUNT = 24;

export default function HeroParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const media = gsap.matchMedia();
    media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const particles = Array.from(container.children);
      const tweens = particles.map((particle) => {
        gsap.set(particle, {
          x: 'random(0, 100vw)', y: 'random(0, 100vh)',
          scale: 'random(0.3, 1)', opacity: 'random(0.15, 0.5)',
        });
        return gsap.to(particle, {
          y: '-=40', x: '+=random(-15, 15)', opacity: 'random(0.1, 0.6)',
          duration: 'random(4, 7)', repeat: -1, yoyo: true,
          ease: 'sine.inOut', delay: 'random(0, 3)', paused: true,
        });
      });
      let visible = false;
      const sync = () => tweens.forEach((tween) => tween.paused(!visible || document.hidden));
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        sync();
      });
      observer.observe(container);
      document.addEventListener('visibilitychange', sync);
      return () => {
        observer.disconnect();
        document.removeEventListener('visibilitychange', sync);
        tweens.forEach((tween) => tween.kill());
      };
    });
    return () => media.revert();
  }, []);

  return (
    <div ref={containerRef} aria-hidden="true" className="absolute inset-0 hidden overflow-hidden pointer-events-none z-[40] lg:block motion-reduce:!hidden">
      {Array.from({ length: DESKTOP_PARTICLE_COUNT }, (_, i) => (
        <div key={i} className="absolute top-0 left-0 w-1.5 h-1.5 bg-white/40 rounded-full" />
      ))}
    </div>
  );
}
