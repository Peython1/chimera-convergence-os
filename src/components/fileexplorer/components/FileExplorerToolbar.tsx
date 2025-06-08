
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  Home, 
  Search,
  Grid3X3, 
  List,
  Plus
} from 'lucide-react';

interface FileExplorerToolbarProps {
  onNavigateBack: () => void;
  onNavigateHome: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  viewMode: 'list' | 'grid';
  onViewModeChange: (mode: 'list' | 'grid') => void;
  onShowCreateDialog: () => void;
}

const FileExplorerToolbar: React.FC<FileExplorerToolbarProps> = ({
  onNavigateBack,
  onNavigateHome,
  searchTerm,
  onSearchChange,
  viewMode,
  onViewModeChange,
  onShowCreateDialog,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-gray-50">
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onNavigateBack}
        >
          <ArrowLeft size={16} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onNavigateHome}
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
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onViewModeChange('list')}
          className={viewMode === 'list' ? 'bg-gray-200' : ''}
        >
          <List size={16} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onViewModeChange('grid')}
          className={viewMode === 'grid' ? 'bg-gray-200' : ''}
        >
          <Grid3X3 size={16} />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onShowCreateDialog}
        >
          <Plus size={16} className="mr-1" />
          New
        </Button>
      </div>
    </div>
  );
};

export default FileExplorerToolbar;
