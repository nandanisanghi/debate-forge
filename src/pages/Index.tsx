
import React, { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import TopicSelector from '@/components/TopicSelector';
import DebateArena from '@/components/DebateArena';

const Index = () => {
  const [debateTopic, setDebateTopic] = useState<string | null>(null);
  const [userSide, setUserSide] = useState<'pro' | 'con' | null>(null);
  
  const handleSelectTopic = (topic: string) => {
    setDebateTopic(topic);
  };
  
  const handleSelectSide = (side: 'pro' | 'con') => {
    setUserSide(side);
  };
  
  const handleRestart = () => {
    setDebateTopic(null);
    setUserSide(null);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AppHeader />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        {!debateTopic || !userSide ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-debate-pro to-debate-con bg-clip-text text-transparent">
                DebateForge AI
              </h1>
              <p className="text-xl text-muted-foreground">
                Pick a side, craft arguments, and duel with AI in a battle of ideas
              </p>
            </div>
            
            <TopicSelector 
              onSelectTopic={handleSelectTopic}
              onSelectSide={handleSelectSide}
            />
          </div>
        ) : (
          <DebateArena 
            topic={debateTopic}
            userSide={userSide}
            onRestart={handleRestart}
          />
        )}
      </main>
      
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>DebateForge AI — Sharpen your arguments with artificial intelligence</p>
          <p className="mt-2">Created with Lovable © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
