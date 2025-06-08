
import { useState, useCallback } from 'react';
import { FileSystemItem, FileExplorerState } from '../types';
import { generateId } from '@/lib/utils';

const initialFileSystem: FileSystemItem[] = [
  {
    id: 'home',
    name: 'Home',
    type: 'folder',
    dateCreated: new Date('2024-01-01'),
    dateModified: new Date('2024-01-01'),
  },
  {
    id: 'documents',
    name: 'Documents',
    type: 'folder',
    parent: 'home',
    dateCreated: new Date('2024-01-01'),
    dateModified: new Date('2024-01-01'),
  },
  {
    id: 'downloads',
    name: 'Downloads',
    type: 'folder',
    parent: 'home',
    dateCreated: new Date('2024-01-01'),
    dateModified: new Date('2024-01-01'),
  },
  {
    id: 'pictures',
    name: 'Pictures',
    type: 'folder',
    parent: 'home',
    dateCreated: new Date('2024-01-01'),
    dateModified: new Date('2024-01-01'),
  },
  {
    id: 'readme',
    name: 'README.txt',
    type: 'file',
    parent: 'home',
    size: 1024,
    content: 'Welcome to Chimera OS!\n\nThis is your home directory.',
    dateCreated: new Date('2024-01-01'),
    dateModified: new Date('2024-01-01'),
  },
];

export const useFileSystem = () => {
  const [fileSystem, setFileSystem] = useState<FileSystemItem[]>(initialFileSystem);
  const [state, setState] = useState<FileExplorerState>({
    currentPath: 'home',
    items: [],
    selectedItems: [],
    viewMode: 'list',
    sortBy: 'name',
    sortOrder: 'asc',
  });

  const getCurrentItems = useCallback(() => {
    return fileSystem.filter(item => item.parent === state.currentPath);
  }, [fileSystem, state.currentPath]);

  const navigateToPath = useCallback((path: string) => {
    setState(prev => ({
      ...prev,
      currentPath: path,
      selectedItems: [],
    }));
  }, []);

  const createFolder = useCallback((name: string) => {
    const newFolder: FileSystemItem = {
      id: generateId(),
      name,
      type: 'folder',
      parent: state.currentPath,
      dateCreated: new Date(),
      dateModified: new Date(),
    };

    setFileSystem(prev => [...prev, newFolder]);
  }, [state.currentPath]);

  const createFile = useCallback((name: string, content: string = '') => {
    const newFile: FileSystemItem = {
      id: generateId(),
      name,
      type: 'file',
      parent: state.currentPath,
      size: content.length,
      content,
      dateCreated: new Date(),
      dateModified: new Date(),
    };

    setFileSystem(prev => [...prev, newFile]);
  }, [state.currentPath]);

  const deleteItem = useCallback((id: string) => {
    setFileSystem(prev => prev.filter(item => item.id !== id));
    setState(prev => ({
      ...prev,
      selectedItems: prev.selectedItems.filter(selectedId => selectedId !== id),
    }));
  }, []);

  const selectItem = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      selectedItems: prev.selectedItems.includes(id)
        ? prev.selectedItems.filter(selectedId => selectedId !== id)
        : [...prev.selectedItems, id],
    }));
  }, []);

  const setViewMode = useCallback((viewMode: 'list' | 'grid') => {
    setState(prev => ({ ...prev, viewMode }));
  }, []);

  const setSorting = useCallback((sortBy: FileExplorerState['sortBy'], sortOrder: FileExplorerState['sortOrder']) => {
    setState(prev => ({ ...prev, sortBy, sortOrder }));
  }, []);

  return {
    state,
    currentItems: getCurrentItems(),
    navigateToPath,
    createFolder,
    createFile,
    deleteItem,
    selectItem,
    setViewMode,
    setSorting,
    fileSystem,
  };
};
