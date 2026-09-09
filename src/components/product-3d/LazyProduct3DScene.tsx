'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { ProductVideo } from './AthleteProductVideo';
import { ProductFallback } from './ProductFallback';
import type { Product3DConfig } from './types';

const VIDEO_MAP: Record<string, string> = {
  original: '/videos/silver-can-portrait-large.webm',
  mint: '/videos/athlete-360-premium.webm',
};

const Product3DScene = dynamic(() => import('./Product3DScene'), {
  ssr: false,
  loading: () => null,
});

export function LazyProduct3DScene({ products, activeIndex, onInteractionChange }: { products: readonly Product3DConfig[]; activeIndex: number; onInteractionChange?: (interacting: boolean) => void }) {
  const [productVideoReady, setProductVideoReady] = useState(false);
  const preloadedRef = useRef(false);
  const activeProduct = products[activeIndex];
  const videoSrc = VIDEO_MAP[activeProduct?.id] ?? null;

  // Preload all video sources on mount so switching is instant
  useEffect(() => {
    if (preloadedRef.current) return;
    preloadedRef.current = true;
    Object.values(VIDEO_MAP).forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = src;
      link.type = 'video/webm';
      document.head.appendChild(link);
    });
  }, []);

  const handleVideoReadyChange = (ready: boolean) => {
    setProductVideoReady(ready);
  };

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0">
        {products.map((product, index) => product.fallbackImage ? (
          <div
            key={product.id}
            className={`absolute inset-0 transition-[opacity,transform] duration-300 ease-out ${index === activeIndex ? 'scale-100 opacity-100' : 'pointer-events-none scale-[.975] opacity-0'}`}
            aria-hidden={index !== activeIndex}
          >
            <ProductFallback product={product} />
          </div>
        ) : null)}
      </div>
      {videoSrc ? <ProductVideo key={videoSrc} src={videoSrc} active={productVideoReady} onReadyChange={handleVideoReadyChange} theme={activeProduct?.theme} portraitCrop={activeProduct?.id === 'original'} /> : null}
      <div className="absolute inset-0">
        <Product3DScene products={products} activeIndex={activeIndex} onInteractionChange={onInteractionChange} />
      </div>
    </div>
  );
}
