
// This is a mock implementation - in a real app, this would call an AI service

type Argument = {
  id: number;
  side: 'pro' | 'con';
  content: string;
  likes: number;
};

export const generateDebateArguments = async (topic: string): Promise<Argument[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real application, this would call an AI API like OpenAI or use a local model
  const mockArguments: Argument[] = [
    {
      id: 1,
      side: 'pro',
      content: `${topic} has numerous benefits. First, it promotes greater transparency and accountability. When systems are open to public scrutiny, they tend to be more equitable and fair for all participants.`,
      likes: Math.floor(Math.random() * 10),
    },
    {
      id: 2,
      side: 'con',
      content: `While ${topic} may seem appealing at first glance, we must consider the practical limitations. The implementation costs would be prohibitive, and there's no guarantee of achieving the desired outcomes.`,
      likes: Math.floor(Math.random() * 10),
    },
    {
      id: 3,
      side: 'pro',
      content: `Research consistently shows that similar initiatives have resulted in positive outcomes across various contexts. Several peer-reviewed studies demonstrate a clear correlation between these approaches and improved societal wellbeing.`,
      likes: Math.floor(Math.random() * 10),
    },
    {
      id: 4,
      side: 'con',
      content: `Historical precedent suggests caution. Previous attempts at similar policies have often had unintended consequences that outweighed any benefits. We must learn from past mistakes rather than repeating them.`,
      likes: Math.floor(Math.random() * 10),
    },
  ];
  
  return mockArguments;
};

export const generateAIResponse = async (
  topic: string, 
  userArgument: string, 
  side: 'pro' | 'con'
): Promise<string> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // In a real application, this would call an AI API
  const opposingSide = side === 'pro' ? 'con' : 'pro';
  
  const mockResponses = {
    pro: [
      "While that perspective has merit, we must consider the broader societal benefits that would result from this policy.",
      "That's an interesting point, but it overlooks the substantial evidence showing positive outcomes in similar contexts.",
      "I understand your concerns, but empirical data suggests the benefits would significantly outweigh any potential drawbacks."
    ],
    con: [
      "Although your argument is reasonable, we cannot ignore the practical limitations and costs associated with implementation.",
      "That's a compelling perspective, but historical examples demonstrate the risk of unintended negative consequences.",
      "I appreciate your idealism, but we must be pragmatic about the real-world constraints and potential downsides."
    ]
  };
  
  const responses = mockResponses[opposingSide as keyof typeof mockResponses];
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  return randomResponse + " Additionally, we need to consider that " + 
    (opposingSide === 'pro' 
      ? "implementing this would create more opportunities for growth and innovation in the long term."
      : "the costs of this proposal may outweigh the benefits when we consider all factors involved.");
};
