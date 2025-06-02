
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
        <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-purple-900 to-blue-900">
          <div className="text-center text-white p-8">
            <h2 className="text-xl font-bold mb-4">Theme Error</h2>
            <div className="text-sm opacity-70">
              Fallback to basic theme
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
