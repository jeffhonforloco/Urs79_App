
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Building, Wallet, Check } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  enabled: boolean;
}

const PaymentIntegration: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'stripe',
      name: 'Stripe Connect',
      icon: <CreditCard className="w-5 h-5" />,
      description: 'Global payment processing with instant payouts',
      enabled: true,
    },
    {
      id: 'payoneer',
      name: 'Payoneer',
      icon: <Building className="w-5 h-5" />,
      description: 'International payments and currency conversion',
      enabled: true,
    },
    {
      id: 'crypto',
      name: 'Crypto Wallet',
      icon: <Wallet className="w-5 h-5" />,
      description: 'USDC, USDT, ETH payments',
      enabled: false,
    },
  ];

  const handlePaymentSetup = async (methodId: string) => {
    setIsProcessing(true);
    
    // Mock payment setup
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success(`${paymentMethods.find(m => m.id === methodId)?.name} connected successfully!`);
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Payment Integration</h2>
        <p className="text-white/70">Connect your payment methods to start earning</p>
      </div>

      <div className="grid gap-4">
        {paymentMethods.map((method) => (
          <Card 
            key={method.id}
            className={`glass cursor-pointer transition-all ${
              selectedMethod === method.id ? 'ring-2 ring-pink-500' : ''
            } ${!method.enabled ? 'opacity-50' : ''}`}
            onClick={() => method.enabled && setSelectedMethod(method.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{method.name}</h3>
                    <p className="text-sm text-white/70">{method.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!method.enabled && (
                    <Badge variant="secondary">Coming Soon</Badge>
                  )}
                  {selectedMethod === method.id && method.enabled && (
                    <Check className="w-5 h-5 text-pink-500" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        onClick={() => handlePaymentSetup(selectedMethod)}
        disabled={isProcessing || !paymentMethods.find(m => m.id === selectedMethod)?.enabled}
        className="w-full btn-primary"
      >
        {isProcessing ? 'Connecting...' : 'Connect Payment Method'}
      </Button>
    </div>
  );
};

export default PaymentIntegration;
