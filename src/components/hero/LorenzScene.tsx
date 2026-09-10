"use client";

import { useRef, useMemo, useState, useCallback, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { InfoTooltip } from "./InfoTooltip";

const DEFAULT_RHO = 28;
const SIGMA = 10;
const BETA = 8 / 3;
const DT = 0.005;
const MAX_HISTORY = 500;

const INITIAL_POSITIONS: [number, number, number][] = [
  [0.1, 0, 0],
  [0.11, 0.01, 0],
  [0.105, -0.01, 0.01],
  [0.095, 0.005, -0.01],
];

const TRAIL_COLORS = [0xff0000, 0x0088ff, 0xff6600, 0xffdd00];

interface Point {
  position: THREE.Vector3;
  history: THREE.Vector3[];
}

function rhoRegime(rho: number): string {
  if (rho < 24.74) return "stable";
  if (rho < 35) return "chaotic";
  return "complex";
}

function makeTrajectories(): Point[] {
  return INITIAL_POSITIONS.map(([x, y, z]) => ({
    position: new THREE.Vector3(x, y, z),
    history: [],
  }));
}

function LorenzAttractor({ rho, resetKey }: { rho: number; resetKey: number }) {
  const trail1Ref = useRef<THREE.Mesh>(null);
  const trail2Ref = useRef<THREE.Mesh>(null);
  const trail3Ref = useRef<THREE.Mesh>(null);
  const trail4Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Sync prop to ref so useFrame always reads the current value.
  const rhoRef = useRef(rho);
  rhoRef.current = rho;

  const trajectories = useRef<Point[]>([]);

  // Synchronous init so the first useFrame call has data.
  useMemo(() => { trajectories.current = makeTrajectories(); }, []);

  // Reset trajectories when the parent requests it (resetKey increments).
  useEffect(() => {
    if (resetKey === 0) return;
    trajectories.current = makeTrajectories();
  }, [resetKey]);

  const particleGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(TRAIL_COLORS.length * 3), 3));
    const colorArray = new Float32Array(TRAIL_COLORS.length * 3);
    TRAIL_COLORS.forEach((hex, i) => {
      const c = new THREE.Color(hex);
      colorArray[i * 3] = c.r;
      colorArray[i * 3 + 1] = c.g;
      colorArray[i * 3 + 2] = c.b;
    });
    geom.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));
    return geom;
  }, []);

  useFrame(() => {
    if (!trail1Ref.current || !trail2Ref.current || !trail3Ref.current || !trail4Ref.current || !particlesRef.current) return;

    const currentRho = rhoRef.current;
    const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const trailRefs = [trail1Ref, trail2Ref, trail3Ref, trail4Ref];

    trajectories.current.forEach((trajectory, idx) => {
      const { x, y, z } = trajectory.position;

      const dx = SIGMA * (y - x);
      const dy = x * (currentRho - z) - y;
      const dz = x * y - BETA * z;

      trajectory.position.x += dx * DT;
      trajectory.position.y += dy * DT;
      trajectory.position.z += dz * DT;

      posArray[idx * 3] = trajectory.position.x * 0.15;
      posArray[idx * 3 + 1] = trajectory.position.y * 0.15;
      posArray[idx * 3 + 2] = trajectory.position.z * 0.15;

      trajectory.history.push(new THREE.Vector3(
        trajectory.position.x * 0.15,
        trajectory.position.y * 0.15,
        trajectory.position.z * 0.15
      ));

      // Cap history to keep geometry creation cost bounded (~500 segments per trail).
      if (trajectory.history.length > MAX_HISTORY) {
        trajectory.history.shift();
      }

      if (trajectory.history.length > 2 && trailRefs[idx].current) {
        const curve = new THREE.CatmullRomCurve3(trajectory.history);
        const tubeGeometry = new THREE.TubeGeometry(curve, trajectory.history.length, 0.008, 6, false);
        trailRefs[idx].current!.geometry.dispose();
        trailRefs[idx].current!.geometry = tubeGeometry;
      }
    });

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const stub = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.1, 0, 0)]);

  return (
    <group>
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
      <mesh ref={trail1Ref}>
        <tubeGeometry args={[stub, 2, 0.008, 6, false]} />
        <meshBasicMaterial color={TRAIL_COLORS[0]} transparent opacity={0.7} />
      </mesh>
      <mesh ref={trail2Ref}>
        <tubeGeometry args={[stub, 2, 0.008, 6, false]} />
        <meshBasicMaterial color={TRAIL_COLORS[1]} transparent opacity={0.7} />
      </mesh>
      <mesh ref={trail3Ref}>
        <tubeGeometry args={[stub, 2, 0.008, 6, false]} />
        <meshBasicMaterial color={TRAIL_COLORS[2]} transparent opacity={0.7} />
      </mesh>
      <mesh ref={trail4Ref}>
        <tubeGeometry args={[stub, 2, 0.008, 6, false]} />
        <meshBasicMaterial color={TRAIL_COLORS[3]} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

export function LorenzScene() {
  const [rho, setRho] = useState(DEFAULT_RHO);
  const [resetKey, setResetKey] = useState(0);

  const reset = useCallback(() => {
    setRho(DEFAULT_RHO);
    setResetKey(k => k + 1);
  }, []);

  return (
    <div className="absolute inset-0" onDoubleClick={reset}>
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        style={{ background: "#000000" }}
      >
        <LorenzAttractor rho={rho} resetKey={resetKey} />
      </Canvas>

      {/* Parameter control bar — stop propagation so double-click here doesn't reset */}
      <div
        className="absolute bottom-0 inset-x-0 z-10 flex items-center gap-2 px-3 py-2 bg-black/50 backdrop-blur-sm"
        onDoubleClick={e => e.stopPropagation()}
      >
        <InfoTooltip text="A simplified model of atmospheric convection from Lorenz's 1963 paper — and the system that gave us the term 'butterfly effect.' The parameter ρ controls whether trajectories settle to fixed points or wander chaotically along the famous butterfly-shaped attractor." />
        <span className="text-[10px] font-mono text-zinc-500 whitespace-nowrap select-none">Lorenz</span>
        <span className="text-zinc-700 text-[10px] select-none">·</span>
        <span className="text-[10px] font-mono text-zinc-400 whitespace-nowrap select-none">
          ρ = {rho.toFixed(1)} <span className="text-zinc-600">({rhoRegime(rho)})</span>
        </span>
        <input
          type="range"
          min={1}
          max={100}
          step={0.5}
          value={rho}
          onChange={e => setRho(Number(e.target.value))}
          className="flex-1 h-1 accent-sky-400 cursor-pointer"
          title="ρ — Rayleigh parameter. Below ~24.74 the system is stable; at ρ = 28 it's the classic chaotic butterfly."
          aria-label="Rayleigh parameter rho"
        />
        <button
          onClick={reset}
          className="text-zinc-500 hover:text-white transition-colors text-sm leading-none select-none"
          title="Reset to default (ρ = 28)"
          aria-label="Reset ρ to default"
        >
          ↺
        </button>
      </div>
    </div>
  );
}
