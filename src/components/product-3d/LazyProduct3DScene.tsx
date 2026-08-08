'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { AthleteProductVideo } from './AthleteProductVideo';
import { ProductFallback } from './ProductFallback';
import type { Product3DConfig } from './types';

const Product3DScene = dynamic(() => import('./Product3DScene'), {
  ssr: false,
  loading: () => null,
});

export function LazyProduct3DScene({ products, activeIndex, onInteractionChange }: { products: readonly Product3DConfig[]; activeIndex: number; onInteractionChange?: (interacting: boolean) => void }) {
  const [athleteVideoReady, setAthleteVideoReady] = useState(false);
  const activeProduct = products[activeIndex];
  const athleteActive = activeProduct?.id === 'athlete';

  const handleAthleteReadyChange = (ready: boolean) => {
    setAthleteVideoReady(ready);
  };

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`absolute inset-0 transition-[opacity,transform] duration-300 ease-out ${index === activeIndex && !(product.id === 'athlete' && athleteVideoReady) ? 'scale-100 opacity-100' : 'pointer-events-none scale-[.975] opacity-0'}`}
            aria-hidden={index !== activeIndex}
          >
            <ProductFallback product={product} />
          </div>
        ))}
      </div>
      {athleteActive ? <AthleteProductVideo active={athleteVideoReady} onReadyChange={handleAthleteReadyChange} /> : null}
      <div className="absolute inset-0">
        <Product3DScene products={products} activeIndex={activeIndex} onInteractionChange={onInteractionChange} />
      </div>
    </div>
  );
}
