
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
    if (terrainRef.current?.position) {
      terrainRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    
    if (hornsRef.current?.rotation) {
      hornsRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const hornPositions = React.useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 12 + (mythosLevel / 100) * 3;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      return { x, z, angle };
    });
  }, [mythosLevel]);

  return (
    <group>
      <Plane 
        ref={terrainRef}
        args={[40, 40, 16, 16]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -3, 0]}
      >
        <meshPhongMaterial 
          color="#8b7355"
          transparent
          opacity={0.8}
        />
      </Plane>
      
      <group ref={hornsRef}>
        {hornPositions.map((horn, i) => (
          <group key={i} position={[horn.x, -1, horn.z]}>
            <Box 
              args={[0.15, 2.5, 0.15]} 
              rotation={[0, horn.angle, Math.PI / 8]}
            >
              <meshPhongMaterial color="#654321" />
            </Box>
            <Box 
              args={[0.1, 2, 0.1]} 
              position={[0, 0.4, 0]}
              rotation={[0, horn.angle, Math.PI / 6]}
            >
              <meshPhongMaterial color="#8b7355" />
            </Box>
          </group>
        ))}
      </group>
    </group>
  );
};
