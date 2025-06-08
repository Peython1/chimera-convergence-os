
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Home,
  Bookmark,
  Search,
  Shield,
  Settings,
  Download
} from 'lucide-react';

const Browser: React.FC = () => {
  const [url, setUrl] = useState('https://www.example.com');
  const [history, setHistory] = useState(['https://www.example.com']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarks] = useState([
    'https://www.github.com',
    'https://www.stackoverflow.com',
    'https://www.google.com'
  ]);

  const navigate = (newUrl: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setUrl(newUrl);
      const newHistory = [...history.slice(0, historyIndex + 1), newUrl];
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setIsLoading(false);
    }, 500);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setUrl(history[newIndex]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setUrl(history[newIndex]);
    }
  };

  const refresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(url);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Navigation Bar */}
      <div className="flex items-center p-2 border-b bg-gray-50 space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={goBack}
          disabled={historyIndex === 0}
          className="w-8 h-8"
        >
          <ArrowLeft size={16} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={goForward}
          disabled={historyIndex >= history.length - 1}
          className="w-8 h-8"
        >
          <ArrowRight size={16} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={refresh}
          className="w-8 h-8"
        >
          <RotateCcw size={16} />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('https://www.example.com')}
          className="w-8 h-8"
        >
          <Home size={16} />
        </Button>
        
        {/* URL Bar */}
        <form onSubmit={handleUrlSubmit} className="flex-1 flex items-center">
          <div className="flex-1 relative">
            <Shield size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" />
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="pl-10 pr-4"
              placeholder="Enter URL or search"
            />
          </div>
        </form>
        
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <Bookmark size={16} />
        </Button>
        
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <Settings size={16} />
        </Button>
      </div>

      {/* Bookmarks Bar */}
      <div className="flex items-center p-2 bg-gray-100 border-b space-x-2">
        <span className="text-sm text-gray-600">Bookmarks:</span>
        {bookmarks.map((bookmark, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={() => navigate(bookmark)}
            className="text-xs"
          >
            {bookmark.replace('https://www.', '').replace('.com', '')}
          </Button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 relative overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Loading...</span>
          </div>
        ) : (
          <div className="h-full bg-white p-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl font-bold mb-4">Welcome to Browser</h1>
              <p className="text-gray-600 mb-4">Current URL: {url}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 border rounded-lg hover:shadow-md cursor-pointer" onClick={() => navigate('https://www.github.com')}>
                  <h3 className="font-semibold">GitHub</h3>
                  <p className="text-sm text-gray-600">Code repository hosting</p>
                </div>
                
                <div className="p-4 border rounded-lg hover:shadow-md cursor-pointer" onClick={() => navigate('https://www.stackoverflow.com')}>
                  <h3 className="font-semibold">Stack Overflow</h3>
                  <p className="text-sm text-gray-600">Developer Q&A</p>
                </div>
                
                <div className="p-4 border rounded-lg hover:shadow-md cursor-pointer" onClick={() => navigate('https://www.google.com')}>
                  <h3 className="font-semibold">Google</h3>
                  <p className="text-sm text-gray-600">Search engine</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Simulation Mode</h3>
                <p className="text-sm text-gray-600">
                  This is a simulated browser environment. Navigation and content are for demonstration purposes only.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between p-2 bg-gray-50 border-t text-xs text-gray-600">
        <div className="flex items-center space-x-2">
          <span>Secure</span>
          <span>•</span>
          <span>Ready</span>
        </div>
        <div className="flex items-center space-x-2">
          <Download size={12} />
          <span>0 downloads</span>
        </div>
      </div>
    </div>
  );
};

export default Browser;
