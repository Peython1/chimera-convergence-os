
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import { LionHead } from './components/LionHead';
import { GoatTerrain } from './components/GoatTerrain';
import { SerpentTail } from './components/SerpentTail';
import { ChimeraCursor } from './components/ChimeraCursor';
import { MythologicalAmbient } from './components/MythologicalAmbient';
import { ChimeraErrorBoundary } from './components/ErrorBoundary';

interface ChimeraThemeProps {
  children: React.ReactNode;
  intensity?: number;
  mythosLevel?: number;
}

const ChimeraTheme: React.FC<ChimeraThemeProps> = ({ 
  children, 
  intensity = 0.7, 
  mythosLevel = 75 
}) => {
  const handleCanvasError = (error: any) => {
    console.error('Canvas error:', error);
  };

  const safeIntensity = Math.max(0.1, Math.min(1, intensity));
  const safeMythosLevel = Math.max(0, Math.min(100, mythosLevel));

  const FallbackComponent = () => (
    <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-900 to-blue-900">
      <div className="flex items-center justify-center w-full h-full">
        <div className="text-center text-white">
          <div className="animate-pulse text-lg">Loading Chimera Theme...</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-full chimera-theme">
      <ChimeraErrorBoundary fallback={<FallbackComponent />}>
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 5, 10], fov: 60 }}
            style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
            onError={handleCanvasError}
            gl={{ 
              antialias: true,
              alpha: false,
              powerPreference: "high-performance"
            }}
          >
            <Suspense fallback={null}>
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
      </ChimeraErrorBoundary>

      <div className="relative z-10 w-full h-full">
        {children}
      </div>

      <ChimeraCursor />
    </div>
  );
};

export default ChimeraTheme;
