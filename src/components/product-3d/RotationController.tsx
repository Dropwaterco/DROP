'use client';

import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useRef } from 'react';
import type { Group } from 'three';
import { CanModel } from './CanModel';
import type { Product3DConfig } from './types';

const IDLE_SPEED = (Math.PI * 2) / 10;
const RESUME_DELAY_MS = 2500;

export function RotationController({
  products,
  activeIndex,
  reducedMotion,
  onInteractionChange,
}: {
  products: readonly Product3DConfig[];
  activeIndex: number;
  reducedMotion: boolean;
  onInteractionChange?: (interacting: boolean) => void;
}) {
  const group = useRef<Group>(null);
  const dragging = useRef(false);
  const previousX = useRef(0);
  const velocity = useRef(0);
  const lastInteraction = useRef(0);
  const autoBlend = useRef(reducedMotion ? 0 : 1);

  useFrame((_, delta) => {
    if (!group.current) return;

    const idle = performance.now() - lastInteraction.current > RESUME_DELAY_MS;
    const targetAutoBlend = reducedMotion || dragging.current || !idle ? 0 : 1;
    autoBlend.current += (targetAutoBlend - autoBlend.current) * (1 - Math.exp(-delta * 2.4));

    if (!dragging.current) {
      group.current.rotation.y += velocity.current * delta + IDLE_SPEED * autoBlend.current * delta;
      velocity.current *= Math.exp(-delta * 4.5);
    }

    easing.damp3(group.current.scale, [1, 1, 1], 0.7, delta);
  });

  return (
    <group
      ref={group}
      rotation={[Math.PI / 36, 0, -Math.PI / 28]}
      scale={0.94}
      onPointerDown={(event) => {
        event.stopPropagation();
        dragging.current = true;
        previousX.current = event.clientX;
        velocity.current = 0;
        lastInteraction.current = performance.now();
        onInteractionChange?.(true);
        (event.nativeEvent.target as HTMLElement | null)?.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (!dragging.current || !group.current) return;
        const movement = event.clientX - previousX.current;
        const rotationDelta = movement * 0.009;
        group.current.rotation.y += rotationDelta;
        velocity.current = rotationDelta * 38;
        previousX.current = event.clientX;
        lastInteraction.current = performance.now();
      }}
      onPointerUp={(event) => {
        dragging.current = false;
        lastInteraction.current = performance.now();
        onInteractionChange?.(false);
        (event.nativeEvent.target as HTMLElement | null)?.releasePointerCapture(event.pointerId);
      }}
      onPointerCancel={() => {
        dragging.current = false;
        lastInteraction.current = performance.now();
        onInteractionChange?.(false);
      }}
    >
      {products.map((product, index) => (
        <CanModel key={product.id} product={product} active={index === activeIndex} reducedMotion={reducedMotion} />
      ))}
    </group>
  );
}
