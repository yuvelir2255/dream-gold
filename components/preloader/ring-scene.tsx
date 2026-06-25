"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import type { Group } from "three";

/**
 * Procedural gold band + solitaire — a torus reads as a wedding/engagement ring,
 * so no GLB asset (or Higgsfield credits) needed. Reflections come from drei
 * Lightformers (a tiny in-memory studio env), so it works offline with no HDRI
 * fetch. Transparent canvas — the dark preloader overlay shows through.
 */
function Ring() {
  const group = useRef<Group>(null);
  // Canvas is client-only (ssr:false), so reading matchMedia at init is safe.
  const reduced = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.x = -0.4;
    if (reduced.current) return;
    group.current.rotation.y += delta * 0.9;
  });

  return (
    <group ref={group}>
      <mesh>
        <torusGeometry args={[1, 0.34, 64, 160]} />
        <meshStandardMaterial
          color="#c2a36b"
          metalness={1}
          roughness={0.16}
          envMapIntensity={1.5}
        />
      </mesh>
      <mesh position={[0, 1.16, 0]} rotation={[0, 0, Math.PI / 4]}>
        <octahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial
          color="#fbf7ef"
          metalness={0.15}
          roughness={0.02}
          envMapIntensity={2.2}
          flatShading
        />
      </mesh>
    </group>
  );
}

export default function RingScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 32 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />

      <Ring />

      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={3}
          position={[3, 3, 3]}
          scale={6}
          color="#fff4dd"
        />
        <Lightformer
          form="rect"
          intensity={2}
          position={[-4, 1, 2]}
          scale={5}
          color="#ffffff"
        />
        <Lightformer
          form="ring"
          intensity={2}
          position={[0, -3, 4]}
          scale={4}
          color="#c2a36b"
        />
      </Environment>
    </Canvas>
  );
}
