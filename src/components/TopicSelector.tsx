
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

// Sample debate topics - in a real app, these could come from an API
const DEBATE_TOPICS = [
  {
    id: 1,
    title: "Should social media platforms be regulated like public utilities?",
    description: "Debate the merits of treating major social media platforms as public utilities with government oversight."
  },
  {
    id: 2,
    title: "Is universal basic income a viable economic policy?",
    description: "Consider whether UBI could address poverty and unemployment in an increasingly automated economy."
  },
  {
    id: 3,
    title: "Should college education be free?",
    description: "Discuss the implications of making higher education free for all eligible students."
  },
  {
    id: 4,
    title: "Are cryptocurrencies the future of finance?",
    description: "Debate the long-term viability and impact of cryptocurrencies on traditional financial systems."
  },
  {
    id: 5,
    title: "Is remote work better than in-office work?",
    description: "Consider the productivity, wellbeing, and social implications of remote versus in-office work environments."
  },
  {
    id: 6,
    title: "Should AI development be more heavily regulated?",
    description: "Debate whether stricter regulations should govern artificial intelligence research and development."
  }
];

type TopicSelectorProps = {
  onSelectTopic: (topic: string) => void;
  onSelectSide: (side: 'pro' | 'con') => void;
};

const TopicSelector: React.FC<TopicSelectorProps> = ({ onSelectTopic, onSelectSide }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  
  const handleSelectTopic = (topicId: number) => {
    setSelectedTopicId(topicId);
    const topic = DEBATE_TOPICS.find(t => t.id === topicId);
    if (topic) {
      onSelectTopic(topic.title);
      toast.success(`Topic selected: ${topic.title}`);
    }
  };

  const handleSelectSide = (side: 'pro' | 'con') => {
    onSelectSide(side);
    toast.success(`You've chosen to argue the ${side === 'pro' ? 'affirmative' : 'negative'} position`);
  };

  const selectedTopic = DEBATE_TOPICS.find(t => t.id === selectedTopicId);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Select a Debate Topic</h2>
        <p className="text-muted-foreground">Choose a topic that interests you, then pick which side you'll argue</p>
      </div>
      
      <ScrollArea className="h-[400px] rounded-md border">
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEBATE_TOPICS.map((topic) => (
            <Card 
              key={topic.id}
              className={`cursor-pointer transition-all ${selectedTopicId === topic.id ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary/50'}`}
              onClick={() => handleSelectTopic(topic.id)}
            >
              <CardHeader>
                <CardTitle className="text-lg">{topic.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{topic.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
      
      {selectedTopic && (
        <div className="debate-form border rounded-lg p-6 bg-white">
          <h3 className="text-xl font-medium mb-4">Choose Your Side</h3>
          <p className="mb-6 text-muted-foreground">{selectedTopic.title}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={() => handleSelectSide('pro')}
              className="h-20 text-lg bg-debate-pro hover:bg-debate-pro/80"
            >
              Support (Pro)
            </Button>
            <Button 
              onClick={() => handleSelectSide('con')}
              className="h-20 text-lg bg-debate-con hover:bg-debate-con/80"
            >
              Oppose (Con)
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicSelector;
