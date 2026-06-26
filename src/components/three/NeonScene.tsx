"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Icosahedron } from "@react-three/drei";
import { Suspense } from "react";

/**
 * Lightweight R3F hero centerpiece: a slowly morphing distorted crystal in the
 * brand cyan, wrapped in two ghosted satellites. Kept low-poly and capped DPR
 * for performance; loaded via dynamic import (ssr:false) from the Hero.
 */
function Crystal() {
  return (
    <group>
      <Float speed={1.4} rotationIntensity={0.8} floatIntensity={1.2}>
        <Icosahedron args={[1.6, 6]}>
          <MeshDistortMaterial
            color="#16e7e7"
            emissive="#0a4f7a"
            emissiveIntensity={0.5}
            roughness={0.15}
            metalness={0.9}
            distort={0.42}
            speed={1.6}
          />
        </Icosahedron>
      </Float>

      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[2.6, 1.4, -1.5]}>
          <icosahedronGeometry args={[0.45, 1]} />
          <meshStandardMaterial
            color="#c026f7"
            emissive="#c026f7"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>

      <Float speed={1.7} rotationIntensity={1.2} floatIntensity={1.6}>
        <mesh position={[-2.8, -1.2, -1]}>
          <icosahedronGeometry args={[0.32, 1]} />
          <meshStandardMaterial
            color="#2d6bff"
            emissive="#2d6bff"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function NeonScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={120} color="#16e7e7" />
      <pointLight position={[-5, -3, 2]} intensity={90} color="#c026f7" />
      <Suspense fallback={null}>
        <Crystal />
      </Suspense>
    </Canvas>
  );
}
