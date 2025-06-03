
import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ChimeraErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    console.error('ChimeraErrorBoundary caught error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ChimeraErrorBoundary error details:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <group>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshBasicMaterial color="#ff0000" transparent opacity={0.3} />
          </mesh>
        </group>
      );
    }

    return this.props.children;
  }
}
