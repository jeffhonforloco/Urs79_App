
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Shield, DollarSign } from 'lucide-react';
import PaymentIntegration from './PaymentIntegration';
import NSFWControls from './NSFWControls';
import MonetizationFeatures from './MonetizationFeatures';

const Phase3Features: React.FC = () => {
  const [activeTab, setActiveTab] = useState('payments');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-20 md:pb-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent mb-4">
          Phase 3 Features
        </h1>
        <p className="text-white/70 text-lg">
          Advanced monetization, payments, and content controls
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/5 backdrop-blur-md">
          <TabsTrigger 
            value="payments" 
            className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500"
          >
            <CreditCard className="w-4 h-4" />
            <span>Payments</span>
          </TabsTrigger>
          <TabsTrigger 
            value="nsfw" 
            className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-500"
          >
            <Shield className="w-4 h-4" />
            <span>NSFW Controls</span>
          </TabsTrigger>
          <TabsTrigger 
            value="monetization" 
            className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500"
          >
            <DollarSign className="w-4 h-4" />
            <span>Monetization</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="payments" className="space-y-6">
          <PaymentIntegration />
        </TabsContent>

        <TabsContent value="nsfw" className="space-y-6">
          <NSFWControls />
        </TabsContent>

        <TabsContent value="monetization" className="space-y-6">
          <MonetizationFeatures />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Phase3Features;
