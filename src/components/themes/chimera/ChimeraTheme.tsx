
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import { LionHead } from './components/LionHead';
import { GoatTerrain } from './components/GoatTerrain';
import { SerpentTail } from './components/SerpentTail';
import { ChimeraCursor } from './components/ChimeraCursor';
import { MythologicalAmbient } from './components/MythologicalAmbient';

interface ChimeraThemeProps {
  children: React.ReactNode;
  intensity?: number;
  mythosLevel?: number;
}

const LoadingFallback = () => (
  <group>
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshBasicMaterial color="#444444" transparent opacity={0.1} />
    </mesh>
  </group>
);

const ChimeraTheme: React.FC<ChimeraThemeProps> = ({ 
  children, 
  intensity = 0.7, 
  mythosLevel = 75 
}) => {
  const safeIntensity = Math.max(0.1, Math.min(1, intensity));
  const safeMythosLevel = Math.max(0, Math.min(100, mythosLevel));

  return (
    <div className="relative w-full h-full chimera-theme">
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 5, 10], fov: 60 }}
          style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
          gl={{ 
            antialias: true,
            alpha: false,
            powerPreference: "high-performance"
          }}
          dpr={[1, 2]}
        >
          <Suspense fallback={<LoadingFallback />}>
            <ambientLight intensity={0.3} color="#ffd700" />
            <directionalLight 
              position={[10, 10, 5]} 
              intensity={safeIntensity} 
              color="#ff6b35" 
              castShadow 
            />
            <pointLight 
              position={[-10, -10, -5]} 
              intensity={0.5} 
              color="#4a90e2" 
            />

            <LionHead position={[0, 2, -8]} fireIntensity={safeIntensity} />
            <GoatTerrain mythosLevel={safeMythosLevel} />
            <SerpentTail />
            
            <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
            <Environment preset="night" />
            <MythologicalAmbient />
            
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              enableRotate={true}
              autoRotate={true}
              autoRotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 w-full h-full">
        {children}
      </div>

      <ChimeraCursor />
    </div>
  );
};

export default ChimeraTheme;
