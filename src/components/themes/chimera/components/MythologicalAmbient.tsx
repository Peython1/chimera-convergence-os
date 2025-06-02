
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const MythologicalAmbient: React.FC = () => {
  const dustRef = useRef<THREE.Points>(null);
  const emberRef = useRef<THREE.Points>(null);

  const dustGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const count = 100;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  const emberGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const count = 50;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = Math.random() * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  const dustMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.02,
      color: '#ffd700',
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true
    });
  }, []);

  const emberMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.05,
      color: '#ff6b35',
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });
  }, []);

  useFrame((state) => {
    if (dustRef.current) {
      dustRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
    
    if (emberRef.current) {
      emberRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      emberRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group>
      <points ref={dustRef} geometry={dustGeometry} material={dustMaterial} />
      <points ref={emberRef} geometry={emberGeometry} material={emberMaterial} />
    </group>
  );
};
