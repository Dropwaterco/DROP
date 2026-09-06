'use client';

import { useState } from 'react';

export function ProductVideo({ src, active, onReadyChange, theme = 'light' }: { src: string; active: boolean; onReadyChange: (ready: boolean) => void; theme?: 'light' | 'dark' }) {
  const [failed, setFailed] = useState(false);

  return (
    // Video with mix-blend-mode: screen to remove black background, showing only the can
    <div
      className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none transition-opacity duration-300 ease-out ${active && !failed ? 'opacity-100' : 'opacity-0'}`}
      style={{ willChange: 'opacity' }}
    >
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
        className="h-full w-auto max-w-none object-contain"
        style={{
          mixBlendMode: theme === 'dark' ? 'lighten' : 'screen',
          background: 'transparent',
          backfaceVisibility: 'hidden',
        }}
      />
    </div>
  );
}
