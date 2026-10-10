'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useReducedMotion } from './useReducedMotion';

export function ProductVideo({ src, poster, name }: { src: string; poster: string; name: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [nearViewport, setNearViewport] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(([entry]) => {
      setNearViewport(entry.isIntersecting);
      if (entry.isIntersecting) setHasEntered(true);
    }, { rootMargin: '160px 0px' });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let cancelled = false;
    const syncPlayback = () => {
      if (nearViewport && !reducedMotion && !document.hidden) {
        // Low Power Mode can block autoplay. Keep the poster in that case.
        void video.play().catch(() => { if (!cancelled) setReady(false); });
      } else {
        video.pause();
      }
    };
    syncPlayback();
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      cancelled = true;
      video.pause();
      document.removeEventListener('visibilitychange', syncPlayback);
    };
  }, [nearViewport, hasEntered, reducedMotion, failed]);

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center select-none">
      <div className="relative h-full max-w-full aspect-[9/14]">
        <Image
          src={poster}
          alt={`DROP ${name.toLowerCase()} aluminium water can`}
          fill
          sizes="(max-width: 767px) 280px, 440px"
          quality={90}
          priority
          className="object-contain"
          draggable={false}
        />
        {!failed && hasEntered && !reducedMotion && (
          <video
            ref={videoRef}
            src={src}
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            onLoadStart={() => setReady(false)}
            onPlaying={() => setReady(true)}
            onError={() => { setReady(false); setFailed(true); }}
            className={`pointer-events-none absolute inset-0 h-full w-full object-contain transition-opacity duration-200 ${ready ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
      </div>
    </div>
  );
}
