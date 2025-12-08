"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function Particles({ scrollProgress }: { scrollProgress: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positionArray = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i++) {
      positionArray[i * 3] = (Math.random() - 0.5) * 8;
      positionArray[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positionArray[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return positionArray;
  }, []);

  useFrame((state) => {
    const rotationSpeed = state.clock.elapsedTime * 0.08;
    if (pointsRef.current) {
      pointsRef.current.rotation.y = rotationSpeed;
      pointsRef.current.rotation.z = rotationSpeed / 2;
      const material = pointsRef.current.material as THREE.PointsMaterial;
      material.color.setHSL(0.63 + scrollProgress * 0.1, 0.8, 0.6);
      material.size = 0.12 + Math.sin(state.clock.elapsedTime * 2) * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.15} sizeAttenuation transparent opacity={0.8} />
    </points>
  );
}

export function NeuralParticlesBG() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      setScrollProgress(Math.min(window.scrollY / scrollable, 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 opacity-80">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        className="h-full w-full"
        style={{ filter: "blur(0px)", opacity: 0.8 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[1, 3, 5]} intensity={0.7} />
        <Particles scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
