
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder } from '@react-three/drei';
import * as THREE from 'three';

export const SerpentTail: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const serpentSegments = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      position: [
        Math.sin(i * 0.5) * 2,
        -2 + Math.cos(i * 0.3) * 0.5,
        -8 + i * 0.6
      ] as [number, number, number],
      scale: Math.max(0.3, 1 - i * 0.04)
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const time = state.clock.elapsedTime;
        if (child.position) {
          child.position.x = Math.sin(time + i * 0.5) * 2;
          child.position.y = -2 + Math.cos(time * 0.5 + i * 0.3) * 0.5;
          child.rotation.z = Math.sin(time + i * 0.2) * 0.2;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {serpentSegments.map((segment) => (
        <group key={segment.id} position={segment.position}>
          {/* Serpent Body Segment */}
          <Cylinder
            args={[segment.scale, segment.scale * 0.8, 0.5, 8]}
          >
            <meshPhongMaterial 
              color="#2d5a27"
            />
          </Cylinder>
          
          {/* Simplified scales */}
          {Array.from({ length: 4 }, (_, scaleIndex) => {
            const scaleAngle = (scaleIndex / 4) * Math.PI * 2;
            const scaleRadius = segment.scale * 0.9;
            
            return (
              <Cylinder
                key={scaleIndex}
                args={[0.03, 0.02, 0.08, 6]}
                position={[
                  Math.cos(scaleAngle) * scaleRadius,
                  0,
                  Math.sin(scaleAngle) * scaleRadius
                ]}
                rotation={[Math.PI / 2, scaleAngle, 0]}
              >
                <meshPhongMaterial 
                  color="#4a7c59"
                />
              </Cylinder>
            );
          })}
        </group>
      ))}
    </group>
  );
};
