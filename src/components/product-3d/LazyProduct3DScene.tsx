'use client';

import dynamic from 'next/dynamic';
import { ProductVideo } from './AthleteProductVideo';
import { AthleteCanVideo } from './AthleteCanVideo';
import { ProductFallback } from './ProductFallback';
import type { Product3DConfig } from './types';

const VIDEO_MAP: Record<string, { src: string; poster: string }> = {
  original: { src: '/videos/original-can-mobile.mp4?v=2', poster: '/videos/original-can-poster-v2.jpg' },
  mint: { src: '/videos/mint-can-mobile-v3.mp4', poster: '/videos/mint-can-poster-v3.jpg' },
  clove: { src: '/videos/clove-can-mobile.mp4?v=2', poster: '/videos/clove-can-poster-v2.jpg' },
};

const Product3DScene = dynamic(() => import('./Product3DScene'), { ssr: false });

export function LazyProduct3DScene({ products, activeIndex, onInteractionChange }: { products: readonly Product3DConfig[]; activeIndex: number; onInteractionChange?: (interacting: boolean) => void }) {
  const activeProduct = products[activeIndex];
  const video = VIDEO_MAP[activeProduct.id];

  return (
    <div className="relative h-full w-full min-w-0" data-product-media>
      {products.every((product) => product.modelReady) ? (
        <Product3DScene products={products} activeIndex={activeIndex} onInteractionChange={onInteractionChange} />
      ) : video ? (
        <ProductVideo key={activeProduct.id} {...video} name={activeProduct.name} />
      ) : !activeProduct.fallbackImage ? null : (
        <ProductFallback product={activeProduct} />
      )}
      <AthleteCanVideo active={activeProduct.id === 'athlete' && !products.every((p) => p.modelReady)} />
    </div>
  );
}
