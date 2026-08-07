'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import { ACESFilmicToneMapping, SRGBColorSpace } from 'three';
import { ProductFallback } from './ProductFallback';
import { ProductLighting } from './ProductLighting';
import { RotationController } from './RotationController';
import type { Product3DConfig } from './types';
import { useReducedMotion } from './useReducedMotion';

export default function Product3DScene({ product }: { product: Product3DConfig }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '240px 0px', threshold: 0.01 });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={stageRef} className="relative h-full w-full cursor-ew-resize touch-pan-y select-none" data-product-stage>
      {product.modelReady ? (
        <Canvas
          key={product.id}
          dpr={[1, 1.6]}
          frameloop={visible ? 'always' : 'never'}
          camera={{ position: [0, 0.15, 7.4], fov: 30, near: 0.1, far: 100 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          onCreated={({ gl }) => {
            gl.outputColorSpace = SRGBColorSpace;
            gl.toneMapping = ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.05;
            gl.setClearColor(0x000000, 0);
          }}
          fallback={<ProductFallback product={product} />}
        >
          <Suspense fallback={null}>
            <ProductLighting dark={product.theme === 'dark'} />
            <RotationController product={product} reducedMotion={reducedMotion} />
          </Suspense>
        </Canvas>
      ) : null}
    </div>
  );
}
