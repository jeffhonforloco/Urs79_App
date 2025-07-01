
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, CheckCircle, AlertTriangle, Clock, Download, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface KYCApplication {
  id: string;
  userId: string;
  userName: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected' | 'needs_review';
  documentType: 'drivers_license' | 'passport' | 'id_card';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
}

const KYCCompliance: React.FC = () => {
  const [activeTab, setActiveTab] = useState('applications');
  const [applications] = useState<KYCApplication[]>([
    {
      id: '1',
      userId: 'user123',
      userName: 'John Doe',
      email: 'john@example.com',
      status: 'pending',
      documentType: 'drivers_license',
      submittedAt: '2024-01-20 10:30'
    },
    {
      id: '2',
      userId: 'user456',
      userName: 'Jane Smith',
      email: 'jane@example.com',
      status: 'approved',
      documentType: 'passport',
      submittedAt: '2024-01-19 15:45',
      reviewedAt: '2024-01-20 09:15',
      reviewedBy: 'Admin User'
    },
    {
      id: '3',
      userId: 'user789',
      userName: 'Bob Wilson',
      email: 'bob@example.com',
      status: 'needs_review',
      documentType: 'id_card',
      submittedAt: '2024-01-18 14:20',
      notes: 'Document quality unclear, needs manual review'
    }
  ]);

  const handleKYCAction = (applicationId: string, action: 'approve' | 'reject' | 'request_more') => {
    toast.success(`KYC application ${action}ed successfully`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'needs_review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case 'drivers_license': return 'Driver\'s License';
      case 'passport': return 'Passport';
      case 'id_card': return 'ID Card';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            KYC Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
            </TabsList>

            <TabsContent value="applications">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{app.userName}</p>
                          <p className="text-sm text-gray-600">{app.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4" />
                          <span>{getDocumentTypeLabel(app.documentType)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(app.status)}>
                          {app.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>{app.submittedAt}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3 mr-1" />
                            Review
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                          {app.status === 'pending' || app.status === 'needs_review' ? (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleKYCAction(app.id, 'approve')}
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleKYCAction(app.id, 'reject')}
                              >
                                Reject
                              </Button>
                            </>
                          ) : null}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>KYC Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="min-age">Minimum Age</Label>
                      <Input id="min-age" type="number" defaultValue="18" />
                    </div>
                    <div>
                      <Label htmlFor="doc-expiry">Document Expiry Buffer (days)</Label>
                      <Input id="doc-expiry" type="number" defaultValue="30" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="allowed-docs">Allowed Document Types</Label>
                    <div className="mt-2 space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span>Driver's License</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span>Passport</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span>National ID Card</span>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Auto-Verification Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="auto-approve">Auto-approve confidence threshold (%)</Label>
                    <Input id="auto-approve" type="number" defaultValue="95" />
                    <p className="text-sm text-gray-600 mt-1">
                      Documents with AI confidence above this threshold will be auto-approved
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="manual-review">Manual review threshold (%)</Label>
                    <Input id="manual-review" type="number" defaultValue="70" />
                    <p className="text-sm text-gray-600 mt-1">
                      Documents below this threshold require manual review
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Applications</p>
                        <p className="text-2xl font-bold">1,247</p>
                      </div>
                      <FileText className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Approved</p>
                        <p className="text-2xl font-bold">1,089</p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Pending Review</p>
                        <p className="text-2xl font-bold">47</p>
                      </div>
                      <Clock className="w-8 h-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Compliance Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-green-800">Age Verification Compliance</p>
                        <p className="text-sm text-green-600">87.3% of users verified</p>
                      </div>
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                      <div>
                        <p className="font-medium text-yellow-800">Document Quality</p>
                        <p className="text-sm text-yellow-600">12 applications need manual review</p>
                      </div>
                      <AlertTriangle className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium text-blue-800">Processing Time</p>
                        <p className="text-sm text-blue-600">Average: 2.3 hours</p>
                      </div>
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default KYCCompliance;
