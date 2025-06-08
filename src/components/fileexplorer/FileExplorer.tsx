
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Folder } from 'lucide-react';
import { useFileSystem } from './hooks/useFileSystem';
import FileExplorerToolbar from './components/FileExplorerToolbar';
import FileExplorerBreadcrumb from './components/FileExplorerBreadcrumb';
import CreateItemDialog from './components/CreateItemDialog';
import FileListView from './components/FileListView';
import FileGridView from './components/FileGridView';

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

  const handleNavigateBack = () => {
    const pathParts = getCurrentPath();
    if (pathParts.length > 1) {
      navigateToPath(pathParts[pathParts.length - 2].id);
    }
  };

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

  const handleCancelCreate = () => {
    setShowCreateDialog(false);
    setCreateName('');
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <FileExplorerToolbar
        onNavigateBack={handleNavigateBack}
        onNavigateHome={() => navigateToPath('home')}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        viewMode={state.viewMode}
        onViewModeChange={setViewMode}
        onShowCreateDialog={() => setShowCreateDialog(true)}
      />

      <FileExplorerBreadcrumb
        pathItems={getCurrentPath()}
        onNavigateToPath={navigateToPath}
      />

      <div className="flex-1 p-4 overflow-auto">
        {state.viewMode === 'list' ? (
          <FileListView
            items={filteredItems}
            selectedItems={state.selectedItems}
            onSelectItem={selectItem}
            onNavigateToPath={navigateToPath}
            onDeleteItem={deleteItem}
          />
        ) : (
          <FileGridView
            items={filteredItems}
            selectedItems={state.selectedItems}
            onSelectItem={selectItem}
            onNavigateToPath={navigateToPath}
          />
        )}

        {filteredItems.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <Folder size={48} className="mx-auto mb-4 opacity-50" />
            <p>No items found</p>
          </div>
        )}
      </div>

      <CreateItemDialog
        show={showCreateDialog}
        type={createType}
        name={createName}
        onTypeChange={setCreateType}
        onNameChange={setCreateName}
        onCreate={handleCreate}
        onCancel={handleCancelCreate}
      />

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
