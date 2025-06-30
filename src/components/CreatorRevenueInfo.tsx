
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

const CreatorRevenueInfo: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <DollarSign className="w-5 h-5 mr-2 text-green-600" />
          Revenue Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-1">Revenue Share</h4>
            <p className="text-2xl font-bold text-green-700">85%</p>
            <p className="text-sm text-green-600">You keep 85% of all earnings</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-1">Payout Schedule</h4>
            <p className="text-lg font-semibold text-blue-700">Weekly</p>
            <p className="text-sm text-blue-600">Every Friday via bank transfer</p>
          </div>
        </div>
        
        <div className="text-sm text-gray-600 space-y-1">
          <p className="font-medium">Earning Features:</p>
          <ul className="space-y-1 text-xs ml-4">
            <li>• Monthly subscriptions with recurring billing</li>
            <li>• One-time tips from fans</li>
            <li>• Pay-per-view posts and media</li>
            <li>• Pay-to-DM messaging</li>
            <li>• Unlock media in private chats</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatorRevenueInfo;
