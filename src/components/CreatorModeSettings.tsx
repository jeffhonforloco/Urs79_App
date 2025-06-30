
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import CreatorModeToggle from './CreatorModeToggle';
import CreatorPricingSettings from './CreatorPricingSettings';
import CreatorMessagingSettings from './CreatorMessagingSettings';
import CreatorContentSettings from './CreatorContentSettings';
import CreatorRevenueInfo from './CreatorRevenueInfo';

const CreatorModeSettings = () => {
  const { user } = useAuth();
  const [creatorModeEnabled, setCreatorModeEnabled] = useState(user?.creatorMode || false);

  return (
    <div className="space-y-6">
      <CreatorModeToggle 
        creatorModeEnabled={creatorModeEnabled}
        onToggle={setCreatorModeEnabled}
      />

      {creatorModeEnabled && (
        <>
          <Tabs defaultValue="pricing" className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="messaging">Messaging</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>

            <TabsContent value="pricing" className="space-y-4">
              <CreatorPricingSettings />
            </TabsContent>

            <TabsContent value="messaging" className="space-y-4">
              <CreatorMessagingSettings />
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <CreatorContentSettings />
            </TabsContent>
          </Tabs>

          <CreatorRevenueInfo />
        </>
      )}
    </div>
  );
};

export default CreatorModeSettings;
