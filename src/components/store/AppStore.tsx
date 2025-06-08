
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Download, 
  Star, 
  Users, 
  Trash2,
  Grid3X3,
  List,
  Filter
} from 'lucide-react';
import { useAppStore } from './hooks/useAppStore';

const AppStore: React.FC = () => {
  const {
    state,
    filteredApps,
    installApp,
    uninstallApp,
    setSearchTerm,
    setSelectedCategory,
    setSorting,
  } = useAppStore();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatPrice = (price: number) => {
    return price === 0 ? 'Free' : `$${price.toFixed(2)}`;
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <div className="flex items-center space-x-2">
          <h1 className="text-lg font-semibold">App Store</h1>
          <Badge variant="secondary">{filteredApps.length} apps</Badge>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-gray-200' : ''}
          >
            <Grid3X3 size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode('list')}
            className={viewMode === 'list' ? 'bg-gray-200' : ''}
          >
            <List size={16} />
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 border-b space-y-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            <Input
              placeholder="Search apps..."
              value={state.searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select
            value={state.selectedCategory || 'all'}
            onValueChange={(value) => setSelectedCategory(value === 'all' ? null : value)}
          >
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {state.categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            value={`${state.sortBy}-${state.sortOrder}`}
            onValueChange={(value) => {
              const [sortBy, sortOrder] = value.split('-') as [any, any];
              setSorting(sortBy, sortOrder);
            }}
          >
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="downloads-desc">Most Downloaded</SelectItem>
              <SelectItem value="rating-desc">Highest Rated</SelectItem>
              <SelectItem value="name-asc">Name A-Z</SelectItem>
              <SelectItem value="price-asc">Price Low to High</SelectItem>
              <SelectItem value="price-desc">Price High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* App List */}
      <div className="flex-1 p-4 overflow-auto">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredApps.map((app) => (
              <Card key={app.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{app.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{app.name}</CardTitle>
                        <p className="text-sm text-gray-600">{app.developer}</p>
                      </div>
                    </div>
                    {app.isInstalled && (
                      <Badge variant="default">Installed</Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-700 line-clamp-2">{app.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        <span>{app.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download size={12} />
                        <span>{formatNumber(app.downloads)}</span>
                      </div>
                    </div>
                    <Badge variant="outline">{formatPrice(app.price)}</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{app.size}</span>
                    {app.isInstalled ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => uninstallApp(app.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={14} className="mr-1" />
                        Uninstall
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => installApp(app.id)}
                      >
                        <Download size={14} className="mr-1" />
                        Install
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredApps.map((app) => (
              <Card key={app.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{app.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{app.name}</h3>
                          {app.isInstalled && (
                            <Badge variant="default" className="text-xs">Installed</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{app.developer}</p>
                        <p className="text-sm text-gray-700 mt-1">{app.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <Star size={14} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{app.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          <Users size={14} className="text-gray-500" />
                          <span className="text-xs text-gray-500">{formatNumber(app.downloads)}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <Badge variant="outline" className="mb-2">{formatPrice(app.price)}</Badge>
                        <div className="text-xs text-gray-500">{app.size}</div>
                      </div>
                      
                      {app.isInstalled ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => uninstallApp(app.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={14} className="mr-1" />
                          Uninstall
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => installApp(app.id)}
                        >
                          <Download size={14} className="mr-1" />
                          Install
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredApps.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <Search size={48} className="mx-auto mb-4 opacity-50" />
            <p>No apps found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppStore;
