
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Folder, 
  File, 
  Home, 
  ArrowLeft, 
  ArrowRight, 
  Plus, 
  Trash2, 
  Grid3X3, 
  List,
  Search
} from 'lucide-react';
import { useFileSystem } from './hooks/useFileSystem';
import { FileSystemItem } from './types';
import { Badge } from '@/components/ui/badge';

const FileExplorer: React.FC = () => {
  const {
    state,
    currentItems,
    navigateToPath,
    createFolder,
    createFile,
    deleteItem,
    selectItem,
    setViewMode,
    fileSystem,
  } = useFileSystem();

  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [createType, setCreateType] = useState<'file' | 'folder'>('folder');
  const [createName, setCreateName] = useState('');

  const getCurrentPath = () => {
    const pathParts = [];
    let currentId = state.currentPath;
    
    while (currentId) {
      const item = fileSystem.find(item => item.id === currentId);
      if (item) {
        pathParts.unshift(item);
        currentId = item.parent || '';
      } else {
        break;
      }
    }
    
    return pathParts;
  };

  const filteredItems = currentItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    if (!createName.trim()) return;
    
    if (createType === 'folder') {
      createFolder(createName);
    } else {
      createFile(createName);
    }
    
    setCreateName('');
    setShowCreateDialog(false);
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const pathParts = getCurrentPath();
              if (pathParts.length > 1) {
                navigateToPath(pathParts[pathParts.length - 2].id);
              }
            }}
          >
            <ArrowLeft size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateToPath('home')}
          >
            <Home size={16} />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            <Input
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode('list')}
            className={state.viewMode === 'list' ? 'bg-gray-200' : ''}
          >
            <List size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode('grid')}
            className={state.viewMode === 'grid' ? 'bg-gray-200' : ''}
          >
            <Grid3X3 size={16} />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCreateDialog(true)}
          >
            <Plus size={16} className="mr-1" />
            New
          </Button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center p-2 text-sm text-gray-600 border-b">
        {getCurrentPath().map((item, index) => (
          <React.Fragment key={item.id}>
            {index > 0 && <span className="mx-1">/</span>}
            <button
              onClick={() => navigateToPath(item.id)}
              className="hover:text-blue-600 hover:underline"
            >
              {item.name}
            </button>
          </React.Fragment>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto">
        {state.viewMode === 'list' ? (
          <div className="space-y-1">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 ${
                  state.selectedItems.includes(item.id) ? 'bg-blue-50 border border-blue-200' : ''
                }`}
                onClick={() => selectItem(item.id)}
                onDoubleClick={() => {
                  if (item.type === 'folder') {
                    navigateToPath(item.id);
                  }
                }}
              >
                <div className="w-6 h-6 mr-3">
                  {item.type === 'folder' ? (
                    <Folder size={20} className="text-blue-500" />
                  ) : (
                    <File size={20} className="text-gray-500" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{item.name}</div>
                </div>
                
                <div className="w-20 text-sm text-gray-500 text-right">
                  {item.type === 'file' && formatFileSize(item.size)}
                </div>
                
                <div className="w-32 text-sm text-gray-500 text-right">
                  {formatDate(item.dateModified)}
                </div>
                
                {state.selectedItems.includes(item.id) && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteItem(item.id);
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-6 gap-4">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${
                  state.selectedItems.includes(item.id) ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => selectItem(item.id)}
                onDoubleClick={() => {
                  if (item.type === 'folder') {
                    navigateToPath(item.id);
                  }
                }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 mb-2">
                    {item.type === 'folder' ? (
                      <Folder size={48} className="text-blue-500" />
                    ) : (
                      <File size={48} className="text-gray-500" />
                    )}
                  </div>
                  <div className="text-sm font-medium truncate w-full">{item.name}</div>
                  {item.type === 'file' && (
                    <div className="text-xs text-gray-500 mt-1">
                      {formatFileSize(item.size)}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <Folder size={48} className="mx-auto mb-4 opacity-50" />
            <p>No items found</p>
          </div>
        )}
      </div>

      {/* Create Dialog */}
      {showCreateDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">
              Create New {createType === 'folder' ? 'Folder' : 'File'}
            </h3>
            
            <div className="flex space-x-2 mb-4">
              <Button
                variant={createType === 'folder' ? 'default' : 'outline'}
                onClick={() => setCreateType('folder')}
              >
                Folder
              </Button>
              <Button
                variant={createType === 'file' ? 'default' : 'outline'}
                onClick={() => setCreateType('file')}
              >
                File
              </Button>
            </div>
            
            <Input
              placeholder={`${createType === 'folder' ? 'Folder' : 'File'} name`}
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
              className="mb-4"
            />
            
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowCreateDialog(false);
                  setCreateName('');
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleCreate}>
                Create
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Status Bar */}
      <div className="flex items-center justify-between p-2 bg-gray-50 border-t text-sm text-gray-600">
        <div>
          {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
          {state.selectedItems.length > 0 && (
            <span> • {state.selectedItems.length} selected</span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">{state.viewMode}</Badge>
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;
