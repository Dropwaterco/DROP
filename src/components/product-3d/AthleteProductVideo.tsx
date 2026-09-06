'use client';

import { useState } from 'react';

export function ProductVideo({ src, active, onReadyChange, theme = 'light', portraitCrop = false }: { src: string; active: boolean; onReadyChange: (ready: boolean) => void; theme?: 'light' | 'dark'; portraitCrop?: boolean }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none transition-opacity duration-300 ease-out ${active && !failed ? 'opacity-100' : 'opacity-0'}`}
      style={{ willChange: 'opacity' }}
    >
      <div className={portraitCrop ? 'relative h-full aspect-[9/16] overflow-hidden bg-transparent' : 'relative h-full w-full overflow-hidden bg-transparent'}>
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
          className="absolute left-1/2 top-1/2 h-full w-auto max-w-none -translate-x-1/2 -translate-y-1/2 object-contain"
          style={{
            mixBlendMode: portraitCrop ? 'normal' : theme === 'dark' ? 'lighten' : 'screen',
            background: 'transparent',
            backfaceVisibility: 'hidden',
          }}
        />
      </div>
    </div>
  );
}
