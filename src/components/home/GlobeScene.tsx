import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { hubs, latLngToVec3 } from '@/lib/geo';

const RADIUS = 1.6;

function HubMarkers() {
  return (
    <>
      {hubs.map((hub) => {
        const pos = latLngToVec3(hub.lat, hub.lng, RADIUS * 1.01);
        return (
          <group key={hub.name} position={pos}>
            <mesh>
              <sphereGeometry args={[hub.origin ? 0.034 : 0.02, 16, 16]} />
              <meshBasicMaterial color={hub.origin ? '#d3a06a' : '#f0ded0'} />
            </mesh>
            {hub.origin && (
              <mesh>
                <sphereGeometry args={[0.075, 16, 16]} />
                <meshBasicMaterial color="#d3a06a" transparent opacity={0.22} />
              </mesh>
            )}
          </group>
        );
      })}
    </>
  );
}

function GlobeArcs() {
  const arcs = useMemo(() => {
    const origin = hubs.find((h) => h.origin);
    if (!origin) return [];
    const originPos = new THREE.Vector3(...latLngToVec3(origin.lat, origin.lng, RADIUS * 1.01));

    return hubs
      .filter((h) => !h.origin)
      .map((hub) => {
        const start = originPos.clone();
        const end = new THREE.Vector3(...latLngToVec3(hub.lat, hub.lng, RADIUS * 1.01));
        const mid = start.clone().add(end).multiplyScalar(0.5);
        const midLength = mid.length();
        mid.normalize().multiplyScalar(midLength + 0.5);
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        return curve.getPoints(36);
      });
  }, []);

  return (
    <>
      {arcs.map((points, i) => (
        <Line key={i} points={points} color="#7eb8e8" transparent opacity={0.5} lineWidth={1} />
      ))}
    </>
  );
}

function RotatingGlobe() {
  const group = useRef<THREE.Group>(null);
  const reduceMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  useFrame((_, delta) => {
    if (group.current && !reduceMotion) {
      group.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={group} rotation={[0.12, 0.4, 0]}>
      <mesh>
        <sphereGeometry args={[RADIUS, 64, 64]} />
        <meshStandardMaterial color="#101b45" roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh>
        <sphereGeometry args={[RADIUS * 1.004, 24, 16]} />
        <meshBasicMaterial color="#5b9bd5" wireframe transparent opacity={0.16} />
      </mesh>
      <mesh>
        <sphereGeometry args={[RADIUS * 1.05, 48, 48]} />
        <meshBasicMaterial color="#5b9bd5" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>
      <HubMarkers />
      <GlobeArcs />
    </group>
  );
}

/**
 * Purely decorative — no OrbitControls / pointer capture, so it never
 * fights a visitor's normal page-scroll gesture, especially on touch.
 */
export function GlobeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 4.6], fov: 40 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 3, 4]} intensity={1.4} color="#f0ded0" />
      <pointLight position={[-4, -2, -3]} intensity={0.6} color="#5b9bd5" />
      <Stars radius={60} depth={30} count={1000} factor={2} fade speed={0.6} />
      <RotatingGlobe />
    </Canvas>
  );
}
