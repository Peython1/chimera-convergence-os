
import { useState, useCallback } from 'react';
import { AppInfo, AppCategory, StoreState } from '../types';
import { generateId } from '@/lib/utils';

const defaultCategories: AppCategory[] = [
  { id: 'productivity', name: 'Productivity', icon: '⚡', color: 'bg-blue-500' },
  { id: 'games', name: 'Games', icon: '🎮', color: 'bg-purple-500' },
  { id: 'development', name: 'Development', icon: '💻', color: 'bg-green-500' },
  { id: 'multimedia', name: 'Multimedia', icon: '🎵', color: 'bg-red-500' },
  { id: 'utilities', name: 'Utilities', icon: '🔧', color: 'bg-orange-500' },
  { id: 'education', name: 'Education', icon: '📚', color: 'bg-indigo-500' },
];

const defaultApps: AppInfo[] = [
  {
    id: generateId(),
    name: 'Code Editor',
    description: 'A powerful code editor with syntax highlighting and extensions support.',
    icon: '📝',
    version: '1.0.0',
    size: '45 MB',
    rating: 4.8,
    downloads: 15420,
    category: 'development',
    developer: 'Chimera Dev Team',
    screenshots: [],
    isInstalled: false,
    isSystemApp: false,
    price: 0,
    releaseDate: new Date('2024-01-15'),
    lastUpdated: new Date('2024-03-01'),
  },
  {
    id: generateId(),
    name: 'Media Player',
    description: 'Play all your favorite music and videos with this versatile media player.',
    icon: '🎬',
    version: '2.1.3',
    size: '32 MB',
    rating: 4.6,
    downloads: 8930,
    category: 'multimedia',
    developer: 'MediaWorks Inc.',
    screenshots: [],
    isInstalled: true,
    isSystemApp: false,
    price: 0,
    releaseDate: new Date('2023-11-20'),
    lastUpdated: new Date('2024-02-15'),
  },
  {
    id: generateId(),
    name: 'Calculator Pro',
    description: 'Advanced calculator with scientific functions and graphing capabilities.',
    icon: '🧮',
    version: '1.5.2',
    size: '12 MB',
    rating: 4.9,
    downloads: 25670,
    category: 'utilities',
    developer: 'MathTools Ltd.',
    screenshots: [],
    isInstalled: false,
    isSystemApp: false,
    price: 2.99,
    releaseDate: new Date('2023-08-10'),
    lastUpdated: new Date('2024-01-20'),
  },
  {
    id: generateId(),
    name: 'Puzzle Master',
    description: 'Challenge your mind with hundreds of puzzles and brain teasers.',
    icon: '🧩',
    version: '3.0.1',
    size: '78 MB',
    rating: 4.4,
    downloads: 12450,
    category: 'games',
    developer: 'Fun Games Studio',
    screenshots: [],
    isInstalled: false,
    isSystemApp: false,
    price: 4.99,
    releaseDate: new Date('2023-12-05'),
    lastUpdated: new Date('2024-02-28'),
  },
];

export const useAppStore = () => {
  const [state, setState] = useState<StoreState>({
    apps: defaultApps,
    categories: defaultCategories,
    installedApps: defaultApps.filter(app => app.isInstalled).map(app => app.id),
    searchTerm: '',
    selectedCategory: null,
    sortBy: 'downloads',
    sortOrder: 'desc',
  });

  const getFilteredApps = useCallback(() => {
    let filtered = state.apps;

    // Filter by search term
    if (state.searchTerm) {
      filtered = filtered.filter(app =>
        app.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        app.description.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (state.selectedCategory) {
      filtered = filtered.filter(app => app.category === state.selectedCategory);
    }

    // Sort apps
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (state.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'downloads':
          comparison = a.downloads - b.downloads;
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
      }

      return state.sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [state]);

  const installApp = useCallback((appId: string) => {
    setState(prev => ({
      ...prev,
      apps: prev.apps.map(app =>
        app.id === appId ? { ...app, isInstalled: true } : app
      ),
      installedApps: [...prev.installedApps, appId],
    }));
  }, []);

  const uninstallApp = useCallback((appId: string) => {
    setState(prev => ({
      ...prev,
      apps: prev.apps.map(app =>
        app.id === appId ? { ...app, isInstalled: false } : app
      ),
      installedApps: prev.installedApps.filter(id => id !== appId),
    }));
  }, []);

  const setSearchTerm = useCallback((term: string) => {
    setState(prev => ({ ...prev, searchTerm: term }));
  }, []);

  const setSelectedCategory = useCallback((categoryId: string | null) => {
    setState(prev => ({ ...prev, selectedCategory: categoryId }));
  }, []);

  const setSorting = useCallback((sortBy: StoreState['sortBy'], sortOrder: StoreState['sortOrder']) => {
    setState(prev => ({ ...prev, sortBy, sortOrder }));
  }, []);

  return {
    state,
    filteredApps: getFilteredApps(),
    installApp,
    uninstallApp,
    setSearchTerm,
    setSelectedCategory,
    setSorting,
  };
};
