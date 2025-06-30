
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Upload } from 'lucide-react';
import { toast } from 'sonner';

const ContentScheduler: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contentType, setContentType] = useState('free');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [price, setPrice] = useState('');

  const handleScheduleContent = () => {
    if (!title || !scheduleDate || !scheduleTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simulate scheduling content
    console.log('Scheduling content:', {
      title,
      description,
      contentType,
      scheduledFor: `${scheduleDate} ${scheduleTime}`,
      price: contentType === 'pay-per-view' ? price : null
    });

    toast.success('Content scheduled successfully!');
    
    // Reset form
    setTitle('');
    setDescription('');
    setContentType('free');
    setScheduleDate('');
    setScheduleTime('');
    setPrice('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-purple-600" />
          Schedule Content Drop
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="content-title">Content Title</Label>
          <Input
            id="content-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter content title"
          />
        </div>

        <div>
          <Label htmlFor="content-description">Description</Label>
          <Textarea
            id="content-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your content..."
            rows={3}
          />
        </div>

        <div>
          <Label>Content Type</Label>
          <Select value={contentType} onValueChange={setContentType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free">Free Content</SelectItem>
              <SelectItem value="subscriber">Subscriber Only</SelectItem>
              <SelectItem value="pay-per-view">Pay-Per-View</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {contentType === 'pay-per-view' && (
          <div>
            <Label htmlFor="content-price">Price ($)</Label>
            <Input
              id="content-price"
              type="number"
              min="0.99"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="9.99"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="schedule-date">Schedule Date</Label>
            <Input
              id="schedule-date"
              type="date"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="schedule-time">Schedule Time</Label>
            <Input
              id="schedule-time"
              type="time"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
            />
          </div>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">
            Drag and drop media files here or click to upload
          </p>
          <Button variant="outline" className="mt-2">
            Upload Media
          </Button>
        </div>

        <Button 
          onClick={handleScheduleContent}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          <Clock className="w-4 h-4 mr-2" />
          Schedule Content
        </Button>
      </CardContent>
    </Card>
  );
};

export default ContentScheduler;
