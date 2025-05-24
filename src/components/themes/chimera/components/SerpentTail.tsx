import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder } from '@react-three/drei';
import * as THREE from 'three';

export const SerpentTail: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const scalesRef = useRef<THREE.Group>(null);

  const serpentSegments = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      position: [
        Math.sin(i * 0.5) * 3,
        -2 + Math.cos(i * 0.3) * 0.5,
        -10 + i * 0.8
      ] as [number, number, number],
      scale: Math.max(0.3, 1 - i * 0.03)
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const time = state.clock.elapsedTime;
        child.position.x = Math.sin(time + i * 0.5) * 3;
        child.position.y = -2 + Math.cos(time * 0.5 + i * 0.3) * 0.5;
        child.rotation.z = Math.sin(time + i * 0.2) * 0.3;
      });
    }
    
    if (scalesRef.current) {
      scalesRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {serpentSegments.map((segment) => (
        <group key={segment.id}>
          {/* Serpent Body Segment */}
          <Cylinder
            args={[segment.scale, segment.scale * 0.8, 0.5, 8]}
            position={segment.position}
          >
            <meshPhongMaterial 
              color="#2d5a27"
              emissive="#1a472a"
              emissiveIntensity={0.2}
              shininess={200}
            />
          </Cylinder>
          
          {/* Scales */}
          <group ref={segment.id === 0 ? scalesRef : undefined}>
            {Array.from({ length: 6 }).map((_, scaleIndex) => {
              const scaleAngle = (scaleIndex / 6) * Math.PI * 2;
              const scaleX = segment.position[0] + Math.cos(scaleAngle) * segment.scale * 0.9;
              const scaleZ = segment.position[2] + Math.sin(scaleAngle) * segment.scale * 0.9;
              
              return (
                <Cylinder
                  key={scaleIndex}
                  args={[0.05, 0.03, 0.1, 6]}
                  position={[scaleX, segment.position[1], scaleZ]}
                  rotation={[Math.PI / 2, scaleAngle, 0]}
                >
                  <meshPhongMaterial 
                    color="#4a7c59"
                    emissive="#2d5a27"
                    emissiveIntensity={0.1}
                  />
                </Cylinder>
              );
            })}
          </group>
        </group>
      ))}
    </group>
  );
};
