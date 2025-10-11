"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Point {
  position: THREE.Vector3;
  history: THREE.Vector3[];
}

function LorenzAttractor() {
  const trail1Ref = useRef<THREE.Mesh>(null);
  const trail2Ref = useRef<THREE.Mesh>(null);
  const trail3Ref = useRef<THREE.Mesh>(null);
  const trail4Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Lorenz system parameters
  const sigma = 10;
  const rho = 28;
  const beta = 8/3;
  const dt = 0.005; // Time step

  // Multiple trajectories with different colors
  const trajectories = useRef<Point[]>([]);

  // Four particles: red, blue, orange, yellow
  const colors = useMemo(() => {
    return [
      new THREE.Color(0xff0000), // Red
      new THREE.Color(0x0088ff), // Blue
      new THREE.Color(0xff6600), // Orange
      new THREE.Color(0xffdd00), // Yellow
    ];
  }, []);

  // Initialize four trajectories with slightly different starting positions
  useMemo(() => {
    trajectories.current = [
      {
        position: new THREE.Vector3(0.1, 0, 0),
        history: [],
      },
      {
        position: new THREE.Vector3(0.11, 0.01, 0),
        history: [],
      },
      {
        position: new THREE.Vector3(0.105, -0.01, 0.01),
        history: [],
      },
      {
        position: new THREE.Vector3(0.095, 0.005, -0.01),
        history: [],
      },
    ];
  }, []);

  // Create particle geometry for current positions
  const particleGeometry = useMemo(() => {
    const positions = new Float32Array(colors.length * 3);
    return new THREE.BufferGeometry().setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
  }, []);

  const particleColors = useMemo(() => {
    const colorArray = new Float32Array(colors.length * 3);
    colors.forEach((color, i) => {
      colorArray[i * 3] = color.r;
      colorArray[i * 3 + 1] = color.g;
      colorArray[i * 3 + 2] = color.b;
    });
    return colorArray;
  }, []);

  useMemo(() => {
    particleGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(particleColors, 3)
    );
  }, [particleGeometry, particleColors]);

  useFrame(() => {
    if (!trail1Ref.current || !trail2Ref.current || !trail3Ref.current || !trail4Ref.current || !particlesRef.current) return;

    const particlePositions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const trailRefs = [trail1Ref, trail2Ref, trail3Ref, trail4Ref];

    trajectories.current.forEach((trajectory, idx) => {
      const { x, y, z } = trajectory.position;

      // Lorenz equations
      const dx = sigma * (y - x);
      const dy = x * (rho - z) - y;
      const dz = x * y - beta * z;

      // Update position using Euler integration
      trajectory.position.x += dx * dt;
      trajectory.position.y += dy * dt;
      trajectory.position.z += dz * dt;

      // Update particle position
      particlePositions[idx * 3] = trajectory.position.x * 0.15;
      particlePositions[idx * 3 + 1] = trajectory.position.y * 0.15;
      particlePositions[idx * 3 + 2] = trajectory.position.z * 0.15;

      // Add to history (scaled down for display)
      trajectory.history.push(new THREE.Vector3(
        trajectory.position.x * 0.15,
        trajectory.position.y * 0.15,
        trajectory.position.z * 0.15
      ));

      // Update trail using TubeGeometry for visibility
      if (trajectory.history.length > 2 && trailRefs[idx].current) {
        const curve = new THREE.CatmullRomCurve3(trajectory.history);
        const tubeGeometry = new THREE.TubeGeometry(curve, trajectory.history.length, 0.008, 6, false);
        trailRefs[idx].current.geometry.dispose();
        trailRefs[idx].current.geometry = tubeGeometry;
      }
    });

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      {/* Particle points - red and blue */}
      <points ref={particlesRef} geometry={particleGeometry}>
        <pointsMaterial
          size={0.12}
          vertexColors
          sizeAttenuation
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Red trail tube */}
      <mesh ref={trail1Ref}>
        <tubeGeometry args={[new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.1, 0, 0)]), 2, 0.008, 6, false]} />
        <meshBasicMaterial color={0xff0000} transparent opacity={0.7} />
      </mesh>

      {/* Blue trail tube */}
      <mesh ref={trail2Ref}>
        <tubeGeometry args={[new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.1, 0, 0)]), 2, 0.008, 6, false]} />
        <meshBasicMaterial color={0x0088ff} transparent opacity={0.7} />
      </mesh>

      {/* Orange trail tube */}
      <mesh ref={trail3Ref}>
        <tubeGeometry args={[new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.1, 0, 0)]), 2, 0.008, 6, false]} />
        <meshBasicMaterial color={0xff6600} transparent opacity={0.7} />
      </mesh>

      {/* Yellow trail tube */}
      <mesh ref={trail4Ref}>
        <tubeGeometry args={[new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.1, 0, 0)]), 2, 0.008, 6, false]} />
        <meshBasicMaterial color={0xffdd00} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

export function LorenzScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 60 }}
      style={{ background: "#000000" }}
    >
      <LorenzAttractor />
    </Canvas>
  );
}
