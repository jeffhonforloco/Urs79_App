
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { CreditCard, Building, Wallet, Shield } from 'lucide-react';
import { toast } from 'sonner';

const PayoutSettings: React.FC = () => {
  const [payoutMethod, setPayoutMethod] = useState('stripe');
  const [autoPayouts, setAutoPayouts] = useState(true);
  const [minPayoutAmount, setMinPayoutAmount] = useState('50');
  const [kycVerified, setKycVerified] = useState(false);

  const handleSaveSettings = () => {
    toast.success('Payout settings saved successfully');
    console.log('Payout settings:', {
      payoutMethod,
      autoPayouts,
      minPayoutAmount,
      kycVerified
    });
  };

  const handleKycVerification = () => {
    toast.success('KYC verification process started');
    console.log('Starting KYC verification...');
    // Simulate KYC process
    setTimeout(() => {
      setKycVerified(true);
      toast.success('KYC verification completed');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-green-600" />
            Payout Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* KYC Verification Status */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-600" />
                <span className="font-medium">KYC Verification</span>
              </div>
              <Badge variant={kycVerified ? "default" : "secondary"}>
                {kycVerified ? 'Verified' : 'Pending'}
              </Badge>
            </div>
            <p className="text-sm text-blue-700 mb-3">
              Complete KYC verification to enable payouts and comply with financial regulations.
            </p>
            {!kycVerified && (
              <Button 
                onClick={handleKycVerification}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Start KYC Verification
              </Button>
            )}
          </div>

          {/* Payout Method Selection */}
          <div>
            <Label>Payout Method</Label>
            <Select value={payoutMethod} onValueChange={setPayoutMethod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stripe">
                  <div className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Stripe Connect
                  </div>
                </SelectItem>
                <SelectItem value="payoneer">
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-2" />
                    Payoneer
                  </div>
                </SelectItem>
                <SelectItem value="crypto">
                  <div className="flex items-center">
                    <Wallet className="w-4 h-4 mr-2" />
                    Crypto Wallet
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Payout Method Details */}
          {payoutMethod === 'stripe' && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium">Stripe Connect Details</h4>
              <div>
                <Label htmlFor="stripe-account">Stripe Account ID</Label>
                <Input
                  id="stripe-account"
                  placeholder="acct_1234567890"
                  disabled={!kycVerified}
                />
              </div>
              <p className="text-sm text-gray-600">
                Connect your Stripe account to receive automatic payouts every Friday.
              </p>
            </div>
          )}

          {payoutMethod === 'payoneer' && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium">Payoneer Details</h4>
              <div>
                <Label htmlFor="payoneer-email">Payoneer Email</Label>
                <Input
                  id="payoneer-email"
                  type="email"
                  placeholder="your-email@example.com"
                  disabled={!kycVerified}
                />
              </div>
              <p className="text-sm text-gray-600">
                Enter your Payoneer account email for international payouts.
              </p>
            </div>
          )}

          {payoutMethod === 'crypto' && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium">Crypto Wallet Details</h4>
              <div>
                <Label htmlFor="wallet-address">Wallet Address</Label>
                <Input
                  id="wallet-address"
                  placeholder="0x1234567890abcdef..."
                  disabled={!kycVerified}
                />
              </div>
              <div>
                <Label>Cryptocurrency</Label>
                <Select disabled={!kycVerified}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cryptocurrency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usdc">USDC</SelectItem>
                    <SelectItem value="usdt">USDT</SelectItem>
                    <SelectItem value="eth">Ethereum</SelectItem>
                    <SelectItem value="btc">Bitcoin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-gray-600">
                Receive payouts in cryptocurrency. Additional fees may apply.
              </p>
            </div>
          )}

          {/* Auto Payout Settings */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Automatic Payouts</Label>
              <p className="text-sm text-gray-600">
                Enable automatic weekly payouts when minimum threshold is reached
              </p>
            </div>
            <Switch
              checked={autoPayouts}
              onCheckedChange={setAutoPayouts}
              disabled={!kycVerified}
            />
          </div>

          {autoPayouts && (
            <div>
              <Label htmlFor="min-payout">Minimum Payout Amount ($)</Label>
              <Input
                id="min-payout"
                type="number"
                min="10"
                value={minPayoutAmount}
                onChange={(e) => setMinPayoutAmount(e.target.value)}
                disabled={!kycVerified}
              />
              <p className="text-xs text-gray-600 mt-1">
                Minimum: $10.00
              </p>
            </div>
          )}

          <Button 
            onClick={handleSaveSettings}
            disabled={!kycVerified}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            Save Payout Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayoutSettings;
