
import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, ThumbsUp, Flag } from "lucide-react";
import { generateDebateArguments } from '@/utils/debate-utils';
import { toast } from "sonner";

type DebateArenaProps = {
  topic: string;
  userSide: 'pro' | 'con';
  onRestart: () => void;
};

type Argument = {
  id: number;
  side: 'pro' | 'con';
  content: string;
  likes: number;
  isUserArgument?: boolean;
};

const DebateArena: React.FC<DebateArenaProps> = ({ topic, userSide, onRestart }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [debateArguments, setDebateArguments] = useState<Argument[]>([]);
  const [userInput, setUserInput] = useState('');
  const [round, setRound] = useState(1);
  const [scores, setScores] = useState({ pro: 50, con: 50 });
  
  // Initialize debate
  useEffect(() => {
    const initializeDebate = async () => {
      setIsLoading(true);
      try {
        const initialArguments = await generateDebateArguments(topic);
        setDebateArguments(initialArguments);
      } catch (error) {
        console.error("Failed to generate debate arguments:", error);
        toast.error("Failed to generate debate. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeDebate();
  }, [topic]);
  
  const handleAddArgument = () => {
    if (userInput.trim().length < 10) {
      toast.warning("Your argument should be at least 10 characters long");
      return;
    }
    
    // Add user argument
    const newUserArgument: Argument = {
      id: Date.now(),
      side: userSide,
      content: userInput,
      likes: 0,
      isUserArgument: true
    };
    
    setDebateArguments([...debateArguments, newUserArgument]);
    setUserInput('');
    setRound(round + 1);
    
    // Simulate AI response with a delay
    toast.info("AI is preparing a counterargument...");
    setTimeout(async () => {
      try {
        // In a real app, this would call an API with the user's argument
        const aiResponse: Argument = {
          id: Date.now() + 1,
          side: userSide === 'pro' ? 'con' : 'pro',
          content: "While your point is valid, we must consider the counterargument that...",
          likes: 0
        };
        
        setDebateArguments(prev => [...prev, aiResponse]);
        
        // Update scores (simplified - would be more complex in real app)
        setScores(prev => {
          const proChange = Math.random() * 10 - 5; // -5 to +5
          const newProScore = Math.max(10, Math.min(90, prev.pro + proChange));
          return {
            pro: newProScore,
            con: 100 - newProScore
          };
        });
      } catch (error) {
        console.error("Failed to generate AI response:", error);
        toast.error("Failed to generate AI response. Please try again.");
      }
    }, 2000);
  };
  
  const handleLikeArgument = (id: number) => {
    setDebateArguments(prevArgs => 
      prevArgs.map(arg => 
        arg.id === id ? { ...arg, likes: arg.likes + 1 } : arg
      )
    );
    toast.success("Argument liked!");
  };
  
  const handleReportArgument = () => {
    toast.info("Report functionality would be implemented here");
  };

  return (
    <div className="debate-container">
      <div className="debate-header">
        <h2 className="debate-topic">{topic}</h2>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="flex gap-2 mb-4 md:mb-0">
            <Badge variant="outline" className="bg-debate-pro/10 text-debate-pro">Round {round}</Badge>
            <Badge variant="outline">You are arguing: {userSide === 'pro' ? 'In Support' : 'In Opposition'}</Badge>
          </div>
          <Button variant="outline" size="sm" onClick={onRestart}>
            New Debate
          </Button>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-debate-pro font-semibold">Pro: {scores.pro}%</span>
            <span className="text-debate-con font-semibold">Con: {scores.con}%</span>
          </div>
          <div className="relative h-4 rounded-full overflow-hidden bg-gray-200">
            <div 
              className="absolute top-0 left-0 h-full bg-debate-pro"
              style={{ width: `${scores.pro}%` }}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center py-10">
          <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
          <p className="text-muted-foreground">Generating debate...</p>
        </div>
      ) : (
        <>
          <div className="debate-sides">
            <Card className="border-t-4 border-t-debate-pro">
              <CardHeader>
                <CardTitle className="text-center text-debate-pro">Supporting Arguments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {debateArguments
                  .filter(arg => arg.side === 'pro')
                  .map(arg => (
                    <div 
                      key={arg.id} 
                      className={`debate-argument bg-blue-50 ${arg.isUserArgument ? 'border-2 border-debate-pro' : ''}`}
                    >
                      <p>{arg.content}</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleLikeArgument(arg.id)}
                            className="text-xs"
                          >
                            <ThumbsUp className="h-3 w-3 mr-1" /> {arg.likes}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={handleReportArgument}
                            className="text-xs"
                          >
                            <Flag className="h-3 w-3 mr-1" />
                          </Button>
                        </div>
                        {arg.isUserArgument && (
                          <Badge variant="outline" className="text-xs">Your Argument</Badge>
                        )}
                      </div>
                    </div>
                  ))
                }
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-debate-con">
              <CardHeader>
                <CardTitle className="text-center text-debate-con">Opposing Arguments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {debateArguments
                  .filter(arg => arg.side === 'con')
                  .map(arg => (
                    <div 
                      key={arg.id} 
                      className={`debate-argument bg-red-50 ${arg.isUserArgument ? 'border-2 border-debate-con' : ''}`}
                    >
                      <p>{arg.content}</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleLikeArgument(arg.id)}
                            className="text-xs"
                          >
                            <ThumbsUp className="h-3 w-3 mr-1" /> {arg.likes}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={handleReportArgument}
                            className="text-xs"
                          >
                            <Flag className="h-3 w-3 mr-1" />
                          </Button>
                        </div>
                        {arg.isUserArgument && (
                          <Badge variant="outline" className="text-xs">Your Argument</Badge>
                        )}
                      </div>
                    </div>
                  ))
                }
              </CardContent>
            </Card>
          </div>
          
          <Separator className="my-6" />
          
          <div className="debate-form">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Add Your Argument</h3>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-32"
                placeholder="Type your argument here..."
              />
            </div>
            <Button 
              onClick={handleAddArgument} 
              className="w-full" 
              disabled={userInput.trim().length < 10}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Submit Argument
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default DebateArena;
