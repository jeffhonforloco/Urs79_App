
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, Lock, DollarSign } from 'lucide-react';

const CreatorContentSettings: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Content Types</h4>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <Eye className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Free Content</p>
                <p className="text-xs text-gray-600">Visible to all users</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <Lock className="w-4 h-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Subscriber-Only Content</p>
                <p className="text-xs text-gray-600">Only visible to paying subscribers</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
              <DollarSign className="w-4 h-4 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Pay-Per-View Posts</p>
                <p className="text-xs text-gray-600">Individual posts with unlock fees</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatorContentSettings;
