
export interface DiagnosticTest {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'passed' | 'failed' | 'warning';
  message?: string;
  details?: string;
}

export interface SystemDiagnosticsProps {
  onCreateWindow: (windowType: string) => void;
}
