
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, TrendingUp, Download, Filter } from 'lucide-react';

interface TipRecord {
  id: string;
  amount: number;
  from: string;
  message?: string;
  timestamp: string;
  type: 'tip' | 'unlock' | 'pay-per-view';
}

const TippingHistory: React.FC = () => {
  const [tipHistory] = useState<TipRecord[]>([
    {
      id: '1',
      amount: 25.00,
      from: 'User123',
      message: 'Love your content! ❤️',
      timestamp: '2024-06-28T14:30:00Z',
      type: 'tip'
    },
    {
      id: '2',
      amount: 4.99,
      from: 'Fan456',
      timestamp: '2024-06-28T12:15:00Z',
      type: 'unlock'
    },
    {
      id: '3',
      amount: 7.99,
      from: 'Viewer789',
      timestamp: '2024-06-27T18:45:00Z',
      type: 'pay-per-view'
    },
    {
      id: '4',
      amount: 12.50,
      from: 'Admirer321',
      message: 'Keep up the amazing work!',
      timestamp: '2024-06-27T16:20:00Z',
      type: 'tip'
    }
  ]);

  const totalTips = tipHistory.reduce((sum, tip) => sum + tip.amount, 0);
  const todayTips = tipHistory
    .filter(tip => new Date(tip.timestamp).toDateString() === new Date().toDateString())
    .reduce((sum, tip) => sum + tip.amount, 0);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'tip': return 'bg-green-100 text-green-800';
      case 'unlock': return 'bg-blue-100 text-blue-800';
      case 'pay-per-view': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleExport = () => {
    console.log('Exporting tip history...');
    // Simulate CSV export
    const csvContent = tipHistory.map(tip => 
      `${tip.timestamp},${tip.from},${tip.amount},${tip.type},${tip.message || ''}`
    ).join('\n');
    console.log('CSV Data:', csvContent);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tips</p>
                <p className="text-2xl font-bold text-green-600">${totalTips.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Tips</p>
                <p className="text-2xl font-bold text-blue-600">${todayTips.toFixed(2)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold text-purple-600">{tipHistory.length}</p>
              </div>
              <Filter className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Tipping & Revenue History</CardTitle>
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="tip">Tips</TabsTrigger>
              <TabsTrigger value="unlock">Unlocks</TabsTrigger>
              <TabsTrigger value="pay-per-view">Pay-Per-View</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {tipHistory.map((tip) => (
                <div key={tip.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <span className="font-medium">{tip.from}</span>
                      <Badge className={getTypeColor(tip.type)}>
                        {tip.type.replace('-', ' ')}
                      </Badge>
                    </div>
                    {tip.message && (
                      <p className="text-sm text-gray-600 italic">"{tip.message}"</p>
                    )}
                    <p className="text-xs text-gray-500">
                      {new Date(tip.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-green-600">
                      +${tip.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </TabsContent>

            {/* Filter by type tabs would show filtered results */}
            <TabsContent value="tip">
              {tipHistory.filter(tip => tip.type === 'tip').map((tip) => (
                <div key={tip.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <span className="font-medium">{tip.from}</span>
                      <Badge className="bg-green-100 text-green-800">Tip</Badge>
                    </div>
                    {tip.message && (
                      <p className="text-sm text-gray-600 italic">"{tip.message}"</p>
                    )}
                    <p className="text-xs text-gray-500">
                      {new Date(tip.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-green-600">
                      +${tip.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TippingHistory;
