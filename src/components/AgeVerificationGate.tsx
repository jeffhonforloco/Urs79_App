
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, AlertTriangle, Camera, FileText } from 'lucide-react';
import { toast } from 'sonner';

const AgeVerificationGate = ({ onVerified }: { onVerified: () => void }) => {
  const { user, updateProfile } = useAuth();
  const [verificationMethod, setVerificationMethod] = useState<'id' | 'api' | null>(null);
  const [uploadedId, setUploadedId] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleIdUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedId(file);
    }
  };

  const handleSubmitVerification = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      updateProfile({ 
        ageVerified: true,
        verificationPending: false 
      });
      
      toast.success('Age verification submitted successfully! Review typically takes 24-48 hours.');
      onVerified();
    } catch (error) {
      toast.error('Verification submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApiVerification = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate third-party API verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      updateProfile({ 
        ageVerified: true,
        verificationPending: false 
      });
      
      toast.success('Age verified successfully!');
      onVerified();
    } catch (error) {
      toast.error('API verification failed. Please try ID verification instead.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-red-200">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-red-700">Age Verification Required</CardTitle>
          <p className="text-gray-600">
            You must be 18 or older to access this platform. Please verify your age to continue.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div className="text-sm text-red-800">
                <p className="font-semibold mb-1">Important Notice:</p>
                <ul className="space-y-1">
                  <li>• This platform is strictly for users 18 years and older</li>
                  <li>• False age verification is prohibited and will result in permanent ban</li>
                  <li>• Your verification data is encrypted and securely stored</li>
                  <li>• Verification is required for Casual Mode and Creator features</li>
                </ul>
              </div>
            </div>
          </div>

          {!verificationMethod ? (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Choose Verification Method:</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="cursor-pointer hover:bg-gray-50 transition-colors" 
                      onClick={() => setVerificationMethod('id')}>
                  <CardContent className="p-4 text-center">
                    <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-medium mb-1">Government ID</h4>
                    <p className="text-sm text-gray-600">Upload driver's license, passport, or state ID</p>
                    <Badge className="mt-2 bg-blue-100 text-blue-800">Manual Review</Badge>
                  </CardContent>
                </Card>
                
                <Card className="cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => setVerificationMethod('api')}>
                  <CardContent className="p-4 text-center">
                    <Camera className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-medium mb-1">Live Verification</h4>
                    <p className="text-sm text-gray-600">Real-time face scan with ID verification</p>
                    <Badge className="mt-2 bg-green-100 text-green-800">Instant</Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : verificationMethod === 'id' ? (
            <div className="space-y-4">
              <Button variant="outline" onClick={() => setVerificationMethod(null)}>
                ← Back to methods
              </Button>
              
              <div>
                <Label htmlFor="id-upload">Upload Government-Issued ID</Label>
                <Input
                  id="id-upload"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleIdUpload}
                  className="mt-1"
                />
                <p className="text-xs text-gray-600 mt-1">
                  Accepted: Driver's License, Passport, State ID (JPG, PNG, PDF)
                </p>
              </div>
              
              {uploadedId && (
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    ✓ {uploadedId.name} uploaded successfully
                  </p>
                </div>
              )}
              
              <Button 
                onClick={handleSubmitVerification}
                disabled={!uploadedId || isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Submitting...' : 'Submit for Review'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Button variant="outline" onClick={() => setVerificationMethod(null)}>
                ← Back to methods
              </Button>
              
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Click below to start live verification. You'll need:
                </p>
                <ul className="text-sm text-gray-600 mb-6 space-y-1">
                  <li>• Government-issued photo ID</li>
                  <li>• Well-lit environment</li>
                  <li>• Camera access</li>
                </ul>
              </div>
              
              <Button 
                onClick={handleApiVerification}
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? 'Verifying...' : 'Start Live Verification'}
              </Button>
            </div>
          )}
          
          <div className="text-center pt-4 border-t">
            <p className="text-xs text-gray-500">
              By proceeding, you confirm you are 18+ and agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgeVerificationGate;
