import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import ContentScheduler from './ContentScheduler';
import MediaVault from './MediaVault';
import TippingHistory from './TippingHistory';
import PayoutSettings from './PayoutSettings';
import EnhancedChatSettings from './EnhancedChatSettings';
import { 
  DollarSign, 
  Eye, 
  Users, 
  TrendingUp, 
  Calendar,
  Download,
  Star,
  MessageCircle,
  Lock,
  Upload,
  Wallet
} from 'lucide-react';

const CreatorDashboard = () => {
  const { user } = useAuth();
  
  // Mock data - in real app this would come from API
  const [dashboardData] = useState({
    totalEarnings: 2847.50,
    monthlyEarnings: 847.50,
    totalViews: 15420,
    monthlyViews: 3240,
    totalSubscribers: 127,
    newSubscribers: 12,
    avgTipAmount: 8.50,
    contentViews: {
      free: 8520,
      subscriber: 4320,
      payPerView: 2580
    },
    recentTransactions: [
      { id: 1, type: 'subscription', amount: 9.99, date: '2024-06-28', user: 'User123' },
      { id: 2, type: 'tip', amount: 15.00, date: '2024-06-28', user: 'Fan456' },
      { id: 3, type: 'pay-per-view', amount: 3.99, date: '2024-06-27', user: 'Viewer789' },
      { id: 4, type: 'pay-to-dm', amount: 5.00, date: '2024-06-27', user: 'Admirer321' },
    ],
    topContent: [
      { id: 1, title: 'Beach Photoshoot', views: 1250, earnings: 125.00, type: 'subscriber' },
      { id: 2, title: 'Workout Video', views: 890, earnings: 89.00, type: 'pay-per-view' },
      { id: 3, title: 'Q&A Session', views: 670, earnings: 45.50, type: 'free' },
    ]
  });

  const handleWithdraw = () => {
    // Simulate withdrawal request
    console.log('Withdrawal requested');
  };

  if (!user?.creatorMode) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="text-center">
          <CardContent className="p-8">
            <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Creator Mode Required</h2>
            <p className="text-gray-600">
              Enable Creator Mode in your profile settings to access your creator dashboard.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-20 md:pb-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Creator Dashboard</h1>
        <p className="text-gray-600">Track your content performance and earnings</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-green-600">${dashboardData.totalEarnings}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              +${dashboardData.monthlyEarnings} this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-blue-600">{dashboardData.totalViews.toLocaleString()}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              +{dashboardData.monthlyViews.toLocaleString()} this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Subscribers</p>
                <p className="text-2xl font-bold text-purple-600">{dashboardData.totalSubscribers}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              +{dashboardData.newSubscribers} new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Tip</p>
                <p className="text-2xl font-bold text-orange-600">${dashboardData.avgTipAmount}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Per tip received
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="vault">Vault</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Views Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Free Content</span>
                  </div>
                  <span className="font-semibold">{dashboardData.contentViews.free.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4 text-purple-600" />
                    <span className="text-sm">Subscriber Only</span>
                  </div>
                  <span className="font-semibold">{dashboardData.contentViews.subscriber.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-orange-600" />
                    <span className="text-sm">Pay-Per-View</span>
                  </div>
                  <span className="font-semibold">{dashboardData.contentViews.payPerView.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardData.topContent.map((content) => (
                    <div key={content.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{content.title}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-600">
                          <span>{content.views} views</span>
                          <Badge variant="secondary" className="text-xs">
                            {content.type}
                          </Badge>
                        </div>
                      </div>
                      <span className="font-semibold text-green-600">
                        ${content.earnings}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Content Management</h3>
                <p className="text-gray-600 mb-4">
                  Create and manage your free, subscriber-only, and pay-per-view content
                </p>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Create New Content
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <ContentScheduler />
        </TabsContent>

        <TabsContent value="vault" className="space-y-6">
          <MediaVault />
        </TabsContent>

        <TabsContent value="earnings" className="space-y-6">
          <TippingHistory />
        </TabsContent>

        <TabsContent value="payouts" className="space-y-6">
          <PayoutSettings />
        </TabsContent>

        <TabsContent value="chat" className="space-y-6">
          <EnhancedChatSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatorDashboard;
