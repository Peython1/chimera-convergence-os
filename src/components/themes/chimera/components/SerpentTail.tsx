
import React, { useRef, useMemo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder } from '@react-three/drei';
import * as THREE from 'three';

export const SerpentTail: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const serpentSegments = useMemo(() => {
    try {
      return Array.from({ length: 8 }, (_, i) => ({
        id: i,
        position: [
          Math.sin(i * 0.5) * 2,
          -2 + Math.cos(i * 0.3) * 0.5,
          -8 + i * 0.6
        ] as [number, number, number],
        scale: Math.max(0.3, 1 - i * 0.04)
      }));
    } catch (error) {
      console.error('Error creating serpent segments:', error);
      return [];
    }
  }, []);

  const updateAnimation = useCallback((state: any) => {
    if (!groupRef.current?.children) return;
    
    try {
      const children = groupRef.current.children;
      
      children.forEach((child, i) => {
        if (!child?.position || !child?.rotation) return;
        
        const time = state.clock?.elapsedTime || 0;
        child.position.x = Math.sin(time + i * 0.5) * 2;
        child.position.y = -2 + Math.cos(time * 0.5 + i * 0.3) * 0.5;
        child.rotation.z = Math.sin(time + i * 0.2) * 0.2;
      });
    } catch (error) {
      console.error('Error in serpent animation:', error);
    }
  }, []);

  useFrame(updateAnimation);

  if (serpentSegments.length === 0) {
    return null;
  }

  return (
    <group ref={groupRef}>
      {serpentSegments.map((segment) => (
        <group key={segment.id} position={segment.position}>
          <Cylinder args={[segment.scale, segment.scale * 0.8, 0.5, 8]}>
            <meshPhongMaterial color="#2d5a27" />
          </Cylinder>
        </group>
      ))}
    </group>
  );
};
