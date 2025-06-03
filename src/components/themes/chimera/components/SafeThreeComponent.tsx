
import React, { Suspense } from 'react';
import { ChimeraErrorBoundary } from './ErrorBoundary';

interface SafeThreeComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const SafeThreeComponent: React.FC<SafeThreeComponentProps> = ({ 
  children, 
  fallback 
}) => {
  // Three.js compatible fallback - must be Three.js objects, not HTML
  const defaultFallback = (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color="#444444" transparent opacity={0.1} />
      </mesh>
    </group>
  );

  // Three.js compatible error fallback
  const errorFallback = (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshBasicMaterial color="#ff0000" transparent opacity={0.3} />
      </mesh>
    </group>
  );

  return (
    <ChimeraErrorBoundary fallback={errorFallback}>
      <Suspense fallback={fallback || defaultFallback}>
        {children}
      </Suspense>
    </ChimeraErrorBoundary>
  );
};
