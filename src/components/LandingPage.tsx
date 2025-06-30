
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Timer, Users, Bell, ArrowRight, Star, Shield } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: <Timer className="w-6 h-6" />,
      title: "79 Second Spark",
      description: "Lightning-fast connections that ignite real chemistry",
      gradient: "from-orange-400 to-pink-500"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Authentic Matches",
      description: "AI-powered compatibility with verified profiles only",
      gradient: "from-pink-500 to-red-500"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy First",
      description: "End-to-end encryption with disappearing messages",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Multi-Mode Dating",
      description: "From serious relationships to creative connections",
      gradient: "from-blue-500 to-cyan-500"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 gradient-primary opacity-90"></div>
      <div className="fixed inset-0 bg-black/20"></div>
      
      {/* Floating geometric shapes */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
      <div className="fixed bottom-32 right-20 w-48 h-48 bg-pink-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="fixed top-1/2 left-1/3 w-24 h-24 bg-yellow-400/10 rounded-full blur-xl animate-pulse delay-500"></div>

      {/* Hero Section */}
      <div className="relative z-10 safe-top">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Navigation */}
          <nav className="flex justify-between items-center mb-16">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/e9a765be-fbd7-4cb2-9e68-e5d1575f4780.png" 
                alt="URS79" 
                className="w-10 h-10 object-contain"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
                URS79
              </span>
            </div>
            <Link to="/auth">
              <Button className="btn-secondary">
                Sign In
              </Button>
            </Link>
          </nav>

          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-pink-200 to-yellow-200 bg-clip-text text-transparent">
                Love at
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
                First Swipe
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              The revolutionary dating app that sparks real connections in just 79 seconds. 
              From meaningful relationships to creative collaborations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/auth">
                <Button className="btn-primary text-lg px-8 py-4 min-w-48">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button className="btn-secondary text-lg px-8 py-4 min-w-48">
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              { number: "50K+", label: "Active Users", icon: Users },
              { number: "2.5M+", label: "Matches Made", icon: Heart },
              { number: "98%", label: "Success Rate", icon: Star }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center glass rounded-3xl p-8 card-hover">
                  <Icon className="w-8 h-8 mx-auto mb-4 text-pink-400" />
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-white/70 text-lg">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
              Next-Gen Dating
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Revolutionary features that redefine how you connect, chat, and create meaningful relationships.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass rounded-3xl p-8 card-hover border-white/10">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 text-white`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="glass rounded-3xl p-12">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
              Your Perfect Match Awaits
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Join thousands who have found love, friendship, and creative partnerships through URS79.
            </p>
            <Link to="/auth">
              <Button className="btn-primary text-xl px-12 py-4">
                Get Started Free
                <Heart className="ml-3 w-6 h-6" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-12 safe-bottom">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <img 
              src="/lovable-uploads/e9a765be-fbd7-4cb2-9e68-e5d1575f4780.png" 
              alt="URS79" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-bold text-white/90">URS79</span>
          </div>
          <p className="text-white/50">
            © 2024 URS79. All rights reserved. Made with ❤️ for modern daters.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
