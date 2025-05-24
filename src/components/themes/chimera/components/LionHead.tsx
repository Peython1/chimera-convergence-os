
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

interface LionHeadProps {
  position: [number, number, number];
  fireIntensity: number;
}

export const LionHead: React.FC<LionHeadProps> = ({ position, fireIntensity }) => {
  const groupRef = useRef<THREE.Group>(null);
  const fireRef = useRef<THREE.Points>(null);

  // Create fire particles
  const fireParticles = useMemo(() => {
    const particles = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      particles[i * 3] = (Math.random() - 0.5) * 2;
      particles[i * 3 + 1] = Math.random() * 3;
      particles[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return particles;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    
    if (fireRef.current) {
      fireRef.current.rotation.y += 0.01;
      const positions = fireRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += 0.02; // Move particles up
        if (positions[i] > 3) {
          positions[i] = 0; // Reset to bottom
        }
      }
      
      fireRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Lion Head Base */}
      <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
        <meshPhongMaterial 
          color="#ffd700" 
          shininess={100}
          emissive="#ff6b35"
          emissiveIntensity={0.2}
        />
      </Sphere>
      
      {/* Lion Mane */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x = Math.cos(angle) * 1.8;
        const z = Math.sin(angle) * 1.8;
        
        return (
          <Box 
            key={i}
            args={[0.3, 0.8, 0.3]} 
            position={[x, 0.2, z]}
            rotation={[0, angle, 0]}
          >
            <meshPhongMaterial 
              color="#ff8c42" 
              emissive="#ff4500"
              emissiveIntensity={fireIntensity * 0.3}
            />
          </Box>
        );
      })}
      
      {/* Fire Effect */}
      <points ref={fireRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={fireParticles}
            count={fireParticles.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.1} 
          color="#ff4500"
          transparent
          opacity={fireIntensity}
          sizeAttenuation
        />
      </points>
    </group>
  );
};
