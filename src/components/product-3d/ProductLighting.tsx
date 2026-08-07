'use client';

import { ContactShadows } from '@react-three/drei';

export function ProductLighting({ dark }: { dark: boolean }) {
  return (
    <>
      <ambientLight intensity={dark ? 0.65 : 1.05} />
      <rectAreaLight position={[-3.2, 3.5, 4]} width={4.5} height={6} intensity={dark ? 5.5 : 4.2} color="#fffaf2" />
      <rectAreaLight position={[3.5, 1.5, 2.5]} width={2.5} height={5} intensity={dark ? 4 : 2.6} color={dark ? '#d8c7ff' : '#ffffff'} />
      <spotLight position={[0, 5, -3]} intensity={dark ? 2.2 : 1.5} angle={0.5} penumbra={1} color="#ffffff" />
      <ContactShadows position={[0, -2.45, 0]} opacity={dark ? 0.28 : 0.18} scale={5} blur={2.8} far={4} resolution={512} />
    </>
  );
}
