
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
  const defaultFallback = (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color="#444444" transparent opacity={0.1} />
      </mesh>
    </group>
  );

  return (
    <ChimeraErrorBoundary fallback={fallback}>
      <Suspense fallback={defaultFallback}>
        {children}
      </Suspense>
    </ChimeraErrorBoundary>
  );
};
