
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Unlock, Eye, DollarSign, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface MediaItem {
  id: string;
  title: string;
  type: 'image' | 'video';
  thumbnail: string;
  isLocked: boolean;
  price?: number;
  views: number;
  earnings: number;
  uploadDate: string;
}

const MediaVault: React.FC = () => {
  const [mediaItems] = useState<MediaItem[]>([
    {
      id: '1',
      title: 'Beach Photoshoot',
      type: 'image',
      thumbnail: '/lovable-uploads/e9a765be-fbd7-4cb2-9e68-e5d1575f4780.png',
      isLocked: true,
      price: 4.99,
      views: 127,
      earnings: 63.47,
      uploadDate: '2024-06-25'
    },
    {
      id: '2',
      title: 'Workout Video',
      type: 'video',
      thumbnail: '/lovable-uploads/e9a765be-fbd7-4cb2-9e68-e5d1575f4780.png',
      isLocked: false,
      views: 89,
      earnings: 0,
      uploadDate: '2024-06-24'
    },
    {
      id: '3',
      title: 'Behind the Scenes',
      type: 'video',
      thumbnail: '/lovable-uploads/e9a765be-fbd7-4cb2-9e68-e5d1575f4780.png',
      isLocked: true,
      price: 7.99,
      views: 45,
      earnings: 35.96,
      uploadDate: '2024-06-23'
    }
  ]);

  const handleToggleLock = (id: string) => {
    toast.success('Media lock status updated');
    console.log('Toggling lock for media:', id);
  };

  const handleDeleteMedia = (id: string) => {
    toast.success('Media deleted successfully');
    console.log('Deleting media:', id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lock className="w-5 h-5 mr-2 text-purple-600" />
          Media Vault
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mediaItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge variant={item.isLocked ? "destructive" : "secondary"}>
                    {item.isLocked ? <Lock className="w-3 h-3 mr-1" /> : <Unlock className="w-3 h-3 mr-1" />}
                    {item.isLocked ? 'Locked' : 'Free'}
                  </Badge>
                </div>
                {item.isLocked && item.price && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-600">
                      ${item.price}
                    </Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-3">
                <h4 className="font-semibold text-sm mb-2">{item.title}</h4>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Eye className="w-3 h-3 mr-1" />
                    {item.views} views
                  </div>
                  <div className="flex items-center text-green-600">
                    <DollarSign className="w-3 h-3 mr-1" />
                    ${item.earnings}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleLock(item.id)}
                    className="flex-1"
                  >
                    {item.isLocked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteMedia(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaVault;
