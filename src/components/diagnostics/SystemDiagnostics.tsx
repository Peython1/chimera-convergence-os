
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw } from 'lucide-react';
import { DiagnosticTest, SystemDiagnosticsProps } from './types';
import { 
  runThemeLoadTest, 
  runWindowManagerTest, 
  runComponentTest, 
  runSearchTest, 
  runResponsivenessTest,
  updateTestStatus
} from './testRunners';
import TestProgress from './TestProgress';
import TestResults from './TestResults';
import TestRecommendations from './TestRecommendations';

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

  const runTest = async (test: DiagnosticTest, index: number) => {
    setCurrentTest(index);
    updateTestStatus(tests, setTests, test.id, 'running');
    
    try {
      switch (test.id) {
        case 'theme-load':
          await runThemeLoadTest(tests, setTests);
          break;
        case 'window-manager':
          await runWindowManagerTest(tests, setTests, onCreateWindow);
          break;
        case 'terminal':
          await runComponentTest(tests, setTests, test.id, 'terminal', onCreateWindow);
          break;
        case 'file-explorer':
          await runComponentTest(tests, setTests, test.id, 'fileExplorer', onCreateWindow);
          break;
        case 'wifi-manager':
          await runComponentTest(tests, setTests, test.id, 'wifiManager', onCreateWindow);
          break;
        case 'settings':
          await runComponentTest(tests, setTests, test.id, 'settings', onCreateWindow);
          break;
        case 'search':
          await runSearchTest(tests, setTests);
          break;
        case 'responsiveness':
          await runResponsivenessTest(tests, setTests);
          break;
        default:
          updateTestStatus(tests, setTests, test.id, 'failed', 'Teste não implementado', 'Este teste ainda não foi desenvolvido');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      updateTestStatus(tests, setTests, test.id, 'failed', `Erro durante o teste: ${errorMessage}`, 'Falha crítica durante a execução do teste. Verifique o console para mais detalhes.');
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

      <TestProgress tests={tests} />
      <TestResults tests={tests} currentTest={currentTest} />
      <TestRecommendations tests={tests} />
    </div>
  );
};

export default SystemDiagnostics;
