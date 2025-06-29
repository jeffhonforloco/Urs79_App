
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Flag, Shield, Ban } from 'lucide-react';
import { toast } from 'sonner';

interface ContentModerationProps {
  contentId: string;
  contentType: 'profile' | 'message' | 'photo';
  userId: string;
}

const ContentModerationSystem = ({ contentId, contentType, userId }: ContentModerationProps) => {
  const [reportReason, setReportReason] = useState('');
  const [isReporting, setIsReporting] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);

  const reportReasons = [
    'Inappropriate content',
    'Harassment or bullying', 
    'Spam or fake profile',
    'Underage user',
    'Nudity or sexual content',
    'Hate speech',
    'Violence or threats',
    'Other'
  ];

  const handleReport = async (reason: string) => {
    setIsReporting(true);
    
    try {
      // Simulate reporting API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // AI content analysis simulation
      const flaggedContent = await analyzeContent(contentId, contentType);
      
      toast.success('Report submitted successfully. Our team will review this content.');
      setShowReportForm(false);
      
      // Auto-moderate if AI flags high-risk content
      if (flaggedContent.risk === 'high') {
        await autoModerateContent(contentId, userId);
      }
    } catch (error) {
      toast.error('Failed to submit report. Please try again.');
    } finally {
      setIsReporting(false);
    }
  };

  const analyzeContent = async (contentId: string, type: string) => {
    // Simulate AI content analysis
    const riskLevels = ['low', 'medium', 'high'];
    const randomRisk = riskLevels[Math.floor(Math.random() * riskLevels.length)];
    
    return {
      contentId,
      type,
      risk: randomRisk,
      flags: randomRisk === 'high' ? ['nudity', 'inappropriate'] : [],
      confidence: Math.random() * 100
    };
  };

  const autoModerateContent = async (contentId: string, userId: string) => {
    // Simulate auto-moderation actions
    toast.warning('Content has been automatically hidden pending review.');
    
    // Could trigger additional actions like temporary restrictions
    if (Math.random() > 0.7) {
      toast.error('User has been temporarily restricted due to policy violations.');
    }
  };

  const handleBlock = async () => {
    try {
      // Simulate blocking user
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success('User blocked successfully.');
    } catch (error) {
      toast.error('Failed to block user.');
    }
  };

  if (!showReportForm) {
    return (
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowReportForm(true)}
          className="text-red-600 border-red-300 hover:bg-red-50"
        >
          <Flag className="w-4 h-4 mr-1" />
          Report
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleBlock}
          className="text-gray-600 border-gray-300 hover:bg-gray-50"
        >
          <Ban className="w-4 h-4 mr-1" />
          Block
        </Button>
      </div>
    );
  }

  return (
    <Card className="border-red-200">
      <CardHeader>
        <CardTitle className="flex items-center text-red-700">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Report Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-gray-600 mb-3">Why are you reporting this {contentType}?</p>
          <div className="grid grid-cols-2 gap-2">
            {reportReasons.map((reason) => (
              <Button
                key={reason}
                variant={reportReason === reason ? "default" : "outline"}
                size="sm"
                onClick={() => setReportReason(reason)}
                className="text-left justify-start"
              >
                {reason}
              </Button>
            ))}
          </div>
        </div>

        {reportReason === 'Other' && (
          <div>
            <label className="text-sm font-medium text-gray-700">Additional details:</label>
            <Textarea
              placeholder="Please provide more details about your report..."
              className="mt-1"
              rows={3}
            />
          </div>
        )}

        <div className="flex space-x-3">
          <Button
            onClick={() => handleReport(reportReason)}
            disabled={!reportReason || isReporting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isReporting ? 'Submitting...' : 'Submit Report'}
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowReportForm(false)}
          >
            Cancel
          </Button>
        </div>

        <div className="text-xs text-gray-500 pt-2 border-t">
          <div className="flex items-center space-x-1">
            <Shield className="w-3 h-3" />
            <span>Reports are reviewed by our moderation team within 24 hours</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentModerationSystem;
