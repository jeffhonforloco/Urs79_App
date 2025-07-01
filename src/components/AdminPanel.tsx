
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Shield, Users, AlertTriangle, Ban, CheckCircle, Search, Filter } from 'lucide-react';
import { toast } from 'sonner';
import AIContentModeration from './AIContentModeration';
import KYCCompliance from './KYCCompliance';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'suspended' | 'banned';
  verified: boolean;
  reports: number;
  joinDate: string;
  lastActive: string;
}

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [users] = useState<AdminUser[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      status: 'active',
      verified: true,
      reports: 0,
      joinDate: '2024-01-15',
      lastActive: '2024-01-20'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'active',
      verified: false,
      reports: 2,
      joinDate: '2024-01-10',
      lastActive: '2024-01-19'
    },
    {
      id: '3',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      status: 'suspended',
      verified: true,
      reports: 5,
      joinDate: '2024-01-05',
      lastActive: '2024-01-18'
    }
  ]);

  const handleUserAction = (userId: string, action: 'suspend' | 'ban' | 'activate') => {
    toast.success(`User ${action}ed successfully`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-yellow-100 text-yellow-800';
      case 'banned': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
        <p className="text-gray-600">Manage users, content moderation, and compliance</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Users</span>
          </TabsTrigger>
          <TabsTrigger value="moderation" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Moderation</span>
          </TabsTrigger>
          <TabsTrigger value="kyc" className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>KYC</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Analytics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>User Management</span>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Verified</TableHead>
                    <TableHead>Reports</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.verified ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        )}
                      </TableCell>
                      <TableCell>
                        <span className={user.reports > 0 ? 'text-red-600 font-medium' : ''}>
                          {user.reports}
                        </span>
                      </TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {user.status === 'active' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUserAction(user.id, 'suspend')}
                            >
                              Suspend
                            </Button>
                          )}
                          {user.status === 'suspended' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUserAction(user.id, 'activate')}
                            >
                              Activate
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleUserAction(user.id, 'ban')}
                          >
                            <Ban className="w-3 h-3 mr-1" />
                            Ban
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moderation">
          <AIContentModeration />
        </TabsContent>

        <TabsContent value="kyc">
          <KYCCompliance />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold">1,234</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Reports</p>
                    <p className="text-2xl font-bold">23</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Suspended Users</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <Ban className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Verified Users</p>
                    <p className="text-2xl font-bold">891</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
