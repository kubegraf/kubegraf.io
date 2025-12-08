"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function ClusterParticles() {
  const groupRef = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.LineSegments>(null);

  const nodes = useMemo(() => {
    return Array.from({ length: 20 }, () => ({
      position: new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(4),
        THREE.MathUtils.randFloatSpread(2),
        THREE.MathUtils.randFloatSpread(4)
      ),
      speed: THREE.MathUtils.randFloat(0.2, 0.6),
      offset: Math.random() * Math.PI * 2
    }));
  }, []);

  const edges = useMemo(() => {
    const pairs: [number, number][] = [];
    const positions = new Float32Array(60 * 6);
    for (let i = 0; i < 60; i++) {
      const a = Math.floor(Math.random() * nodes.length);
      let b = Math.floor(Math.random() * nodes.length);
      if (b === a) {
        b = (a + 1) % nodes.length;
      }
      pairs.push([a, b]);
    }
    return { positions, pairs };
  }, [nodes]);

  useFrame((state, delta) => {
    groupRef.current?.rotation.set(
      Math.sin(state.clock.elapsedTime / 4) * 0.2,
      Math.cos(state.clock.elapsedTime / 3.2) * 0.2,
      Math.sin(state.clock.elapsedTime / 5) * 0.2
    );

    nodes.forEach((node, index) => {
      const wobble = Math.sin(state.clock.elapsedTime * node.speed + node.offset) * 0.3;
      const scale = 1 + wobble * 0.15;
      node.position.set(
        node.position.x * scale,
        node.position.y * scale,
        node.position.z * scale
      );
      if (index % 2 === 0) {
        node.position.y += Math.sin(state.clock.elapsedTime + index) * 0.001;
      }
    });

    edges.pairs.forEach(([start, end], index) => {
      const positionIndex = index * 6;
      const a = nodes[start].position;
      const b = nodes[end].position;
      edges.positions[positionIndex] = a.x;
      edges.positions[positionIndex + 1] = a.y;
      edges.positions[positionIndex + 2] = a.z;
      edges.positions[positionIndex + 3] = b.x;
      edges.positions[positionIndex + 4] = b.y;
      edges.positions[positionIndex + 5] = b.z;
    });
    if (lineRef.current) {
      lineRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, index) => (
        <mesh key={index} position={node.position}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#8B4DFF" opacity={0.65} transparent />
        </mesh>
      ))}
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={edges.positions.length / 3}
            array={edges.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#00F0FF" transparent opacity={0.4} linewidth={1} />
      </lineSegments>
    </group>
  );
}

export function FloatingClusterBG() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        className="h-full w-full"
        style={{ opacity: 0.6 }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} color="#3b82f6" intensity={0.8} />
        <ClusterParticles />
      </Canvas>
    </div>
  );
}
