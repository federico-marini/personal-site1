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
  const particleCount = 50000; // Dense smoke-like visualization

  const particles = useRef<Particle[]>([]);

  // Initialize particles
  useMemo(() => {
    particles.current = Array.from({ length: particleCount }, () => ({
      position: new THREE.Vector3(
        Math.random() * 42 - 12, // Extended range to show more of wake
        Math.random() * 20 - 10,
        Math.random() * 2 - 1
      ),
      velocity: new THREE.Vector3(0, 0, 0),
      age: Math.random() * 450,
      maxAge: 600 + Math.random() * 300,
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
      // von Kármán vortex street simulation with proper physics
      const flowSpeed = 2.0; // Free stream velocity
      const x = p.position.x;
      const y = p.position.y;

      // Cylinder obstacle at left side
      const obstacleX = -8;
      const obstacleY = 0;
      const obstacleRadius = 1.0;

      const dx = x - obstacleX;
      const dy = y - obstacleY;
      const distToObstacle = Math.sqrt(dx * dx + dy * dy);

      // Base flow (left to right)
      let vx = flowSpeed;
      let vy = 0;

      // Strouhal number for vortex shedding frequency
      // St ≈ 0.2 for cylinders at moderate Re
      const strouhalNumber = 0.21;
      const sheddingFrequency = (strouhalNumber * flowSpeed) / (2 * obstacleRadius);

      // Create alternating vortex street behind cylinder
      if (x > obstacleX) {
        const behindCylinder = x - obstacleX;

        // Vortex spacing (wavelength) - typically 5-6 diameters
        const vortexSpacing = 5.0 * obstacleRadius;

        // Calculate which vortex pair we're near
        const vortexPhase = (behindCylinder / vortexSpacing) * Math.PI * 2;
        const timePhase = time * sheddingFrequency * Math.PI * 2;

        // Create multiple vortex centers with alternating rotation
        for (let n = 0; n < 6; n++) {
          const vortexXOffset = n * vortexSpacing + (time * flowSpeed * 0.3);
          const vortexX = obstacleX + (vortexXOffset % (6 * vortexSpacing));

          // Alternate vortices above and below centerline
          const vortexYOffset = 1.2 * obstacleRadius;
          const isUpperVortex = n % 2 === 0;
          const vortexY = isUpperVortex ? vortexYOffset : -vortexYOffset;

          const dvx = x - vortexX;
          const dvy = y - vortexY;
          const distToVortex = Math.sqrt(dvx * dvx + dvy * dvy);
          const vortexCoreRadius = 1.5 * obstacleRadius;

          if (distToVortex < vortexCoreRadius * 3) {
            // Rankine vortex model
            const vortexStrength = 8.0;
            const circulation = isUpperVortex ? -vortexStrength : vortexStrength;

            let tangentialVel;
            if (distToVortex < vortexCoreRadius) {
              // Solid body rotation in core
              tangentialVel = circulation * distToVortex / (vortexCoreRadius * vortexCoreRadius);
            } else {
              // Potential flow outside core
              tangentialVel = circulation / distToVortex;
            }

            // Decay with distance from cylinder
            const decay = Math.exp(-behindCylinder * 0.08);
            tangentialVel *= decay;

            // Add tangential velocity (perpendicular to radius)
            vx += -dvy / distToVortex * tangentialVel;
            vy += dvx / distToVortex * tangentialVel;
          }
        }

        // Add wake turbulence
        if (Math.abs(y) < 3 * obstacleRadius) {
          const turbulence = Math.sin(timePhase + vortexPhase * 2) * 0.5;
          const turbulenceDecay = Math.exp(-behindCylinder * 0.1);
          vy += turbulence * turbulenceDecay;
        }
      }

      // Flow around obstacle (potential flow)
      if (distToObstacle < obstacleRadius * 4) {
        const r2 = dx * dx + dy * dy;
        const a2 = obstacleRadius * obstacleRadius;

        if (distToObstacle > obstacleRadius) {
          // Potential flow around cylinder
          const factor = a2 / r2;
          vx = vx * (1 - factor * (dx * dx / r2)) - vy * factor * (dx * dy / r2);
          vy = vy * (1 - factor * (dy * dy / r2)) - vx * factor * (dx * dy / r2);
        }
      }

      // Strong repulsion from obstacle
      if (distToObstacle < obstacleRadius * 1.3) {
        const repelForce = (obstacleRadius * 1.3 - distToObstacle) * 5;
        vx += (dx / distToObstacle) * repelForce;
        vy += (dy / distToObstacle) * repelForce;
      }

      // Update position with slower time step for better vortex formation
      const dt = 0.008; // Reduced from 0.016 to slow down dynamics by 50%
      p.position.x += vx * dt;
      p.position.y += vy * dt;

      // Age particles
      p.age += 1;

      // Reset particles that flow off screen or are too old
      if (p.position.x > 30 || p.position.x < -12 ||
          p.position.y > 10 || p.position.y < -10 ||
          p.age > p.maxAge) {
        // Respawn at left side with uniform flow distribution across full height
        p.position.x = -12 + Math.random() * 0.5;
        p.position.y = (Math.random() - 0.5) * 20; // Full y-axis coverage from -10 to +10
        p.position.z = (Math.random() - 0.5) * 1.5;
        p.age = 0;
        p.maxAge = 600 + Math.random() * 300; // Extended lifetime so particles travel farther
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
        size={0.06}
        color="#ffffff"
        sizeAttenuation
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Cylinder() {
  // Hidden for now - will be re-enabled later
  return null;

  // return (
  //   <group position={[-8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
  //     {/* Circular edge outline */}
  //     <mesh>
  //       <torusGeometry args={[1.0, 0.03, 16, 64]} />
  //       <meshBasicMaterial color="#ffffff" />
  //     </mesh>
  //   </group>
  // );
}

export function VonKarmanScene() {
  return (
    <Canvas
      camera={{ position: [2, 0, 12], fov: 65 }}
      style={{ background: "#000000" }}
    >
      <Cylinder />
      <VonKarmanParticles />
    </Canvas>
  );
}
