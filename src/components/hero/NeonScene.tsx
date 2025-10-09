"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

function NeonSculpt({ hyper, hover }: { hyper: boolean; hover: boolean }) {
  const group = React.useRef<THREE.Group>(null!);
  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y += delta * (hyper ? 1.4 : 0.5);
    const targetX = hover ? 0.25 : 0.1;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.06);
    const pulse = 1 + Math.sin(t * (hyper ? 2.0 : 1.2)) * 0.005;
    const s = (hyper ? 1.03 : 1.0) * pulse;
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, s, 0.06));
  });
  const baseColor = hyper ? 0xacf7c1 : 0x38bdf8; // celadon / deep-sky-blue
  return (
    <group ref={group} position={[0, 0.08, 0]}>
      <mesh castShadow>
        <torusKnotGeometry args={[1.15, 0.35, hyper ? 384 : 256, 48, 2, 3]} />
        <meshPhysicalMaterial
          color={baseColor}
          metalness={0.88}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.04}
          envMapIntensity={hyper ? 1.8 : 1.2}
          emissive={new THREE.Color(baseColor)}
          emissiveIntensity={hyper ? 0.35 : 0.2}
          // Nudge surface slightly to reduce z-fighting with overlay edges
          polygonOffset
          polygonOffsetFactor={1}
          polygonOffsetUnits={1}
        />
      </mesh>
    </group>
  );
}

function Particles({ hyper }: { hyper: boolean }) {
  const count = hyper ? 3000 : 1200;
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) arr[i] = (Math.random() - 0.5) * 16;
    return arr;
  }, [count]);
  const ref = React.useRef<THREE.Points>(null!);
  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.0008 * (hyper ? 4 : 1);
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={hyper ? 0.06 : 0.03}
        color={hyper ? 0xacf7c1 : 0x38bdf8}
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  );
}

export function NeonScene() {
  const [hyper, setHyper] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const clickRef = React.useRef<{ count: number; last: number }>({ count: 0, last: 0 });

  // Konami code easter egg
  React.useEffect(() => {
    const seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === seq[idx]) {
        idx++;
        if (idx === seq.length) {
          setHyper((h) => !h);
          idx = 0;
        }
      } else {
        idx = 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className="absolute inset-0"
      onPointerDown={() => {
        const now = Date.now();
        const diff = now - clickRef.current.last;
        clickRef.current.count = diff < 500 ? clickRef.current.count + 1 : 1;
        clickRef.current.last = now;
        if (clickRef.current.count >= 3) {
          setHyper((h) => !h);
          clickRef.current.count = 0;
        }
      }}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60, near: 0.5, far: 20 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance", precision: "highp" }}
        shadows
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
        }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={[0, 0, 0]} />
          <ambientLight intensity={0.55} />
          <directionalLight
            castShadow
            position={[6, 8, 6]}
            intensity={2.0}
            color={hyper ? 0xacf7c1 : 0x38bdf8}
            shadow-mapSize-width={4096}
            shadow-mapSize-height={4096}
            shadow-camera-near={0.5}
            shadow-camera-far={12}
            shadow-camera-left={-2.5}
            shadow-camera-right={2.5}
            shadow-camera-top={2.5}
            shadow-camera-bottom={-2.5}
            shadow-bias={-0.0006}
            shadow-normalBias={0.045}
            shadow-radius={3}
          />
          <Environment preset="city" />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.72, 0]} receiveShadow>
            <circleGeometry args={[5, 64]} />
            <shadowMaterial transparent opacity={0.35} />
          </mesh>
          <Particles hyper={hyper} />
          <NeonSculpt hyper={hyper} hover={hover} />
          <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={hyper ? 2.2 : 1.0} />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-2 text-center text-[10px] text-zinc-500/70">
        tip: try the Konami code or triple‑tap
      </div>
    </div>
  );
}


