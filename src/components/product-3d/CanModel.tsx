'use client';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import type { Group, Material, Mesh, Object3D } from 'three';
import type { Product3DConfig } from './types';

function materialsFor(object: Object3D) {
  const materials: Material[] = [];
  object.traverse((child) => {
    const mesh = child as Mesh;
    if (!mesh.isMesh) return;
    const source = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    const cloned = source.map((material) => {
      const next = material.clone();
      next.transparent = true;
      next.depthWrite = true;
      return next;
    });
    mesh.material = Array.isArray(mesh.material) ? cloned : cloned[0];
    materials.push(...cloned);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });
  return materials;
}

export function CanModel({ product, active, reducedMotion }: { product: Product3DConfig; active: boolean; reducedMotion: boolean }) {
  const gltf = useGLTF(product.modelUrl);
  const group = useRef<Group>(null);
  const opacity = useRef(active ? 1 : 0);
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
  const materials = useMemo(() => materialsFor(scene), [scene]);

  useEffect(() => () => materials.forEach((material) => material.dispose()), [materials]);

  useFrame((_, delta) => {
    const target = active ? 1 : 0;
    const duration = reducedMotion ? 18 : 7.5;
    opacity.current += (target - opacity.current) * (1 - Math.exp(-delta * duration));
    const value = opacity.current;
    materials.forEach((material) => {
      material.opacity = value;
      material.depthWrite = value > 0.98;
    });
    if (group.current) {
      const scale = product.modelScale * (0.975 + value * 0.025);
      group.current.scale.setScalar(scale);
      group.current.visible = value > 0.008;
    }
  });

  return (
    <group
      ref={group}
      scale={product.modelScale}
      position={[0, product.modelPositionY, 0]}
      visible={active}
    >
      <primitive object={scene} />
    </group>
  );
}
