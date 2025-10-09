"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  age: number;
  maxAge: number;
}

function VonKarmanParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 2000;

  const particles = useRef<Particle[]>([]);

  // Initialize particles
  useMemo(() => {
    particles.current = Array.from({ length: particleCount }, () => ({
      position: new THREE.Vector3(
        Math.random() * 20 - 10,
        Math.random() * 10 - 5,
        Math.random() * 2 - 1
      ),
      velocity: new THREE.Vector3(0, 0, 0),
      age: Math.random() * 100,
      maxAge: 100 + Math.random() * 50,
    }));
  }, []);

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    particles.current.forEach((p, i) => {
      pos[i * 3] = p.position.x;
      pos[i * 3 + 1] = p.position.y;
      pos[i * 3 + 2] = p.position.z;
    });
    return pos;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;

    const time = state.clock.getElapsedTime();
    const posAttribute = particlesRef.current.geometry.attributes.position;

    particles.current.forEach((p, i) => {
      // von Kármán vortex street simulation
      const flowSpeed = 1.5;
      const x = p.position.x;
      const y = p.position.y;

      // Cylinder obstacle at center-left
      const obstacleX = -6;
      const obstacleY = 0;
      const obstacleRadius = 1.2;

      const dx = x - obstacleX;
      const dy = y - obstacleY;
      const distToObstacle = Math.sqrt(dx * dx + dy * dy);

      // Base flow (left to right)
      let vx = flowSpeed;
      let vy = 0;

      // Create vortex shedding pattern
      if (distToObstacle < 8) {
        const vortexStrength = 3.0;

        // Alternating vortices using sine wave pattern
        const vortexFreq = 0.8;
        const phase = Math.sin(time * vortexFreq);
        const vortexSign = y > obstacleY ? 1 : -1;

        // Karman vortex influence
        const influence = Math.exp(-distToObstacle * 0.3);
        const vorticity = vortexStrength * influence * Math.sin(phase * Math.PI);

        vx += -dy / distToObstacle * vorticity * vortexSign;
        vy += dx / distToObstacle * vorticity * vortexSign;

        // Wake effect behind obstacle
        if (x > obstacleX && distToObstacle > obstacleRadius) {
          const wakeInfluence = Math.exp(-(x - obstacleX) * 0.3);
          vy += Math.sin(time * 2 + x * 0.5) * wakeInfluence * 1.5;
        }
      }

      // Avoid obstacle
      if (distToObstacle < obstacleRadius + 0.5) {
        const repelForce = (obstacleRadius + 0.5 - distToObstacle) * 2;
        vx += (dx / distToObstacle) * repelForce;
        vy += (dy / distToObstacle) * repelForce;
      }

      // Update position
      const dt = 0.016;
      p.position.x += vx * dt;
      p.position.y += vy * dt;

      // Age particles
      p.age += 1;

      // Reset particles that flow off screen or are too old
      if (p.position.x > 10 || p.position.x < -10 ||
          p.position.y > 5 || p.position.y < -5 ||
          p.age > p.maxAge) {
        // Respawn at left side
        p.position.x = -10 + Math.random() * 2;
        p.position.y = Math.random() * 10 - 5;
        p.position.z = Math.random() * 2 - 1;
        p.age = 0;
        p.maxAge = 100 + Math.random() * 50;
      }

      // Update geometry
      posAttribute.array[i * 3] = p.position.x;
      posAttribute.array[i * 3 + 1] = p.position.y;
      posAttribute.array[i * 3 + 2] = p.position.z;
    });

    posAttribute.needsUpdate = true;
  });

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geom;
  }, [positions]);

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.08}
        color="#ffffff"
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function VonKarmanScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      style={{ background: "#000000" }}
    >
      <VonKarmanParticles />
    </Canvas>
  );
}
