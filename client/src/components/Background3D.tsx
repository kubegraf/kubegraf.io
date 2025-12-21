import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 50);

    // Soft ambient light
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    // Subtle directional lights with KubeGraf colors
    const light1 = new THREE.DirectionalLight(0x06b6d4, 0.6); // Cyan
    light1.position.set(10, 10, 10);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0x8b5cf6, 0.5); // Purple
    light2.position.set(-10, -10, 5);
    scene.add(light2);

    // Create elegant grid of particles that will morph
    const particleCount = 64; // 8x8 grid
    const particles: THREE.Mesh[] = [];
    const particleGeometry = new THREE.SphereGeometry(0.15, 8, 8);

    for (let i = 0; i < particleCount; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0x06b6d4 : i % 3 === 1 ? 0x8b5cf6 : 0x14b8a6, // Cyan, Purple, Teal
        transparent: true,
        opacity: 0.4,
      });

      const particle = new THREE.Mesh(particleGeometry, material);

      // Grid-like distribution as starting shape
      const gridSize = 8;
      const spacing = 6;
      const gridX = ((i % gridSize) - gridSize / 2) * spacing;
      const gridY = (Math.floor(i / gridSize) - gridSize / 2) * spacing;
      const gridZ = -10;

      particle.position.set(gridX, gridY, gridZ);

      particle.userData = {
        gridPos: new THREE.Vector3(gridX, gridY, gridZ),
        index: i,
        gridSize,
        startX: -60 - (i % 8) * 3, // Start from left side, staggered
        travelSpeed: 0.03 + (i % 5) * 0.005, // Much slower varied speeds
      };

      scene.add(particle);
      particles.push(particle);
    }

    // Create connecting lines between particles
    const connectionLines: THREE.Line[] = [];
    const maxConnectionDistance = 12; // Distance threshold for connections

    // Create lines for nearby particles
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dist = particles[i].position.distanceTo(particles[j].position);

        if (dist < maxConnectionDistance) {
          const points = [particles[i].position.clone(), particles[j].position.clone()];
          const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
          const lineMat = new THREE.LineBasicMaterial({
            color: 0x06b6d4, // Cyan
            transparent: true,
            opacity: 0.15,
          });
          const line = new THREE.Line(lineGeo, lineMat);
          line.userData = { particleA: i, particleB: j };
          scene.add(line);
          connectionLines.push(line);
        }
      }
    }

    // Create slow-moving wave grid
    const gridSize = 40;
    const gridSegments = 30;
    const gridGeometry = new THREE.PlaneGeometry(gridSize, gridSize, gridSegments, gridSegments);
    const gridMaterial = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, // Cyan
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const grid = new THREE.Mesh(gridGeometry, gridMaterial);
    grid.rotation.x = -Math.PI / 3;
    grid.position.z = -20;
    scene.add(grid);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Handle mouse move for subtle parallax
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Subtle camera movement based on mouse
      camera.position.x += (mouseRef.current.x * 2 - camera.position.x) * 0.01;
      camera.position.y += (-mouseRef.current.y * 2 - camera.position.y) * 0.01;
      camera.lookAt(0, 0, 0);

      // Morph cycle - very slow
      const morphCycle = Math.sin(t * 0.04) * 0.5 + 0.5; // 0 to 1

      // Animate particles morphing between shapes AND moving across page
      particles.forEach((particle, i) => {
        const { gridPos, index, gridSize, startX, travelSpeed } = particle.userData;
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;

        // Calculate horizontal travel position (left to right across page)
        const travelProgress = (t * travelSpeed) % 2; // Loop every 2 units of time
        const travelX = startX + (travelProgress * 60); // Travel 120 units (60 * 2)

        // Reset to start if gone too far right
        if (travelX > 60) {
          particle.userData.startX = -60 - (i % 8) * 3;
        }

        // Shape 1: Grid (original) - but with horizontal offset
        const gridShape = {
          x: gridPos.x + travelX,
          y: gridPos.y,
          z: gridPos.z
        };

        // Shape 2: Sphere - but with horizontal offset
        const sphereRadius = 12;
        const phi = (row / gridSize) * Math.PI;
        const theta = (col / gridSize) * Math.PI * 2;
        const sphere = {
          x: sphereRadius * Math.sin(phi) * Math.cos(theta) + travelX,
          y: sphereRadius * Math.sin(phi) * Math.sin(theta),
          z: sphereRadius * Math.cos(phi) - 10
        };

        // Shape 3: Helix - but with horizontal offset
        const helixRadius = 8;
        const helixHeight = 20;
        const helixProgress = index / particleCount;
        const helix = {
          x: Math.cos(helixProgress * Math.PI * 4) * helixRadius + travelX,
          y: Math.sin(helixProgress * Math.PI * 4) * helixRadius,
          z: (helixProgress - 0.5) * helixHeight - 10
        };

        // Blend between shapes
        let targetPos;
        if (morphCycle < 0.33) {
          // Grid to Sphere
          const blend = morphCycle / 0.33;
          targetPos = {
            x: gridShape.x * (1 - blend) + sphere.x * blend,
            y: gridShape.y * (1 - blend) + sphere.y * blend,
            z: gridShape.z * (1 - blend) + sphere.z * blend
          };
        } else if (morphCycle < 0.66) {
          // Sphere to Helix
          const blend = (morphCycle - 0.33) / 0.33;
          targetPos = {
            x: sphere.x * (1 - blend) + helix.x * blend,
            y: sphere.y * (1 - blend) + helix.y * blend,
            z: sphere.z * (1 - blend) + helix.z * blend
          };
        } else {
          // Helix back to Grid
          const blend = (morphCycle - 0.66) / 0.34;
          targetPos = {
            x: helix.x * (1 - blend) + gridShape.x * blend,
            y: helix.y * (1 - blend) + gridShape.y * blend,
            z: helix.z * (1 - blend) + gridShape.z * blend
          };
        }

        // Smooth movement to target
        particle.position.lerp(new THREE.Vector3(targetPos.x, targetPos.y, targetPos.z), 0.05);

        // Slow fade in/out based on position (fade out at edges)
        const edgeFade = Math.min(
          1,
          Math.max(0, (travelX + 40) / 20), // Fade in from left
          Math.max(0, (60 - travelX) / 20)  // Fade out at right
        );
        const pulseOpacity = 0.3 + Math.sin(t * 0.3 + index * 0.1) * 0.2;
        (particle.material as THREE.MeshBasicMaterial).opacity = pulseOpacity * edgeFade;
      });

      // Update connection lines between particles
      connectionLines.forEach((line) => {
        const { particleA, particleB } = line.userData;
        const posA = particles[particleA].position;
        const posB = particles[particleB].position;

        // Update line positions
        const positions = line.geometry.attributes.position;
        positions.setXYZ(0, posA.x, posA.y, posA.z);
        positions.setXYZ(1, posB.x, posB.y, posB.z);
        positions.needsUpdate = true;

        // Calculate distance and fade based on distance
        const distance = posA.distanceTo(posB);
        const maxDist = 15;
        const opacity = Math.max(0, 0.25 * (1 - distance / maxDist));
        (line.material as THREE.LineBasicMaterial).opacity = opacity;
      });

      // Animate grid with gentle waves
      const positions = grid.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const wave = Math.sin(x * 0.2 + t * 0.3) * Math.cos(y * 0.2 + t * 0.2) * 1.5;
        positions.setZ(i, wave);
      }
      positions.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
