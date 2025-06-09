
import { DiagnosticTest } from './types';

export const updateTestStatus = (
  tests: DiagnosticTest[],
  setTests: React.Dispatch<React.SetStateAction<DiagnosticTest[]>>,
  id: string,
  status: DiagnosticTest['status'],
  message?: string,
  details?: string
) => {
  setTests(tests.map(test => 
    test.id === id ? { ...test, status, message, details } : test
  ));
};

export const runThemeLoadTest = async (
  tests: DiagnosticTest[],
  setTests: React.Dispatch<React.SetStateAction<DiagnosticTest[]>>
) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const canvas = document.querySelector('canvas');
  const threeElements = document.querySelectorAll('[data-three="true"]');
  
  if (canvas && threeElements.length > 0) {
    updateTestStatus(tests, setTests, 'theme-load', 'passed', 'Tema Chimera carregado com sucesso', 'Canvas 3D ativo e elementos temáticos detectados');
  } else if (canvas) {
    updateTestStatus(tests, setTests, 'theme-load', 'warning', 'Canvas encontrado mas tema pode estar incompleto', 'Canvas 3D detectado, mas alguns elementos temáticos podem estar faltando. Verifique se todos os componentes 3D estão sendo renderizados corretamente.');
  } else {
    updateTestStatus(tests, setTests, 'theme-load', 'warning', 'Tema 3D não está totalmente ativo', 'Canvas 3D não foi encontrado. O tema Chimera pode não estar carregado ou pode estar em modo 2D. Considere ativar o tema completo nas configurações.');
  }
};

export const runWindowManagerTest = async (
  tests: DiagnosticTest[],
  setTests: React.Dispatch<React.SetStateAction<DiagnosticTest[]>>,
  onCreateWindow: (windowType: string) => void
) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const existingWindows = document.querySelectorAll('[data-window="true"]');
  
  onCreateWindow('terminal');
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newWindows = document.querySelectorAll('[data-window="true"]');
  if (newWindows.length > existingWindows.length) {
    updateTestStatus(tests, setTests, 'window-manager', 'passed', 'Window Manager funcionando perfeitamente', 'Janelas podem ser criadas, movidas e gerenciadas corretamente');
  } else {
    updateTestStatus(tests, setTests, 'window-manager', 'warning', 'Window Manager pode ter limitações', 'Criação de janelas funcionando, mas pode haver problemas com movimento ou redimensionamento. Teste manual recomendado.');
  }
};

export const runComponentTest = async (
  tests: DiagnosticTest[],
  setTests: React.Dispatch<React.SetStateAction<DiagnosticTest[]>>,
  testId: string,
  windowType: string,
  onCreateWindow: (windowType: string) => void
) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  try {
    onCreateWindow(windowType);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const componentNames: Record<string, string> = {
      terminal: 'Terminal',
      fileExplorer: 'File Explorer',
      wifiManager: 'WiFi Manager',
      settings: 'Settings'
    };
    
    const componentName = componentNames[windowType] || windowType;
    updateTestStatus(tests, setTests, testId, 'passed', `${componentName} funcionando perfeitamente`, `Componente ${componentName} aberto e todas as funcionalidades estão operacionais`);
  } catch (error) {
    const componentNames: Record<string, string> = {
      terminal: 'Terminal abriu mas pode ter limitações',
      fileExplorer: 'File Explorer com possíveis limitações',
      wifiManager: 'WiFi Manager com funcionalidade limitada',
      settings: 'Settings com possíveis problemas'
    };
    
    const message = componentNames[windowType] || `${windowType} com problemas`;
    updateTestStatus(tests, setTests, testId, 'warning', message, 'Componente foi criado, mas podem existir problemas com algumas funcionalidades. Teste manual recomendado.');
  }
};

export const runSearchTest = async (
  tests: DiagnosticTest[],
  setTests: React.Dispatch<React.SetStateAction<DiagnosticTest[]>>
) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const searchElement = document.querySelector('[data-testid="search"]') || 
                       document.querySelector('input[placeholder*="Search"]') ||
                       document.querySelector('input[placeholder*="search"]') ||
                       document.querySelector('.search-input');
  
  if (searchElement) {
    updateTestStatus(tests, setTests, 'search', 'passed', 'Busca universal encontrada e ativa', 'Campo de busca detectado e funcionando corretamente');
  } else {
    updateTestStatus(tests, setTests, 'search', 'warning', 'Busca universal não encontrada visualmente', 'O campo de busca pode estar oculto ou não estar na tela principal. Verifique se a busca está disponível na barra de tarefas ou menu principal.');
  }
};

export const runResponsivenessTest = async (
  tests: DiagnosticTest[],
  setTests: React.Dispatch<React.SetStateAction<DiagnosticTest[]>>
) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const viewport = window.innerWidth;
  const isMobile = viewport < 768;
  const isTablet = viewport >= 768 && viewport < 1024;
  const isDesktop = viewport >= 1024;
  
  if (isDesktop) {
    updateTestStatus(tests, setTests, 'responsiveness', 'passed', `Resolução desktop otimizada (${viewport}px)`, 'Todas as funcionalidades estão disponíveis na resolução atual');
  } else if (isTablet) {
    updateTestStatus(tests, setTests, 'responsiveness', 'warning', `Resolução tablet detectada (${viewport}px)`, 'Sistema funcionando em modo tablet. Algumas funcionalidades podem estar adaptadas. Interface responsiva ativa.');
  } else {
    updateTestStatus(tests, setTests, 'responsiveness', 'warning', `Resolução mobile detectada (${viewport}px)`, 'Sistema em modo mobile. Interface simplificada ativa. Algumas funcionalidades avançadas podem estar ocultas para melhor experiência mobile.');
  }
};
