
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { DiagnosticTest } from './types';

interface TestResultsProps {
  tests: DiagnosticTest[];
  currentTest: number;
}

const TestResults: React.FC<TestResultsProps> = ({ tests, currentTest }) => {
  const getStatusIcon = (status: DiagnosticTest['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'running':
        return <div className="w-4 h-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />;
      default:
        return <div className="w-4 h-4 rounded-full border-2 border-gray-300" />;
    }
  };

  const getStatusBadge = (status: DiagnosticTest['status']) => {
    const colors = {
      pending: 'bg-gray-100 text-gray-600',
      running: 'bg-blue-100 text-blue-600',
      passed: 'bg-green-100 text-green-600',
      failed: 'bg-red-100 text-red-600',
      warning: 'bg-yellow-100 text-yellow-600'
    };

    return (
      <Badge className={colors[status]}>
        {status === 'pending' && 'Pendente'}
        {status === 'running' && 'Executando'}
        {status === 'passed' && 'Passou'}
        {status === 'failed' && 'Falhou'}
        {status === 'warning' && 'Atenção'}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resultados dos Testes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tests.map((test, index) => (
            <div 
              key={test.id}
              className={`flex flex-col p-4 rounded-lg border transition-colors ${
                currentTest === index ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(test.status)}
                  <div>
                    <div className="font-medium">{test.name}</div>
                    <div className="text-sm text-muted-foreground">{test.description}</div>
                  </div>
                </div>
                {getStatusBadge(test.status)}
              </div>
              
              {test.message && (
                <div className="mt-3 p-3 bg-white rounded border-l-4 border-l-blue-500">
                  <div className="font-medium text-sm text-blue-900">{test.message}</div>
                  {test.details && (
                    <div className="text-xs text-blue-700 mt-1">{test.details}</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TestResults;
