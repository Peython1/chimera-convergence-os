
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DiagnosticTest } from './types';

interface TestRecommendationsProps {
  tests: DiagnosticTest[];
}

const TestRecommendations: React.FC<TestRecommendationsProps> = ({ tests }) => {
  const passedCount = tests.filter(t => t.status === 'passed').length;
  const failedCount = tests.filter(t => t.status === 'failed').length;
  const warningCount = tests.filter(t => t.status === 'warning').length;
  const completedCount = tests.filter(t => t.status !== 'pending' && t.status !== 'running').length;

  if (completedCount === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recomendações</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          {failedCount > 0 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <strong>Problemas críticos encontrados:</strong> Alguns componentes falharam nos testes. 
              Revise os erros antes de colocar em produção.
            </div>
          )}
          
          {warningCount > 0 && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <strong>Atenção necessária:</strong> Alguns componentes precisam de ajustes menores ou podem ter funcionalidade limitada. 
              Verifique os detalhes de cada aviso para mais informações.
            </div>
          )}
          
          {passedCount === tests.length && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <strong>Excelente!</strong> Todos os testes passaram. O sistema está pronto para uso.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TestRecommendations;
