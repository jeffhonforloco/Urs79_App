
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Check, Star, Heart, Timer, Users, Bell } from 'lucide-react';
import { toast } from 'sonner';

const PremiumScreen = () => {
  const { user, updateProfile } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const plans = [
    {
      id: 'monthly',
      name: 'Premium Monthly',
      price: '$9.99',
      period: '/month',
      description: 'Perfect for trying premium features',
      featured: false,
    },
    {
      id: 'quarterly',
      name: 'Premium Plus',
      price: '$19.99',
      period: '/3 months',
      description: 'Most popular choice',
      featured: true,
      savings: 'Save 33%',
    },
    {
      id: 'annual',
      name: 'Premium Gold',
      price: '$39.99',
      period: '/year',
      description: 'Best value for serious daters',
      featured: false,
      savings: 'Save 67%',
    },
  ];

  const features = [
    {
      icon: <Heart className="w-5 h-5 text-pink-500" />,
      title: 'Unlimited Likes',
      description: 'Like as many profiles as you want',
      free: false,
    },
    {
      icon: <Timer className="w-5 h-5 text-orange-500" />,
      title: 'Unlimited Quick Matches',
      description: 'Start as many 79-second matches as you like',
      free: false,
    },
    {
      icon: <Users className="w-5 h-5 text-blue-500" />,
      title: 'See Who Likes You',
      description: 'View all your admirers instantly',
      free: false,
    },
    {
      icon: <Star className="w-5 h-5 text-purple-500" />,
      title: 'Priority Matching',
      description: 'Your profile gets shown first',
      free: false,
    },
    {
      icon: <Bell className="w-5 h-5 text-green-500" />,
      title: 'Read Receipts',
      description: 'Know when your messages are read',
      free: false,
    },
    {
      icon: <Heart className="w-5 h-5 text-red-500" />,
      title: 'Advanced Filters',
      description: 'Filter by education, lifestyle, and more',
      free: false,
    },
  ];

  const handleUpgrade = () => {
    // Simulate payment processing
    toast.success('Upgrade successful! Welcome to URS79 Premium!');
    updateProfile({ isPremium: true });
  };

  const handleManageSubscription = () => {
    toast.info('Opening subscription management...');
  };

  if (user?.isPremium) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 pb-20 md:pb-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
            <Star className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            You're Premium! ⭐
          </h1>
          <p className="text-gray-600">
            Enjoy all the premium features and find your perfect match faster
          </p>
        </div>

        <Card className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Premium Gold Active
              </h3>
              <p className="text-gray-600 mb-4">
                Your subscription renews on March 24, 2024
              </p>
              <Button variant="outline" onClick={handleManageSubscription}>
                Manage Subscription
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Premium Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-green-50">
                  {feature.icon}
                  <div>
                    <h4 className="font-medium text-gray-900">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-20 md:pb-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Upgrade to Premium
        </h1>
        <p className="text-gray-600">
          Get unlimited access and find your perfect match faster
        </p>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative cursor-pointer transition-all ${
              selectedPlan === plan.id
                ? 'ring-2 ring-orange-500 shadow-lg'
                : 'hover:shadow-md'
            } ${plan.featured ? 'border-orange-500' : ''}`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            {plan.featured && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-orange-500 text-white px-4 py-1">
                  Most Popular
                </Badge>
              </div>
            )}
            {plan.savings && (
              <div className="absolute -top-3 right-4">
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {plan.savings}
                </Badge>
              </div>
            )}
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {plan.name}
              </h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600">{plan.period}</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
              <div className={`w-4 h-4 rounded-full mx-auto ${
                selectedPlan === plan.id ? 'bg-orange-500' : 'border-2 border-gray-300'
              }`} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Comparison */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Premium Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center space-x-3">
                  {feature.icon}
                  <div>
                    <h4 className="font-medium text-gray-900">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
                <div className="flex space-x-8">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Free</p>
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Premium</p>
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upgrade Button */}
      <Card>
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Ready to upgrade?
          </h3>
          <p className="text-gray-600 mb-6">
            Join thousands of premium members finding love faster
          </p>
          <Button
            size="lg"
            onClick={handleUpgrade}
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 px-8"
          >
            Upgrade to Premium - {plans.find(p => p.id === selectedPlan)?.price}
          </Button>
          <p className="text-xs text-gray-500 mt-4">
            Cancel anytime. No hidden fees.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PremiumScreen;
