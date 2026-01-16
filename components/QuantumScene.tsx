
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Points, PointMaterial, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

const FieldGrid = () => {
  const count = 30;
  const points = useMemo(() => {
    const p = [];
    for (let x = 0; x < count; x++) {
      for (let z = 0; z < count; z++) {
        p.push((x - count / 2) * 0.4, 0, (z - count / 2) * 0.4);
      }
    }
    return new Float32Array(p);
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      const t = state.clock.getElapsedTime();
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const z = positions[i + 2];
        const dist = Math.sqrt(x * x + z * z);
        positions[i + 1] = Math.sin(dist - t * 2) * 0.4 + Math.cos(x * 0.5 + t) * 0.2;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={points} stride={3}>
      <PointMaterial
        transparent
        color="#C5A059"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
};

export const FieldScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
      <Canvas camera={{ position: [5, 5, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#C5A059" />
        <FieldGrid />
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
           <Sphere args={[1.5, 64, 64]}>
              <MeshDistortMaterial
                color="#C5A059"
                envMapIntensity={1}
                clearcoat={1}
                metalness={0.9}
                distort={0.4}
                speed={2}
                transparent
                opacity={0.3}
              />
           </Sphere>
        </Float>
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export const VacuumFluctuationScene: React.FC = () => {
  const ParticlePop = ({ index }: { index: number }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const speed = useMemo(() => 0.5 + Math.random() * 2, []);
    const delay = useMemo(() => Math.random() * 10, []);
    const position = useMemo(() => [
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 5
    ] as [number, number, number], []);

    useFrame((state) => {
      if (meshRef.current) {
        const t = (state.clock.getElapsedTime() + delay) % speed;
        const scale = Math.sin((t / speed) * Math.PI);
        meshRef.current.scale.setScalar(scale * 0.2);
        
        // Fix: Casting to MeshStandardMaterial and ensuring it is not an array to resolve 'opacity' property missing on type Material.
        const material = meshRef.current.material;
        if (material && !Array.isArray(material)) {
          (material as THREE.MeshStandardMaterial).opacity = scale * 0.5;
        }
      }
    });

    return (
      <Sphere ref={meshRef} position={position} args={[1, 16, 16]}>
        <meshStandardMaterial color={index % 2 === 0 ? "#C5A059" : "#4F46E5"} transparent emissive={index % 2 === 0 ? "#C5A059" : "#4F46E5"} emissiveIntensity={2} />
      </Sphere>
    );
  };

  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <group>
          {[...Array(40)].map((_, i) => (
            <ParticlePop key={i} index={i} />
          ))}
        </group>
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
};
