
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { SearchResult, universalSearch } from '../../services/universalSearch';

interface UniversalSearchProps {
  onSelect: (result: SearchResult) => void;
  onClose: () => void;
  isOpen: boolean;
}

const UniversalSearch: React.FC<UniversalSearchProps> = ({ onSelect, onClose, isOpen }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  useEffect(() => {
    if (query.trim()) {
      const searchResults = universalSearch(query);
      setResults(searchResults);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [query]);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(results.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === 'Enter' && results.length > 0) {
      e.preventDefault();
      onSelect(results[selectedIndex]);
      setQuery('');
      onClose();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setQuery('');
      onClose();
    }
  };
  
  const getIconForType = (type: string) => {
    switch (type) {
      case 'app':
        return <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white">A</div>;
      case 'file':
        return <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">F</div>;
      case 'setting':
        return <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white">S</div>;
      case 'web':
        return <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white">W</div>;
      default:
        return <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white">?</div>;
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-lg shadow-2xl border z-50">
      <div className="flex items-center p-3 border-b">
        <Search className="w-5 h-5 text-gray-400 mr-2" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search apps, files, settings..."
          className="flex-1 outline-none bg-transparent text-gray-800"
          autoFocus
        />
        {query && (
          <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {results.length > 0 ? (
          <div className="p-1">
            {results.map((result, index) => (
              <div
                key={result.id}
                className={`flex items-center p-2 rounded cursor-pointer ${
                  index === selectedIndex ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => {
                  onSelect(result);
                  setQuery('');
                  onClose();
                }}
              >
                <div className="mr-3">{getIconForType(result.type)}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{result.title}</div>
                  {result.description && (
                    <div className="text-xs text-gray-500">{result.description}</div>
                  )}
                </div>
                <div className="text-xs uppercase text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                  {result.type}
                </div>
              </div>
            ))}
          </div>
        ) : query ? (
          <div className="p-4 text-center text-gray-500">No results found</div>
        ) : (
          <div className="p-4 text-center text-gray-500">
            Start typing to search
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversalSearch;
