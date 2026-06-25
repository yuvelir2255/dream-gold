"use client";

import {
  Suspense,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Environment, Lightformer, useGLTF } from "@react-three/drei";
import type { Group } from "three";

const RING_URL = "/models/ring.glb";

type Motion = {
  draggingRef: MutableRefObject<boolean>;
  pendingRef: MutableRefObject<number>;
  velRef: MutableRefObject<number>;
  tiltRef: MutableRefObject<number>;
  reducedRef: MutableRefObject<boolean>;
};

/**
 * Real ring (Higgsfield image→3D, draco + webp, ~324KB) lit by a small in-memory
 * studio env (drei Lightformers) so the gold reads richly. `Center` re-centers the
 * mesh at the origin; the wrapping group auto-spins, follows the drag with inertia,
 * and tilts gently toward the cursor.
 */
function Ring({ draggingRef, pendingRef, velRef, tiltRef, reducedRef }: Motion) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(RING_URL);

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

    const targetX = -0.18 + (reducedRef.current ? 0 : tiltRef.current * 0.26);
    g.rotation.x += (targetX - g.rotation.x) * 0.06;
  });

  // The mesh ships already centered (~1.9 units tall); Center keeps it honest and
  // scale is the single on-screen-size knob. (Resize mis-read the meshopt-
  // normalized positions and scaled it out of frame.)
  return (
    <group ref={group} scale={1.6}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

useGLTF.preload(RING_URL);

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

        <Suspense fallback={null}>
          <Ring
            draggingRef={draggingRef}
            pendingRef={pendingRef}
            velRef={velRef}
            tiltRef={tiltRef}
            reducedRef={reducedRef}
          />
        </Suspense>

        <Environment resolution={256}>
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
        </Environment>
      </Canvas>
    </div>
  );
}
