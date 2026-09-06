'use client';

import { useState } from 'react';

export function ProductVideo({ src, active, onReadyChange }: { src: string; active: boolean; onReadyChange: (ready: boolean) => void }) {
  const [failed, setFailed] = useState(false);

  return (
    // Benchmark 360 rotating can configuration: 1080x1920 canvas centered with scale-[1.18]
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      onLoadStart={() => onReadyChange(false)}
      onLoadedData={() => {
        setFailed(false);
        onReadyChange(true);
      }}
      onCanPlay={() => onReadyChange(true)}
      onError={() => {
        setFailed(true);
        onReadyChange(false);
      }}
      className={`pointer-events-none absolute left-1/2 top-1/2 h-[1920px] w-[1080px] max-w-none -translate-x-1/2 -translate-y-1/2 scale-[1.18] select-none transition-opacity duration-300 ease-out ${active && !failed ? 'opacity-100' : 'opacity-0'}`}
      style={{ background: 'transparent', willChange: 'opacity', backfaceVisibility: 'hidden' }}
    />
  );
}
