"use client";

import { useEffect, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import type { Group } from "three";

const GOLD = "#caa86a";
const REFRACT_BG = new THREE.Color("#f6f0e6"); // warm ivory the diamond refracts

type Motion = {
  draggingRef: MutableRefObject<boolean>;
  pendingRef: MutableRefObject<number>;
  velRef: MutableRefObject<number>;
  tiltRef: MutableRefObject<number>;
  reducedRef: MutableRefObject<boolean>;
};

/**
 * Gold band + brilliant diamond. The octahedron reads instantly as a cut stone;
 * MeshTransmissionMaterial gives real refraction + dispersion (it sparkles).
 * Lighting is a tiny in-memory studio env (drei Lightformers) so gold looks gold
 * and the stone has something to bend — instant and offline. Auto-spins, follows
 * the drag, keeps inertia on release, and tilts gently toward the cursor.
 */
function Ring({ draggingRef, pendingRef, velRef, tiltRef, reducedRef }: Motion) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;

    if (draggingRef.current) {
      g.rotation.y += pendingRef.current;
      pendingRef.current = 0;
    } else {
      if (!reducedRef.current) g.rotation.y += delta * 0.5;
      g.rotation.y += velRef.current;
      velRef.current *= 0.92;
    }

    const targetX = -0.32 + (reducedRef.current ? 0 : tiltRef.current * 0.28);
    g.rotation.x += (targetX - g.rotation.x) * 0.06;
  });

  return (
    <group ref={group}>
      <mesh>
        <torusGeometry args={[1, 0.3, 64, 180]} />
        <meshStandardMaterial
          color={GOLD}
          metalness={1}
          roughness={0.34}
          envMapIntensity={2.4}
        />
      </mesh>

      <mesh position={[0, 1.2, 0]} scale={[1, 1.05, 1]}>
        <octahedronGeometry args={[0.34, 0]} />
        <MeshTransmissionMaterial
          transmission={0.96}
          thickness={0.6}
          roughness={0.02}
          ior={2.4}
          chromaticAberration={0.7}
          anisotropicBlur={0.08}
          distortion={0.25}
          distortionScale={0.3}
          temporalDistortion={0.08}
          samples={6}
          resolution={256}
          background={REFRACT_BG}
          color="#eef3ff"
          flatShading
        />
      </mesh>
    </group>
  );
}

export default function RingScene({
  interactingRef,
}: {
  interactingRef: MutableRefObject<boolean>;
}) {
  const [grabbing, setGrabbing] = useState(false);
  const draggingRef = useRef(false);
  const pendingRef = useRef(0);
  const velRef = useRef(0);
  const tiltRef = useRef(0);
  const lastXRef = useRef(0);
  const reducedRef = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  // Drag start is a DOM event on the wrapper; move/up are global so the gesture
  // survives the pointer leaving the canvas.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      tiltRef.current = e.clientY / window.innerHeight - 0.5;
      if (!draggingRef.current) return;
      const dx = e.clientX - lastXRef.current;
      lastXRef.current = e.clientX;
      pendingRef.current += dx * 0.006;
      velRef.current = dx * 0.006;
    };
    const onUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      interactingRef.current = false;
      setGrabbing(false);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [interactingRef]);

  const onDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    interactingRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    setGrabbing(true);
  };

  return (
    <div
      onPointerDown={onDown}
      style={{
        width: "100%",
        height: "100%",
        cursor: grabbing ? "grabbing" : "grab",
        touchAction: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 30 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.65} />
        <hemisphereLight args={["#fff4df", "#b89055", 0.7]} />
        <directionalLight position={[3, 4, 5]} intensity={1.1} />

        <Ring
          draggingRef={draggingRef}
          pendingRef={pendingRef}
          velRef={velRef}
          tiltRef={tiltRef}
          reducedRef={reducedRef}
        />

        <Environment resolution={256}>
          {/* big warm key in front so the gold reads as gold from most angles */}
          <Lightformer
            form="rect"
            intensity={3}
            position={[0, 0, 6]}
            scale={[12, 12, 1]}
            color="#fff3df"
          />
          <Lightformer
            form="rect"
            intensity={4}
            position={[3, 4, 4]}
            scale={8}
            color="#fff6e6"
          />
          <Lightformer
            form="rect"
            intensity={3}
            position={[-5, 1, 3]}
            scale={7}
            color="#ffffff"
          />
          <Lightformer
            form="rect"
            intensity={2.5}
            position={[0, -3, 3]}
            scale={6}
            color="#ecdcbb"
          />
          <Lightformer
            form="ring"
            intensity={3}
            position={[4, 2, -3]}
            scale={3}
            color="#ffe9c2"
          />
          <Lightformer
            form="rect"
            intensity={2}
            position={[-3, -2, -4]}
            scale={5}
            color="#f5e6c8"
          />
        </Environment>
      </Canvas>
    </div>
  );
}
