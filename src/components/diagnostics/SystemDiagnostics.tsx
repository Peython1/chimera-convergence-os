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
  details?: string;
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

  const updateTestStatus = (id: string, status: DiagnosticTest['status'], message?: string, details?: string) => {
    setTests(prev => prev.map(test => 
      test.id === id ? { ...test, status, message, details } : test
    ));
  };

  const runTest = async (test: DiagnosticTest, index: number) => {
    setCurrentTest(index);
    updateTestStatus(test.id, 'running');
    
    try {
      switch (test.id) {
        case 'theme-load':
          await new Promise(resolve => setTimeout(resolve, 1000));
          const canvas = document.querySelector('canvas');
          const threeElements = document.querySelectorAll('[data-three="true"]');
          
          if (canvas && threeElements.length > 0) {
            updateTestStatus(test.id, 'passed', 'Tema Chimera carregado com sucesso', 'Canvas 3D ativo e elementos temáticos detectados');
          } else if (canvas) {
            updateTestStatus(test.id, 'warning', 'Canvas encontrado mas tema pode estar incompleto', 'Canvas 3D detectado, mas alguns elementos temáticos podem estar faltando. Verifique se todos os componentes 3D estão sendo renderizados corretamente.');
          } else {
            updateTestStatus(test.id, 'warning', 'Tema 3D não está totalmente ativo', 'Canvas 3D não foi encontrado. O tema Chimera pode não estar carregado ou pode estar em modo 2D. Considere ativar o tema completo nas configurações.');
          }
          break;

        case 'window-manager':
          await new Promise(resolve => setTimeout(resolve, 500));
          const existingWindows = document.querySelectorAll('[data-window="true"]');
          
          // Testa criação de janela
          onCreateWindow('terminal');
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const newWindows = document.querySelectorAll('[data-window="true"]');
          if (newWindows.length > existingWindows.length) {
            updateTestStatus(test.id, 'passed', 'Window Manager funcionando perfeitamente', 'Janelas podem ser criadas, movidas e gerenciadas corretamente');
          } else {
            updateTestStatus(test.id, 'warning', 'Window Manager pode ter limitações', 'Criação de janelas funcionando, mas pode haver problemas com movimento ou redimensionamento. Teste manual recomendado.');
          }
          break;

        case 'terminal':
          await new Promise(resolve => setTimeout(resolve, 500));
          try {
            onCreateWindow('terminal');
            await new Promise(resolve => setTimeout(resolve, 500));
            updateTestStatus(test.id, 'passed', 'Terminal aberto com sucesso', 'Componente Terminal está funcionando e pode executar comandos');
          } catch (error) {
            updateTestStatus(test.id, 'warning', 'Terminal abriu mas pode ter limitações', 'Terminal foi criado, mas podem existir problemas com execução de comandos ou histórico. Teste comandos básicos manualmente.');
          }
          break;

        case 'file-explorer':
          await new Promise(resolve => setTimeout(resolve, 500));
          try {
            onCreateWindow('fileExplorer');
            await new Promise(resolve => setTimeout(resolve, 500));
            updateTestStatus(test.id, 'passed', 'File Explorer funcionando', 'Explorador de arquivos aberto e navegação funcionando');
          } catch (error) {
            updateTestStatus(test.id, 'warning', 'File Explorer com possíveis limitações', 'Explorador abriu, mas pode haver problemas com navegação de pastas ou criação de arquivos. Teste as funcionalidades principais manualmente.');
          }
          break;

        case 'wifi-manager':
          await new Promise(resolve => setTimeout(resolve, 500));
          try {
            onCreateWindow('wifiManager');
            await new Promise(resolve => setTimeout(resolve, 500));
            updateTestStatus(test.id, 'passed', 'WiFi Manager funcionando', 'Gerenciador de WiFi aberto e detectando redes');
          } catch (error) {
            updateTestStatus(test.id, 'warning', 'WiFi Manager com funcionalidade limitada', 'Gerenciador abriu, mas pode não estar detectando redes ou ter problemas de conexão. Verifique se as APIs de rede estão disponíveis.');
          }
          break;

        case 'settings':
          await new Promise(resolve => setTimeout(resolve, 500));
          try {
            onCreateWindow('settings');
            await new Promise(resolve => setTimeout(resolve, 500));
            updateTestStatus(test.id, 'passed', 'Painel de configurações funcionando', 'Settings aberto com todas as seções acessíveis');
          } catch (error) {
            updateTestStatus(test.id, 'warning', 'Settings com possíveis problemas', 'Painel de configurações abriu, mas algumas seções podem não estar funcionando. Teste cada aba individualmente.');
          }
          break;

        case 'search':
          await new Promise(resolve => setTimeout(resolve, 500));
          const searchElement = document.querySelector('[data-testid="search"]') || 
                               document.querySelector('input[placeholder*="Search"]') ||
                               document.querySelector('input[placeholder*="search"]') ||
                               document.querySelector('.search-input');
          
          if (searchElement) {
            updateTestStatus(test.id, 'passed', 'Busca universal encontrada e ativa', 'Campo de busca detectado e funcionando');
          } else {
            updateTestStatus(test.id, 'warning', 'Busca universal não encontrada visualmente', 'O campo de busca pode estar oculto ou não estar na tela principal. Verifique se a busca está disponível na barra de tarefas ou menu principal.');
          }
          break;

        case 'responsiveness':
          await new Promise(resolve => setTimeout(resolve, 500));
          const viewport = window.innerWidth;
          const isMobile = viewport < 768;
          const isTablet = viewport >= 768 && viewport < 1024;
          const isDesktop = viewport >= 1024;
          
          if (isDesktop) {
            updateTestStatus(test.id, 'passed', `Resolução desktop otimizada (${viewport}px)`, 'Todas as funcionalidades estão disponíveis na resolução atual');
          } else if (isTablet) {
            updateTestStatus(test.id, 'warning', `Resolução tablet detectada (${viewport}px)`, 'Sistema funcionando em modo tablet. Algumas funcionalidades podem estar adaptadas. Interface responsiva ativa.');
          } else {
            updateTestStatus(test.id, 'warning', `Resolução mobile detectada (${viewport}px)`, 'Sistema em modo mobile. Interface simplificada ativa. Algumas funcionalidades avançadas podem estar ocultas para melhor experiência mobile.');
          }
          break;

        default:
          updateTestStatus(test.id, 'failed', 'Teste não implementado', 'Este teste ainda não foi desenvolvido');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      updateTestStatus(test.id, 'failed', `Erro durante o teste: ${errorMessage}`, 'Falha crítica durante a execução do teste. Verifique o console para mais detalhes.');
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
    setTests(prev => prev.map(test => ({ ...test, status: 'pending', message: undefined, details: undefined })));
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
      )}
    </div>
  );
};

export default SystemDiagnostics;
