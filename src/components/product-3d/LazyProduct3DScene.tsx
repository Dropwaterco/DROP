'use client';

import dynamic from 'next/dynamic';
import { ProductFallback } from './ProductFallback';
import type { Product3DConfig } from './types';

const Product3DScene = dynamic(() => import('./Product3DScene'), {
  ssr: false,
  loading: () => null,
});

export function LazyProduct3DScene({ products, activeIndex, onInteractionChange }: { products: readonly Product3DConfig[]; activeIndex: number; onInteractionChange?: (interacting: boolean) => void }) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`absolute inset-0 transition-[opacity,transform] duration-500 ease-out ${index === activeIndex ? 'scale-100 opacity-100' : 'pointer-events-none scale-[.975] opacity-0'}`}
            aria-hidden={index !== activeIndex}
          >
            <ProductFallback product={product} />
          </div>
        ))}
      </div>
      <div className="absolute inset-0">
        <Product3DScene products={products} activeIndex={activeIndex} onInteractionChange={onInteractionChange} />
      </div>
    </div>
  );
}
