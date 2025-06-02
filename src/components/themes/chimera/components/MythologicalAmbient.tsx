
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const MythologicalAmbient: React.FC = () => {
  const dustRef = useRef<THREE.Points>(null);
  const emberRef = useRef<THREE.Points>(null);

  const { dustGeometry, dustMaterial, emberGeometry, emberMaterial } = useMemo(() => {
    // Dust geometry
    const dustGeo = new THREE.BufferGeometry();
    const dustCount = 100;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 30;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));

    // Ember geometry
    const emberGeo = new THREE.BufferGeometry();
    const emberCount = 50;
    const emberPositions = new Float32Array(emberCount * 3);
    for (let i = 0; i < emberCount; i++) {
      emberPositions[i * 3] = (Math.random() - 0.5) * 15;
      emberPositions[i * 3 + 1] = Math.random() * 10;
      emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));

    // Materials
    const dustMat = new THREE.PointsMaterial({
      size: 0.02,
      color: '#ffd700',
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true
    });

    const emberMat = new THREE.PointsMaterial({
      size: 0.05,
      color: '#ff6b35',
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });

    return {
      dustGeometry: dustGeo,
      dustMaterial: dustMat,
      emberGeometry: emberGeo,
      emberMaterial: emberMat
    };
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
