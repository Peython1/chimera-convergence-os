
import React from 'react';
import { Card } from '@/components/ui/card';
import { Folder, File } from 'lucide-react';
import { FileSystemItem } from '../types';

interface FileGridViewProps {
  items: FileSystemItem[];
  selectedItems: string[];
  onSelectItem: (id: string) => void;
  onNavigateToPath: (id: string) => void;
}

const FileGridView: React.FC<FileGridViewProps> = ({
  items,
  selectedItems,
  onSelectItem,
  onNavigateToPath,
}) => {
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="grid grid-cols-6 gap-4">
      {items.map((item) => (
        <Card
          key={item.id}
          className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${
            selectedItems.includes(item.id) ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => onSelectItem(item.id)}
          onDoubleClick={() => {
            if (item.type === 'folder') {
              onNavigateToPath(item.id);
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
  );
};

export default FileGridView;
