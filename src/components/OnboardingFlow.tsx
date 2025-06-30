
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, Users, Coffee, Flame, Compass, Star, ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const OnboardingFlow = () => {
  const { user, updateProfile } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIntent, setSelectedIntent] = useState('');
  const [wantsCreatorMode, setWantsCreatorMode] = useState(false);
  const [wantsCasualMode, setWantsCasualMode] = useState(false);

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const intentOptions = [
    {
      value: 'long-term',
      label: 'Long-Term Dating',
      description: 'Looking for a serious relationship',
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-50 border-red-200'
    },
    {
      value: 'short-term',
      label: 'Short-Term Dating',
      description: 'Casual dating without long-term commitment',
      icon: Coffee,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 border-orange-200'
    },
    {
      value: 'friends-with-benefits',
      label: 'Friends with Benefits',
      description: 'Friendship with physical intimacy',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 border-blue-200'
    },
    {
      value: 'hookups',
      label: 'Hookups',
      description: 'Physical connections without commitment',
      icon: Flame,
      color: 'text-pink-500',
      bgColor: 'bg-pink-50 border-pink-200'
    },
    {
      value: 'exploring',
      label: 'Exploring',
      description: 'Open to different types of connections',
      icon: Compass,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 border-purple-200'
    }
  ];

  const handleNext = () => {
    if (currentStep === 1 && !selectedIntent) {
      toast.error('Please select your relationship intent');
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleComplete = () => {
    updateProfile({
      relationshipIntent: selectedIntent as any,
      onboardingCompleted: true,
      ...(wantsCreatorMode && { creatorModeInterested: true }),
      ...(wantsCasualMode && { casualModeInterested: true })
    });
    
    toast.success('Welcome to URS79! Your profile has been set up.');
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">What are you looking for?</h2>
        <p className="text-gray-600">This helps us show you more compatible matches</p>
      </div>
      
      <RadioGroup value={selectedIntent} onValueChange={setSelectedIntent}>
        <div className="space-y-3">
          {intentOptions.map((option) => (
            <div 
              key={option.value} 
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                selectedIntent === option.value ? option.bgColor : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value={option.value} id={option.value} />
                <option.icon className={`w-6 h-6 ${option.color}`} />
                <div className="flex-1">
                  <Label htmlFor={option.value} className="font-medium text-lg cursor-pointer">
                    {option.label}
                  </Label>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Optional Features</h2>
        <p className="text-gray-600">Choose additional features that interest you</p>
      </div>
      
      <div className="space-y-4">
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Flame className="w-6 h-6 text-orange-500" />
                <div>
                  <h3 className="font-medium text-gray-900">Casual Mode</h3>
                  <p className="text-sm text-gray-600">Enhanced privacy for casual connections</p>
                </div>
              </div>
              <Button
                variant={wantsCasualMode ? "default" : "outline"}
                onClick={() => setWantsCasualMode(!wantsCasualMode)}
                size="sm"
              >
                {wantsCasualMode ? 'Selected' : 'Select'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Star className="w-6 h-6 text-purple-500" />
                <div>
                  <h3 className="font-medium text-gray-900">Creator Mode</h3>
                  <p className="text-sm text-gray-600">Monetize exclusive content</p>
                </div>
              </div>
              <Button
                variant={wantsCreatorMode ? "default" : "outline"}
                onClick={() => setWantsCreatorMode(!wantsCreatorMode)}
                size="sm"
              >
                {wantsCreatorMode ? 'Selected' : 'Select'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 text-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">You're all set!</h2>
        <p className="text-gray-600">Here's what we've set up for you:</p>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-center space-x-2">
          <Badge className="bg-blue-100 text-blue-800">
            {intentOptions.find(opt => opt.value === selectedIntent)?.label}
          </Badge>
        </div>
        
        {wantsCasualMode && (
          <div className="flex items-center justify-center space-x-2">
            <Badge className="bg-orange-100 text-orange-800">
              <Flame className="w-3 h-3 mr-1" />
              Casual Mode Interest
            </Badge>
          </div>
        )}
        
        {wantsCreatorMode && (
          <div className="flex items-center justify-center space-x-2">
            <Badge className="bg-purple-100 text-purple-800">
              <Star className="w-3 h-3 mr-1" />
              Creator Mode Interest
            </Badge>
          </div>
        )}
      </div>
      
      <p className="text-sm text-gray-600">
        You can change these settings anytime in your profile.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-lg">Setup Your Profile</CardTitle>
            <Badge variant="outline">{currentStep} of {totalSteps}</Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        
        <CardContent className="space-y-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          
          <div className="flex justify-between pt-6">
            {currentStep > 1 && (
              <Button variant="outline" onClick={handlePrevious}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
            )}
            
            <div className="ml-auto">
              {currentStep < totalSteps ? (
                <Button onClick={handleNext}>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleComplete} className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                  Complete Setup
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
