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
      className={`pointer-events-none absolute left-1/2 top-1/2 ml-[-648px] mt-[-1152px] h-[2304px] w-[1296px] max-w-none select-none object-contain transition-opacity duration-300 ease-out md:ml-[-810px] md:mt-[-1440px] md:h-[2880px] md:w-[1620px] ${active && !failed ? 'opacity-100' : 'opacity-0'}`}
      style={{ background: 'transparent' }}
    />
  );
}
