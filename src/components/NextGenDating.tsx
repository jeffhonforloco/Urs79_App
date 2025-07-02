import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, Heart, Shield, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const NextGenDating = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      icon: Timer,
      title: "Quick Match",
      description: "79-second instant connections for spontaneous encounters",
      color: "from-orange-400 to-orange-600",
      iconBg: "bg-gradient-to-br from-orange-400 to-orange-600",
      action: () => user ? navigate('/discovery') : navigate('/auth')
    },
    {
      icon: Heart,
      title: "Intent-Based Matching",
      description: "Find people looking for exactly what you want",
      color: "from-pink-400 to-pink-600", 
      iconBg: "bg-gradient-to-br from-pink-400 to-pink-600",
      action: () => user ? navigate('/profile') : navigate('/auth')
    },
    {
      icon: Shield,
      title: "Advanced Privacy Controls",
      description: "Control your visibility and protect your identity",
      color: "from-purple-400 to-purple-600",
      iconBg: "bg-gradient-to-br from-purple-400 to-purple-600", 
      action: () => user ? navigate('/security') : navigate('/auth')
    },
    {
      icon: Users,
      title: "Smart Discovery Feed",
      description: "AI-powered matching based on your preferences and behavior",
      color: "from-blue-400 to-blue-600",
      iconBg: "bg-gradient-to-br from-blue-400 to-blue-600",
      action: () => user ? navigate('/discovery') : navigate('/auth')
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Next-Gen Dating
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Revolutionary features that redefine how you connect, chat, and create meaningful relationships.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className="group relative overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-16 h-16 rounded-2xl ${feature.iconBg} flex items-center justify-center shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {feature.description}
                      </p>
                      
                      <Button 
                        onClick={feature.action}
                        className={`bg-gradient-to-r ${feature.color} hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-white border-0`}
                      >
                        {user ? 'Explore Feature' : 'Get Started'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Decorative gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 border border-white/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to experience the future of dating?
            </h3>
            <p className="text-white/90 mb-6">
              Join thousands of users who have already discovered more meaningful connections.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate(user ? '/discovery' : '/auth')}
              className="bg-white text-gray-900 hover:bg-gray-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 px-8 py-3"
            >
              {user ? 'Start Discovering' : 'Sign Up Now'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextGenDating;