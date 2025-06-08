
export interface FileSystemItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: number;
  dateModified: Date;
  dateCreated: Date;
  parent?: string;
  content?: string;
  icon?: string;
}

export interface FileExplorerState {
  currentPath: string;
  items: FileSystemItem[];
  selectedItems: string[];
  viewMode: 'list' | 'grid';
  sortBy: 'name' | 'date' | 'size' | 'type';
  sortOrder: 'asc' | 'desc';
}

export interface NavigationItem {
  path: string;
  name: string;
  icon: string;
}
