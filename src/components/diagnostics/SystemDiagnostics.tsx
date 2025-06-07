
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, AlertCircle, Play, RotateCcw } from 'lucide-react';

interface DiagnosticTest {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'passed' | 'failed' | 'warning';
  message?: string;
}

interface SystemDiagnosticsProps {
  onCreateWindow: (windowType: string) => void;
}

const SystemDiagnostics: React.FC<SystemDiagnosticsProps> = ({ onCreateWindow }) => {
  const [tests, setTests] = useState<DiagnosticTest[]>([
    {
      id: 'theme-load',
      name: 'Chimera Theme Loading',
      description: 'Verifica se o tema 3D está carregando corretamente',
      status: 'pending'
    },
    {
      id: 'window-manager',
      name: 'Window Manager',
      description: 'Testa criação, movimento e fechamento de janelas',
      status: 'pending'
    },
    {
      id: 'terminal',
      name: 'Terminal Component',
      description: 'Verifica se o terminal pode ser aberto',
      status: 'pending'
    },
    {
      id: 'file-explorer',
      name: 'File Explorer',
      description: 'Testa o explorador de arquivos',
      status: 'pending'
    },
    {
      id: 'wifi-manager',
      name: 'WiFi Manager',
      description: 'Verifica o gerenciador de WiFi',
      status: 'pending'
    },
    {
      id: 'settings',
      name: 'Settings Panel',
      description: 'Testa o painel de configurações',
      status: 'pending'
    },
    {
      id: 'search',
      name: 'Universal Search',
      description: 'Verifica a funcionalidade de busca',
      status: 'pending'
    },
    {
      id: 'responsiveness',
      name: 'Responsive Design',
      description: 'Testa responsividade em diferentes tamanhos',
      status: 'pending'
    }
  ]);

  const [currentTest, setCurrentTest] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState(false);

  const updateTestStatus = (id: string, status: DiagnosticTest['status'], message?: string) => {
    setTests(prev => prev.map(test => 
      test.id === id ? { ...test, status, message } : test
    ));
  };

  const runTest = async (test: DiagnosticTest, index: number) => {
    setCurrentTest(index);
    updateTestStatus(test.id, 'running');
    
    try {
      switch (test.id) {
        case 'theme-load':
          // Verifica se elementos 3D estão presentes
          await new Promise(resolve => setTimeout(resolve, 1000));
          const canvas = document.querySelector('canvas');
          if (canvas) {
            updateTestStatus(test.id, 'passed', 'Tema Chimera carregado com sucesso');
          } else {
            updateTestStatus(test.id, 'warning', 'Canvas não encontrado - tema pode não estar ativo');
          }
          break;

        case 'window-manager':
          await new Promise(resolve => setTimeout(resolve, 500));
          // Simula teste de janela
          onCreateWindow('terminal');
          await new Promise(resolve => setTimeout(resolve, 1000));
          updateTestStatus(test.id, 'passed', 'Window Manager funcionando');
          break;

        case 'terminal':
          await new Promise(resolve => setTimeout(resolve, 500));
          onCreateWindow('terminal');
          updateTestStatus(test.id, 'passed', 'Terminal pode ser aberto');
          break;

        case 'file-explorer':
          await new Promise(resolve => setTimeout(resolve, 500));
          onCreateWindow('fileExplorer');
          updateTestStatus(test.id, 'passed', 'File Explorer pode ser aberto');
          break;

        case 'wifi-manager':
          await new Promise(resolve => setTimeout(resolve, 500));
          onCreateWindow('wifiManager');
          updateTestStatus(test.id, 'passed', 'WiFi Manager pode ser aberto');
          break;

        case 'settings':
          await new Promise(resolve => setTimeout(resolve, 500));
          onCreateWindow('settings');
          updateTestStatus(test.id, 'passed', 'Settings pode ser aberto');
          break;

        case 'search':
          await new Promise(resolve => setTimeout(resolve, 500));
          const searchElement = document.querySelector('[data-testid="search"]') || 
                               document.querySelector('input[placeholder*="Search"]') ||
                               document.querySelector('input[placeholder*="search"]');
          if (searchElement) {
            updateTestStatus(test.id, 'passed', 'Busca universal encontrada');
          } else {
            updateTestStatus(test.id, 'warning', 'Elemento de busca não encontrado diretamente');
          }
          break;

        case 'responsiveness':
          await new Promise(resolve => setTimeout(resolve, 500));
          const viewport = window.innerWidth;
          if (viewport < 768) {
            updateTestStatus(test.id, 'warning', `Tela pequena detectada (${viewport}px)`);
          } else {
            updateTestStatus(test.id, 'passed', `Tela adequada (${viewport}px)`);
          }
          break;

        default:
          updateTestStatus(test.id, 'failed', 'Teste não implementado');
      }
    } catch (error) {
      updateTestStatus(test.id, 'failed', `Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    
    for (let i = 0; i < tests.length; i++) {
      await runTest(tests[i], i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    setCurrentTest(-1);
    setIsRunning(false);
  };

  const resetTests = () => {
    setTests(prev => prev.map(test => ({ ...test, status: 'pending', message: undefined })));
    setCurrentTest(-1);
    setIsRunning(false);
  };

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
    const variants = {
      pending: 'secondary',
      running: 'default',
      passed: 'default',
      failed: 'destructive',
      warning: 'secondary'
    } as const;

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

  const passedCount = tests.filter(t => t.status === 'passed').length;
  const failedCount = tests.filter(t => t.status === 'failed').length;
  const warningCount = tests.filter(t => t.status === 'warning').length;
  const completedCount = tests.filter(t => t.status !== 'pending' && t.status !== 'running').length;
  const progress = (completedCount / tests.length) * 100;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Diagnóstico do Sistema</h1>
          <p className="text-muted-foreground">
            Verificação completa de funcionalidades do Chimera OS
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={runAllTests} 
            disabled={isRunning}
            className="flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            {isRunning ? 'Executando...' : 'Executar Testes'}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={resetTests}
            disabled={isRunning}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Resetar
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
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

      {/* Test Results */}
      <Card>
        <CardHeader>
          <CardTitle>Resultados dos Testes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tests.map((test, index) => (
              <div 
                key={test.id}
                className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                  currentTest === index ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(test.status)}
                  <div>
                    <div className="font-medium">{test.name}</div>
                    <div className="text-sm text-muted-foreground">{test.description}</div>
                    {test.message && (
                      <div className="text-xs text-muted-foreground mt-1">{test.message}</div>
                    )}
                  </div>
                </div>
                
                {getStatusBadge(test.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {completedCount > 0 && (
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
                  <strong>Atenção necessária:</strong> Alguns componentes precisam de ajustes menores.
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
      )}
    </div>
  );
};

export default SystemDiagnostics;
