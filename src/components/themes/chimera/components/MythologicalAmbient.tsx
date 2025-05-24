
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const MythologicalAmbient: React.FC = () => {
  const dustRef = useRef<THREE.Points>(null);
  const emberRef = useRef<THREE.Points>(null);

  // Create particle positions
  const dustPositions = useMemo(() => {
    const positions = new Float32Array(200 * 3); // Reduced particles
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, []);

  const emberPositions = useMemo(() => {
    const positions = new Float32Array(100 * 3); // Reduced particles
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = Math.random() * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
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
      {/* Golden Dust Particles */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dustPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.02} 
          color="#ffd700" 
          transparent 
          opacity={0.6}
          sizeAttenuation
        />
      </points>
      
      {/* Fire Embers */}
      <points ref={emberRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[emberPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.05} 
          color="#ff6b35" 
          transparent 
          opacity={0.8}
          sizeAttenuation
        />
      </points>
    </group>
  );
};
