// Tipos de resultados de pesquisa
export type SearchResultType = 'app' | 'file' | 'setting' | 'web';

export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  type: SearchResultType;
  action?: string; // nome da janela/ação a ser aberta
}

// Dados simulados para pesquisa
const apps: SearchResult[] = [
  { id: 'terminal', title: 'Terminal', type: 'app', action: 'terminal', description: 'Command line interface' },
  { id: 'fileexplorer', title: 'File Explorer', type: 'app', action: 'fileExplorer', description: 'Browse files and folders' },
  { id: 'settings', title: 'Settings', type: 'app', action: 'settings', description: 'System configuration' },
  { id: 'store', title: 'App Store', type: 'app', action: 'store', description: 'Download applications' },
  { id: 'systemmonitor', title: 'System Monitor', type: 'app', action: 'systemMonitor', description: 'View system performance' },
  { id: 'wifimanager', title: 'Wi-Fi Manager', type: 'app', action: 'wifiManager', description: 'Configure network connections' },
  { id: 'projectplan', title: 'Project Plan', type: 'app', action: 'projectplan', description: 'ChimeraOS project plan' },
  { id: 'implementation', title: 'Implementation', type: 'app', action: 'implementation', description: 'Technical implementation details' }
];

const files: SearchResult[] = [
  { id: 'doc1', title: 'Project Report.docx', type: 'file', description: 'Documents/Work/' },
  { id: 'img1', title: 'Profile Picture.jpg', type: 'file', description: 'Pictures/' },
  { id: 'code1', title: 'index.ts', type: 'file', description: 'Projects/ChimeraOS/' },
  { id: 'data1', title: 'config.json', type: 'file', description: 'System/' }
];

const settings: SearchResult[] = [
  { id: 'set1', title: 'Display Settings', type: 'setting', description: 'Adjust resolution and brightness', action: 'settings' },
  { id: 'set2', title: 'Network & Internet', type: 'setting', description: 'Wi-Fi, VPN and proxy', action: 'wifiManager' },
  { id: 'set3', title: 'System Security', type: 'setting', description: 'Firewall and encryption', action: 'settings' },
  { id: 'set4', title: 'Appearance', type: 'setting', description: 'Themes and colors', action: 'settings' }
];

const webResultsData: SearchResult[] = [
  { id: 'web1', title: 'ChimeraOS Documentation', type: 'web', description: 'Official documentation' },
  { id: 'web2', title: 'Chimera Forums', type: 'web', description: 'Community support' },
  { id: 'web3', title: 'ChimeraOS GitHub', type: 'web', description: 'Source code repository' }
];

// Função de pesquisa principal
export const universalSearch = (query: string): SearchResult[] => {
  if (!query || query.trim() === '') {
    return [];
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  
  // Pesquisar em todas as fontes
  const appResults = apps.filter(app => 
    app.title.toLowerCase().includes(normalizedQuery) || 
    (app.description && app.description.toLowerCase().includes(normalizedQuery))
  );
  
  const fileResults = files.filter(file => 
    file.title.toLowerCase().includes(normalizedQuery) || 
    (file.description && file.description.toLowerCase().includes(normalizedQuery))
  );
  
  const settingResults = settings.filter(setting => 
    setting.title.toLowerCase().includes(normalizedQuery) || 
    (setting.description && setting.description.toLowerCase().includes(normalizedQuery))
  );
  
  const webResults = webResultsData.filter(web => 
    web.title.toLowerCase().includes(normalizedQuery) || 
    (web.description && web.description.toLowerCase().includes(normalizedQuery))
  );
  
  // Combinar e ordenar por relevância (aqui simplificamos, mas isso poderia ser mais sofisticado)
  const allResults = [
    ...appResults.map(r => ({ ...r, score: 10 })), // Aplicativos com maior prioridade
    ...settingResults.map(r => ({ ...r, score: 8 })),
    ...fileResults.map(r => ({ ...r, score: 5 })),
    ...webResults.map(r => ({ ...r, score: 3 }))
  ];
  
  // Ordenar por pontuação
  return allResults
    .sort((a, b) => b.score - a.score)
    .map(({ score, ...item }) => item);
};
