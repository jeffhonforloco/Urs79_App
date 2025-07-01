
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Brain, Eye, MessageSquare, Image, Video, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { toast } from 'sonner';

interface ContentItem {
  id: string;
  type: 'image' | 'video' | 'text' | 'profile';
  content: string;
  userId: string;
  userName: string;
  aiScore: number;
  flags: string[];
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
}

interface ModerationSettings {
  autoApprove: boolean;
  autoReject: boolean;
  nudityDetection: boolean;
  textAnalysis: boolean;
  ageVerification: boolean;
  threshold: number;
}

const AIContentModeration: React.FC = () => {
  const [settings, setSettings] = useState<ModerationSettings>({
    autoApprove: true,
    autoReject: false,
    nudityDetection: true,
    textAnalysis: true,
    ageVerification: true,
    threshold: 0.7
  });

  const [contentQueue] = useState<ContentItem[]>([
    {
      id: '1',
      type: 'image',
      content: 'Profile photo uploaded',
      userId: 'user123',
      userName: 'John Doe',
      aiScore: 0.92,
      flags: ['nudity', 'inappropriate'],
      status: 'pending',
      timestamp: '2024-01-20 14:30'
    },
    {
      id: '2',
      type: 'text',
      content: 'Message content flagged for review',
      userId: 'user456',
      userName: 'Jane Smith',
      aiScore: 0.65,
      flags: ['harassment'],
      status: 'pending',
      timestamp: '2024-01-20 14:25'
    },
    {
      id: '3',
      type: 'profile',
      content: 'Profile description updated',
      userId: 'user789',
      userName: 'Bob Wilson',
      aiScore: 0.45,
      flags: ['spam'],
      status: 'approved',
      timestamp: '2024-01-20 14:20'
    }
  ]);

  const handleContentAction = (contentId: string, action: 'approve' | 'reject') => {
    toast.success(`Content ${action}ed successfully`);
  };

  const handleSettingChange = (key: keyof ModerationSettings, value: boolean | number) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    toast.success('Moderation settings updated');
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-red-600';
    if (score >= 0.5) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-purple-600" />
            AI Content Moderation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="queue" className="space-y-4">
            <TabsList>
              <TabsTrigger value="queue">Review Queue</TabsTrigger>
              <TabsTrigger value="settings">AI Settings</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="queue">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Content</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>AI Score</TableHead>
                    <TableHead>Flags</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contentQueue.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {item.type === 'image' && <Image className="w-4 h-4" />}
                          {item.type === 'video' && <Video className="w-4 h-4" />}
                          {item.type === 'text' && <MessageSquare className="w-4 h-4" />}
                          {item.type === 'profile' && <Eye className="w-4 h-4" />}
                          <div>
                            <p className="font-medium">{item.content}</p>
                            <p className="text-xs text-gray-500">{item.timestamp}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{item.userName}</TableCell>
                      <TableCell>
                        <span className={`font-medium ${getScoreColor(item.aiScore)}`}>
                          {(item.aiScore * 100).toFixed(0)}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {item.flags.map((flag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {flag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {item.status === 'pending' && (
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleContentAction(item.id, 'approve')}
                            >
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleContentAction(item.id, 'reject')}
                            >
                              <X className="w-3 h-3 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Automated Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Auto-approve low risk content</Label>
                        <p className="text-sm text-gray-600">Content with AI score below threshold</p>
                      </div>
                      <Switch
                        checked={settings.autoApprove}
                        onCheckedChange={(checked) => handleSettingChange('autoApprove', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Auto-reject high risk content</Label>
                        <p className="text-sm text-gray-600">Content with AI score above 90%</p>
                      </div>
                      <Switch
                        checked={settings.autoReject}
                        onCheckedChange={(checked) => handleSettingChange('autoReject', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Detection Features</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Nudity Detection</Label>
                        <p className="text-sm text-gray-600">Scan images for explicit content</p>
                      </div>
                      <Switch
                        checked={settings.nudityDetection}
                        onCheckedChange={(checked) => handleSettingChange('nudityDetection', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Text Analysis</Label>
                        <p className="text-sm text-gray-600">Analyze text for harassment, spam</p>
                      </div>
                      <Switch
                        checked={settings.textAnalysis}
                        onCheckedChange={(checked) => handleSettingChange('textAnalysis', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Age Verification</Label>
                        <p className="text-sm text-gray-600">Verify user appears 18+</p>
                      </div>
                      <Switch
                        checked={settings.ageVerification}
                        onCheckedChange={(checked) => handleSettingChange('ageVerification', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Content Processed</p>
                        <p className="text-2xl font-bold">2,847</p>
                      </div>
                      <Brain className="w-8 h-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Auto-approved</p>
                        <p className="text-2xl font-bold">2,654</p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Flagged for Review</p>
                        <p className="text-2xl font-bold">193</p>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIContentModeration;
