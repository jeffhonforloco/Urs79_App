
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Match {
  id: string;
  userId: string;
  name: string;
  age: number;
  photo: string;
  bio: string;
  interests: string[];
  distance: number;
  isQuickMatch?: boolean;
  quickMatchEndsAt?: Date;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount?: number;
}

interface Message {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface MatchContextType {
  potentialMatches: Match[];
  matches: Match[];
  messages: { [matchId: string]: Message[] };
  swipeRight: (match: Match) => void;
  swipeLeft: (match: Match) => void;
  startQuickMatch: (match: Match) => void;
  sendMessage: (matchId: string, content: string) => void;
  getNextPotentialMatch: () => Match | null;
}

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export const useMatch = () => {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error('useMatch must be used within a MatchProvider');
  }
  return context;
};

const mockPotentialMatches: Match[] = [
  {
    id: '1',
    userId: 'user1',
    name: 'Emma',
    age: 26,
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop',
    bio: 'Adventure seeker, coffee lover, dog mom 🐕',
    interests: ['Travel', 'Photography', 'Hiking'],
    distance: 2.5,
  },
  {
    id: '2',
    userId: 'user2',
    name: 'Sophia',
    age: 24,
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop',
    bio: 'Artist by day, Netflix enthusiast by night 🎨',
    interests: ['Art', 'Movies', 'Cooking'],
    distance: 5.2,
  },
  {
    id: '3',
    userId: 'user3',
    name: 'Maya',
    age: 28,
    photo: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=400&h=600&fit=crop',
    bio: 'Fitness enthusiast, yoga instructor, plant parent 🌱',
    interests: ['Fitness', 'Yoga', 'Health'],
    distance: 3.8,
  },
  {
    id: '4',
    userId: 'user4',
    name: 'Zoe',
    age: 27,
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop',
    bio: 'Foodie, traveler, always up for new experiences 🍕',
    interests: ['Food', 'Travel', 'Music'],
    distance: 1.2,
  },
];

export const MatchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [potentialMatches, setPotentialMatches] = useState<Match[]>(mockPotentialMatches);
  const [matches, setMatches] = useState<Match[]>([]);
  const [messages, setMessages] = useState<{ [matchId: string]: Message[] }>({});

  const swipeRight = (match: Match) => {
    // Remove from potential matches
    setPotentialMatches(prev => prev.filter(m => m.id !== match.id));
    
    // Add to matches (simulate mutual like)
    if (Math.random() > 0.3) { // 70% chance of mutual match
      const newMatch = { ...match, lastMessage: "Say hello! 👋", lastMessageTime: new Date(), unreadCount: 0 };
      setMatches(prev => [newMatch, ...prev]);
    }
  };

  const swipeLeft = (match: Match) => {
    setPotentialMatches(prev => prev.filter(m => m.id !== match.id));
  };

  const startQuickMatch = (match: Match) => {
    const quickMatchEndTime = new Date(Date.now() + 79000); // 79 seconds from now
    const quickMatch = {
      ...match,
      isQuickMatch: true,
      quickMatchEndsAt: quickMatchEndTime,
    };
    
    setPotentialMatches(prev => prev.filter(m => m.id !== match.id));
    setMatches(prev => [quickMatch, ...prev]);
  };

  const sendMessage = (matchId: string, content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      matchId,
      senderId: 'current-user',
      content,
      timestamp: new Date(),
      read: true,
    };

    setMessages(prev => ({
      ...prev,
      [matchId]: [...(prev[matchId] || []), newMessage],
    }));

    // Update match with last message
    setMatches(prev => prev.map(match => 
      match.id === matchId 
        ? { ...match, lastMessage: content, lastMessageTime: new Date() }
        : match
    ));

    // Simulate response after 2-5 seconds
    setTimeout(() => {
      const responses = [
        "That's so cool! 😊",
        "I love that too!",
        "Tell me more about that!",
        "Haha, you're funny! 😄",
        "I totally agree!",
        "That sounds amazing!",
      ];
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        matchId,
        senderId: matchId,
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        read: false,
      };

      setMessages(prev => ({
        ...prev,
        [matchId]: [...(prev[matchId] || []), responseMessage],
      }));

      setMatches(prev => prev.map(match => 
        match.id === matchId 
          ? { 
              ...match, 
              lastMessage: responseMessage.content, 
              lastMessageTime: responseMessage.timestamp,
              unreadCount: (match.unreadCount || 0) + 1
            }
          : match
      ));
    }, Math.random() * 3000 + 2000);
  };

  const getNextPotentialMatch = () => {
    return potentialMatches[0] || null;
  };

  return (
    <MatchContext.Provider value={{
      potentialMatches,
      matches,
      messages,
      swipeRight,
      swipeLeft,
      startQuickMatch,
      sendMessage,
      getNextPotentialMatch,
    }}>
      {children}
    </MatchContext.Provider>
  );
};
