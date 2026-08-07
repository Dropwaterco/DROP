'use client';

import dynamic from 'next/dynamic';
import { ProductFallback } from './ProductFallback';
import type { Product3DConfig } from './types';

const Product3DScene = dynamic(() => import('./Product3DScene'), {
  ssr: false,
  loading: () => null,
});

export function LazyProduct3DScene({ product }: { product: Product3DConfig }) {
  return (
    <div className="relative h-full w-full">
      <ProductFallback product={product} />
      <div className="absolute inset-0">
        <Product3DScene product={product} />
      </div>
    </div>
  );
}
