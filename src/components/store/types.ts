
export interface AppInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  version: string;
  size: string;
  rating: number;
  downloads: number;
  category: string;
  developer: string;
  screenshots: string[];
  isInstalled: boolean;
  isSystemApp: boolean;
  price: number; // 0 for free
  releaseDate: Date;
  lastUpdated: Date;
}

export interface AppCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface StoreState {
  apps: AppInfo[];
  categories: AppCategory[];
  installedApps: string[];
  searchTerm: string;
  selectedCategory: string | null;
  sortBy: 'name' | 'rating' | 'downloads' | 'price';
  sortOrder: 'asc' | 'desc';
}
