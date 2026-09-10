"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { InfoTooltip } from "./InfoTooltip";

const DEFAULT_RE = 150;

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  age: number;
  maxAge: number;
}

function vortexStrengthForRe(re: number): number {
  if (re < 40) return 0;
  if (re <= DEFAULT_RE) return 8.0 * (re - 40) / (DEFAULT_RE - 40);
  return 8.0 + Math.min(12.0, (re - DEFAULT_RE) / 100);
}

function turbulenceForRe(re: number): number {
  if (re < 40) return 0;
  if (re <= 200) return 0.5 * (re - 40) / 160;
  return 0.5 + 2.5 * Math.min(1, (re - 200) / 1300);
}

function reRegime(re: number): string {
  if (re < 40) return "laminar";
  if (re < 300) return "vortex shedding";
  return "turbulent";
}

function VonKarmanParticles({ re }: { re: number }) {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 50000;

  // Sync prop to ref so useFrame always reads the current value.
  const reRef = useRef(re);
  reRef.current = re;

  const particles = useRef<Particle[]>([]);

  useMemo(() => {
    particles.current = Array.from({ length: particleCount }, () => ({
      position: new THREE.Vector3(
        Math.random() * 42 - 12,
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
    const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const currentRe = reRef.current;
    const vortexStrength = vortexStrengthForRe(currentRe);
    const turbulenceAmp = turbulenceForRe(currentRe);

    const flowSpeed = 2.0;
    const obstacleX = -8;
    const obstacleRadius = 1.0;
    const sheddingFrequency = (0.21 * flowSpeed) / (2 * obstacleRadius);

    particles.current.forEach((p, i) => {
      const x = p.position.x;
      const y = p.position.y;
      const dx = x - obstacleX;
      const dy = y; // obstacleY = 0
      const distToObstacle = Math.sqrt(dx * dx + dy * dy);

      let vx = flowSpeed;
      let vy = 0;

      if (x > obstacleX && vortexStrength > 0) {
        const behindCylinder = x - obstacleX;
        const vortexSpacing = 5.0 * obstacleRadius;
        const vortexPhase = (behindCylinder / vortexSpacing) * Math.PI * 2;
        const timePhase = time * sheddingFrequency * Math.PI * 2;

        for (let n = 0; n < 6; n++) {
          const vortexXOffset = n * vortexSpacing + (time * flowSpeed * 0.3);
          const vortexX = obstacleX + (vortexXOffset % (6 * vortexSpacing));
          const vortexYOffset = 1.2 * obstacleRadius;
          const isUpperVortex = n % 2 === 0;
          const vortexY = isUpperVortex ? vortexYOffset : -vortexYOffset;

          const dvx = x - vortexX;
          const dvy = y - vortexY;
          const distToVortex = Math.sqrt(dvx * dvx + dvy * dvy);
          const vortexCoreRadius = 1.5 * obstacleRadius;

          if (distToVortex < vortexCoreRadius * 3 && distToVortex > 0) {
            const circulation = isUpperVortex ? -vortexStrength : vortexStrength;
            let tangentialVel: number;
            if (distToVortex < vortexCoreRadius) {
              tangentialVel = circulation * distToVortex / (vortexCoreRadius * vortexCoreRadius);
            } else {
              tangentialVel = circulation / distToVortex;
            }
            const decay = Math.exp(-behindCylinder * 0.08);
            tangentialVel *= decay;
            vx += -dvy / distToVortex * tangentialVel;
            vy += dvx / distToVortex * tangentialVel;
          }
        }

        if (Math.abs(y) < 3 * obstacleRadius) {
          const turbulence = Math.sin(timePhase + vortexPhase * 2) * turbulenceAmp;
          const turbulenceDecay = Math.exp(-behindCylinder * 0.1);
          vy += turbulence * turbulenceDecay;
        }
      }

      if (distToObstacle < obstacleRadius * 4) {
        const r2 = dx * dx + dy * dy;
        const a2 = obstacleRadius * obstacleRadius;
        if (distToObstacle > obstacleRadius) {
          const factor = a2 / r2;
          vx = vx * (1 - factor * (dx * dx / r2)) - vy * factor * (dx * dy / r2);
          vy = vy * (1 - factor * (dy * dy / r2)) - vx * factor * (dx * dy / r2);
        }
      }

      if (distToObstacle < obstacleRadius * 1.3 && distToObstacle > 0) {
        const repelForce = (obstacleRadius * 1.3 - distToObstacle) * 5;
        vx += (dx / distToObstacle) * repelForce;
        vy += (dy / distToObstacle) * repelForce;
      }

      const dt = 0.008;
      p.position.x += vx * dt;
      p.position.y += vy * dt;
      p.age += 1;

      if (p.position.x > 30 || p.position.x < -12 ||
          p.position.y > 10 || p.position.y < -10 ||
          p.age > p.maxAge) {
        p.position.x = -12 + Math.random() * 0.5;
        p.position.y = (Math.random() - 0.5) * 20;
        p.position.z = (Math.random() - 0.5) * 1.5;
        p.age = 0;
        p.maxAge = 600 + Math.random() * 300;
      }

      posArray[i * 3] = p.position.x;
      posArray[i * 3 + 1] = p.position.y;
      posArray[i * 3 + 2] = p.position.z;
    });

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
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

export function VonKarmanScene() {
  const [re, setRe] = useState(DEFAULT_RE);
  const reset = useCallback(() => setRe(DEFAULT_RE), []);

  return (
    <div className="absolute inset-0" onDoubleClick={reset}>
      <Canvas
        camera={{ position: [2, 0, 12], fov: 65 }}
        style={{ background: "#000000" }}
      >
        <VonKarmanParticles re={re} />
      </Canvas>

      {/* Parameter control bar — stop propagation so double-click here doesn't reset */}
      <div
        className="absolute bottom-0 inset-x-0 z-10 flex items-center gap-2 px-3 py-2 bg-black/50 backdrop-blur-sm"
        onDoubleClick={e => e.stopPropagation()}
      >
        <InfoTooltip text="A classic pattern in fluid dynamics — alternating vortices that form behind a cylindrical obstacle as fluid flows past it. The Reynolds number controls whether the flow stays smooth, sheds vortices periodically, or becomes turbulent." />
        <span className="text-[10px] font-mono text-zinc-500 whitespace-nowrap select-none">von Kármán</span>
        <span className="text-zinc-700 text-[10px] select-none">·</span>
        <span className="text-[10px] font-mono text-zinc-400 whitespace-nowrap select-none">
          Re = {re} <span className="text-zinc-600">({reRegime(re)})</span>
        </span>
        <input
          type="range"
          min={10}
          max={1500}
          step={10}
          value={re}
          onChange={e => setRe(Number(e.target.value))}
          className="flex-1 h-1 accent-sky-400 cursor-pointer"
          title="Re — Reynolds number. Controls the transition from smooth flow to vortex shedding to turbulence."
          aria-label="Reynolds number"
        />
        <button
          onClick={reset}
          className="text-zinc-500 hover:text-white transition-colors text-sm leading-none select-none"
          title="Reset to default (Re = 150)"
          aria-label="Reset Reynolds number to default"
        >
          ↺
        </button>
      </div>
    </div>
  );
}
