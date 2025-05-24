
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Plane, Box } from '@react-three/drei';
import * as THREE from 'three';

interface GoatTerrainProps {
  mythosLevel: number;
}

export const GoatTerrain: React.FC<GoatTerrainProps> = ({ mythosLevel }) => {
  const terrainRef = useRef<THREE.Mesh>(null);
  const hornsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (terrainRef.current) {
      terrainRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    
    if (hornsRef.current) {
      hornsRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group>
      {/* Mountain Terrain */}
      <Plane 
        ref={terrainRef}
        args={[50, 50, 32, 32]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -3, 0]}
      >
        <meshPhongMaterial 
          color="#8b7355"
          wireframe={false}
          transparent
          opacity={0.8}
        />
      </Plane>
      
      {/* Goat Horns */}
      <group ref={hornsRef}>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 15 + (mythosLevel / 100) * 5;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          
          return (
            <group key={i} position={[x, -1, z]}>
              <Box 
                args={[0.2, 3, 0.2]} 
                rotation={[0, angle, Math.PI / 6]}
              >
                <meshPhongMaterial 
                  color="#654321"
                  emissive="#8b4513"
                  emissiveIntensity={0.1}
                />
              </Box>
              <Box 
                args={[0.15, 2.5, 0.15]} 
                position={[0, 0.5, 0]}
                rotation={[0, angle, Math.PI / 4]}
              >
                <meshPhongMaterial 
                  color="#8b7355"
                  emissive="#a0522d"
                  emissiveIntensity={0.1}
                />
              </Box>
            </group>
          );
        })}
      </group>
    </group>
  );
};
