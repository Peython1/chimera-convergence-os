
import React from 'react';
import { Button } from '@/components/ui/button';
import { Folder, File, Trash2 } from 'lucide-react';
import { FileSystemItem } from '../types';

interface FileListViewProps {
  items: FileSystemItem[];
  selectedItems: string[];
  onSelectItem: (id: string) => void;
  onNavigateToPath: (id: string) => void;
  onDeleteItem: (id: string) => void;
}

const FileListView: React.FC<FileListViewProps> = ({
  items,
  selectedItems,
  onSelectItem,
  onNavigateToPath,
  onDeleteItem,
}) => {
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
    <div className="space-y-1">
      {items.map((item) => (
        <div
          key={item.id}
          className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-100 ${
            selectedItems.includes(item.id) ? 'bg-blue-50 border border-blue-200' : ''
          }`}
          onClick={() => onSelectItem(item.id)}
          onDoubleClick={() => {
            if (item.type === 'folder') {
              onNavigateToPath(item.id);
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
          
          {selectedItems.includes(item.id) && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 text-red-500 hover:text-red-700"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteItem(item.id);
              }}
            >
              <Trash2 size={16} />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default FileListView;
