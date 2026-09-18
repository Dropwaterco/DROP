'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

const SOURCES = ['/videos/athlete-can.webm', '/videos/athlete-can-hevc.mov'];

export function AthleteCanVideo({ active }: { active: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [ready, setReady] = useState(false);

  const tryNextSource = useCallback(() => {
    setReady(false);
    setSourceIndex(Math.min(sourceIndex + 1, SOURCES.length));
  }, [sourceIndex]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (active) {
      if (video.readyState >= 1) video.currentTime = 0;
      void video.play().catch(() => {
        if (video.error) tryNextSource();
      });
    } else {
      video.pause();
    }
  }, [active, tryNextSource]);

  const verifyTransparency = () => {
    const video = videoRef.current;
    if (!video || video.readyState < 2) return;
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 3;
      canvas.height = 1;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) return tryNextSource();
      context.drawImage(video, 0, 0, 1, 1, 0, 0, 1, 1);
      context.drawImage(video, video.videoWidth - 1, 0, 1, 1, 1, 0, 1, 1);
      context.drawImage(video, video.videoWidth / 2, video.videoHeight / 2, 1, 1, 2, 0, 1, 1);
      const pixels = context.getImageData(0, 0, 3, 1).data;
      if (pixels[3] < 8 && pixels[7] < 8 && pixels[11] > 240) {
        setReady(true);
      } else {
        tryNextSource();
      }
    } catch {
      tryNextSource();
    }
  };

  return (
    <div
      aria-hidden={!active}
      data-athlete-media
      className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none transition-opacity duration-300 ease-out ${active ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="relative flex aspect-[9/16] w-[clamp(280px,55vw,360px)] items-center justify-center md:w-[clamp(420px,30vw,560px)]">
        <div className="relative aspect-[69/100] h-[70%]">
          <Image
            src="/videos/athlete-can-poster.png"
            alt="DROP athlete edition aluminium water can"
            fill
            preload
            unoptimized
            draggable={false}
            className="object-contain"
            style={{ visibility: ready ? 'hidden' : 'visible' }}
          />
          {sourceIndex < SOURCES.length ? (
            <video
              key={sourceIndex}
              ref={videoRef}
              src={SOURCES[sourceIndex]}
              autoPlay={active}
              loop
              muted
              playsInline
              preload={active ? 'auto' : 'metadata'}
              aria-hidden="true"
              onLoadStart={() => setReady(false)}
              onLoadedData={verifyTransparency}
              onCanPlay={verifyTransparency}
              onPlaying={verifyTransparency}
              onError={tryNextSource}
              className="absolute inset-0 h-full w-full object-contain"
              style={{ visibility: ready ? 'visible' : 'hidden', background: 'transparent' }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
