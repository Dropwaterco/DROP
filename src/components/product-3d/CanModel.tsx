'use client';

import { Clone, useGLTF } from '@react-three/drei';
import type { Product3DConfig } from './types';

export function CanModel({ product }: { product: Product3DConfig }) {
  const gltf = useGLTF(product.modelUrl);

  return (
    <Clone
      object={gltf.scene}
      scale={product.modelScale}
      position={[0, product.modelPositionY, 0]}
      castShadow
      receiveShadow
    />
  );
}
