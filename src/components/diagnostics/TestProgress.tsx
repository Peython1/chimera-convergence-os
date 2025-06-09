
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { DiagnosticTest } from './types';

interface TestProgressProps {
  tests: DiagnosticTest[];
}

const TestProgress: React.FC<TestProgressProps> = ({ tests }) => {
  const passedCount = tests.filter(t => t.status === 'passed').length;
  const failedCount = tests.filter(t => t.status === 'failed').length;
  const warningCount = tests.filter(t => t.status === 'warning').length;
  const completedCount = tests.filter(t => t.status !== 'pending' && t.status !== 'running').length;
  const progress = (completedCount / tests.length) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Progresso dos Testes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} className="w-full" />
        
        <div className="flex justify-between text-sm">
          <span>Progresso: {completedCount}/{tests.length}</span>
          <span>{Math.round(progress)}% completo</span>
        </div>
        
        <div className="flex gap-4 text-sm">
          <span className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            {passedCount} passou
          </span>
          <span className="flex items-center gap-1">
            <AlertCircle className="w-4 h-4 text-yellow-500" />
            {warningCount} atenção
          </span>
          <span className="flex items-center gap-1">
            <XCircle className="w-4 h-4 text-red-500" />
            {failedCount} falhou
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestProgress;
