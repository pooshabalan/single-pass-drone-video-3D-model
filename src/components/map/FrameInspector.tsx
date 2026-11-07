import { Image as ImageIcon, Camera, MapPin, Maximize, Clock, Database } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../common/Card';
import { Badge } from '../common/Badge';
import type { DroneFrame } from '../../data/mockDroneFrames';

interface FrameInspectorProps {
  frame: DroneFrame;
  onClose?: () => void;
}

export default function FrameInspector({ frame, onClose }: FrameInspectorProps) {
  return (
    <div className="w-full flex flex-col space-y-6">
      <Card>
        <CardHeader 
          title="Selected Flight Position" 
          icon={<MapPin className="w-4 h-4" />} 
          action={onClose ? <button onClick={onClose} className="text-secondary-text hover:text-primary transition-colors text-[12px]">Close</button> : undefined}
        />
        <CardContent className="space-y-3 p-4 text-[13px]">
          <div className="flex items-center space-x-2 mb-3">
            <Badge variant="info" className="text-[11px] font-bold">
              Waypoint {frame.waypointId.toString().padStart(2, '0')}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-y-2 gap-x-4">
            <div>
              <span className="text-secondary-text block text-[11px] uppercase tracking-wider mb-1">Latitude</span>
              <span className="text-primary font-mono">{frame.latitude.toFixed(6)}°</span>
            </div>
            <div>
              <span className="text-secondary-text block text-[11px] uppercase tracking-wider mb-1">Longitude</span>
              <span className="text-primary font-mono">{frame.longitude.toFixed(6)}°</span>
            </div>
            <div>
              <span className="text-secondary-text block text-[11px] uppercase tracking-wider mb-1">Altitude</span>
              <span className="text-primary font-mono">{frame.altitude.toFixed(1)} m</span>
            </div>
            <div>
              <span className="text-secondary-text block text-[11px] uppercase tracking-wider mb-1">Timestamp</span>
              <span className="text-primary font-mono">{frame.timestamp}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader 
          title="Captured Frame" 
          icon={<Camera className="w-4 h-4" />} 
          action={<Badge variant="warning" className="text-[9px] uppercase">Simulation Data</Badge>}
        />
        <CardContent className="p-4 space-y-4">
          <div className="relative w-full aspect-video rounded-md overflow-hidden border border-border bg-secondary flex items-center justify-center group">
            <img 
              src={frame.imagePath} 
              alt={`Frame ${frame.frameNumber}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button className="bg-primary/20 backdrop-blur-sm border border-white/20 text-white p-2 rounded-full hover:bg-primary/40 transition-colors">
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2 text-[12px]">
            <div className="flex justify-between items-center py-1 border-b border-border/50">
              <span className="text-secondary-text flex items-center"><ImageIcon className="w-3 h-3 mr-1.5"/> Frame ID</span>
              <span className="text-primary font-mono">{frame.frameNumber}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-border/50">
              <span className="text-secondary-text flex items-center"><Maximize className="w-3 h-3 mr-1.5"/> Resolution</span>
              <span className="text-primary font-mono">{frame.imageWidth} × {frame.imageHeight}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-border/50">
              <span className="text-secondary-text flex items-center"><Clock className="w-3 h-3 mr-1.5"/> Offset</span>
              <span className="text-primary font-mono">{frame.timestamp}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-secondary-text flex items-center"><Database className="w-3 h-3 mr-1.5"/> Quality</span>
              <span className="text-accent font-medium">{frame.quality}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
