'use client';

import Image from 'next/image';
import type { Product3DConfig } from './types';

export function ProductFallback({ product }: { product: Product3DConfig }) {
  if (!product.fallbackImage) return null;

  return (
    <div className="relative mx-auto h-full w-full max-w-[460px]" aria-label={`${product.name} product view`}>
      <Image
        src={product.fallbackImage}
        alt={`DROP ${product.name.toLowerCase()} aluminium water can`}
        fill
        priority={product.index === '01'}
        quality={90}
        sizes="(max-width: 767px) 240px, 460px"
        draggable={false}
        className="pointer-events-none select-none object-contain py-[8%]"
      />
      <div className={`absolute bottom-[6%] left-1/2 h-4 w-[32%] -translate-x-1/2 rounded-[50%] blur-xl ${product.theme === 'dark' ? 'bg-black/40' : 'bg-black/15'}`} aria-hidden="true" />
    </div>
  );
}
