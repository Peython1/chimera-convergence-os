
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, Point } from '@react-three/drei';
import * as THREE from 'three';

export const MythologicalAmbient: React.FC = () => {
  const dustRef = useRef<THREE.Points>(null);
  const emberRef = useRef<THREE.Points>(null);

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
      {/* Golden Dust Particles */}
      <Points ref={dustRef} limit={1000}>
        <pointsMaterial 
          size={0.02} 
          color="#ffd700" 
          transparent 
          opacity={0.6}
          sizeAttenuation
        />
        {Array.from({ length: 500 }).map((_, i) => (
          <Point
            key={i}
            position={[
              (Math.random() - 0.5) * 40,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 40
            ]}
          />
        ))}
      </Points>
      
      {/* Fire Embers */}
      <Points ref={emberRef} limit={300}>
        <pointsMaterial 
          size={0.05} 
          color="#ff6b35" 
          transparent 
          opacity={0.8}
          sizeAttenuation
        />
        {Array.from({ length: 200 }).map((_, i) => (
          <Point
            key={i}
            position={[
              (Math.random() - 0.5) * 20,
              Math.random() * 15,
              (Math.random() - 0.5) * 20
            ]}
          />
        ))}
      </Points>
    </group>
  );
};
