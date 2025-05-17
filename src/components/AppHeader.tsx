
import React from 'react';
import { Button } from "@/components/ui/button";

const AppHeader: React.FC = () => {
  return (
    <header className="bg-white shadow-sm py-4 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold gradient-text bg-gradient-to-r from-debate-pro to-debate-con bg-clip-text text-transparent">
            DebateForge
          </span>
          <span className="ml-2 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">Beta</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-4">
          <Button variant="link">How It Works</Button>
          <Button variant="link">Topics</Button>
          <Button variant="link">Leaderboard</Button>
          <Button variant="outline">Sign In</Button>
          <Button>Get Started</Button>
        </nav>
        
        <Button variant="ghost" size="icon" className="md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </Button>
      </div>
    </header>
  );
};

export default AppHeader;
