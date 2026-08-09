'use client';

import { useState } from 'react';

export function AthleteProductVideo({ active, onReadyChange }: { active: boolean; onReadyChange: (ready: boolean) => void }) {
  const [failed, setFailed] = useState(false);

  return (
    <video
      src="/videos/athlete-360-premium.webm"
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
      className={`pointer-events-none absolute left-1/2 top-1/2 h-[1920px] w-[1080px] max-w-none -translate-x-1/2 -translate-y-1/2 select-none transition-opacity duration-300 ease-out ${active && !failed ? 'opacity-100' : 'opacity-0'}`}
      style={{ background: 'transparent', willChange: 'opacity', backfaceVisibility: 'hidden' }}
    />
  );
}
