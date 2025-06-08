
import React from 'react';
import { FileSystemItem } from '../types';

interface FileExplorerBreadcrumbProps {
  pathItems: FileSystemItem[];
  onNavigateToPath: (id: string) => void;
}

const FileExplorerBreadcrumb: React.FC<FileExplorerBreadcrumbProps> = ({
  pathItems,
  onNavigateToPath,
}) => {
  return (
    <div className="flex items-center p-2 text-sm text-gray-600 border-b">
      {pathItems.map((item, index) => (
        <div key={item.id} className="flex items-center">
          {index > 0 && <span className="mx-1">/</span>}
          <button
            onClick={() => onNavigateToPath(item.id)}
            className="hover:text-blue-600 hover:underline"
          >
            {item.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default FileExplorerBreadcrumb;
