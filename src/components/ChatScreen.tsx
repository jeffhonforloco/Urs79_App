
import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMatch } from '@/contexts/MatchContext';
import { Send, Timer, ArrowLeft, Heart } from 'lucide-react';

const ChatScreen = () => {
  const { matchId } = useParams();
  const { matches, messages, sendMessage } = useMatch();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // If no specific match is selected, show match list
  if (!matchId) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 pb-20 md:pb-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Start conversations with your matches</p>
        </div>

        {matches.length === 0 ? (
          <Card className="text-center p-8">
            <CardContent>
              <Heart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                No matches yet
              </h2>
              <p className="text-gray-600 mb-4">
                Start swiping to find your perfect match!
              </p>
              <Link to="/swipe">
                <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                  Start Swiping
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {matches.map((match) => {
              const isQuickMatch = match.isQuickMatch && match.quickMatchEndsAt && new Date(match.quickMatchEndsAt) > new Date();
              const timeLeft = isQuickMatch ? Math.max(0, Math.floor((new Date(match.quickMatchEndsAt!).getTime() - new Date().getTime()) / 1000)) : 0;
              
              return (
                <Link key={match.id} to={`/chat/${match.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={match.photo}
                          alt={match.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-gray-900">{match.name}</h3>
                              {isQuickMatch && (
                                <Badge className="bg-orange-500 text-white">
                                  <Timer className="w-3 h-3 mr-1" />
                                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                                </Badge>
                              )}
                            </div>
                            {match.unreadCount && match.unreadCount > 0 && (
                              <Badge className="bg-orange-500">
                                {match.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {match.lastMessage || 'Say hello! 👋'}
                          </p>
                          {match.lastMessageTime && (
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(match.lastMessageTime).toLocaleTimeString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Show specific chat
  const match = matches.find(m => m.id === matchId);
  const chatMessages = messages[matchId] || [];

  if (!match) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="text-center p-8">
          <CardContent>
            <p className="text-gray-600">Match not found</p>
            <Link to="/chat">
              <Button variant="outline" className="mt-4">
                Back to Messages
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isQuickMatch = match.isQuickMatch && match.quickMatchEndsAt && new Date(match.quickMatchEndsAt) > new Date();
  const timeLeft = isQuickMatch ? Math.max(0, Math.floor((new Date(match.quickMatchEndsAt!).getTime() - new Date().getTime()) / 1000)) : 0;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(matchId, newMessage.trim());
      setNewMessage('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 pb-20 md:pb-8">
      {/* Chat Header */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/chat">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <img
                src={match.photo}
                alt={match.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h2 className="font-semibold text-gray-900">{match.name}</h2>
                {isQuickMatch && (
                  <div className="flex items-center text-sm text-orange-600">
                    <Timer className="w-3 h-3 mr-1" />
                    Quick Match: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Match Alert */}
      {isQuickMatch && (
        <Card className="mb-4 bg-gradient-to-r from-orange-50 to-pink-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <p className="text-orange-700 font-medium">
              ⚡ Quick Match Active! Make the most of your {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')} remaining
            </p>
          </CardContent>
        </Card>
      )}

      {/* Messages */}
      <Card className="flex flex-col h-[500px]">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Start the conversation! Say something nice.</p>
            </div>
          ) : (
            chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.senderId === 'current-user'
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.senderId === 'current-user' ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Message Input */}
        <div className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={!newMessage.trim()}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default ChatScreen;
