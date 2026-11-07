import { 
  Maximize, 
  Minimize, 
  Rotate3D, 
  Move, 
  Focus, 
  ArrowUpToLine, 
  ArrowRightToLine, 
  MonitorUp,
  RotateCcw
} from 'lucide-react';
import { IconButton } from '../common/Button';
import { Card } from '../common/Card';

interface ViewerToolbarProps {
  onCameraView: (view: 'Orbit' | 'Pan' | 'Top' | 'Front' | 'Side' | 'Reset') => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export default function ViewerToolbar({ onCameraView, isFullscreen, onToggleFullscreen }: ViewerToolbarProps) {
  return (
    <Card className="flex items-center gap-1 p-1 bg-surface/90 backdrop-blur-sm border-border/60 shadow-md">
      <IconButton 
        variant="ghost" 
        size="sm" 
        icon={<Rotate3D className="w-4 h-4" />} 
        onClick={() => onCameraView('Orbit')} 
        title="Orbit"
        aria-label="Orbit"
      />
      <IconButton 
        variant="ghost" 
        size="sm" 
        icon={<Move className="w-4 h-4" />} 
        onClick={() => onCameraView('Pan')} 
        title="Pan"
        aria-label="Pan"
      />
      <div className="w-px h-4 bg-border mx-1" />
      <IconButton 
        variant="ghost" 
        size="sm" 
        icon={<Focus className="w-4 h-4" />} 
        onClick={() => onCameraView('Reset')} 
        title="Fit Model"
        aria-label="Fit Model"
      />
      <IconButton 
        variant="ghost" 
        size="sm" 
        icon={<ArrowUpToLine className="w-4 h-4" />} 
        onClick={() => onCameraView('Top')} 
        title="Top View"
        aria-label="Top View"
      />
      <IconButton 
        variant="ghost" 
        size="sm" 
        icon={<ArrowRightToLine className="w-4 h-4" />} 
        onClick={() => onCameraView('Front')} 
        title="Front View"
        aria-label="Front View"
      />
      <IconButton 
        variant="ghost" 
        size="sm" 
        icon={<MonitorUp className="w-4 h-4" />} 
        onClick={() => onCameraView('Side')} 
        title="Side View"
        aria-label="Side View"
      />
      <div className="w-px h-4 bg-border mx-1" />
      <IconButton 
        variant="ghost" 
        size="sm" 
        icon={<RotateCcw className="w-4 h-4" />} 
        onClick={() => onCameraView('Reset')} 
        title="Reset Camera"
        aria-label="Reset Camera"
      />
      <IconButton 
        variant="ghost" 
        size="sm" 
        icon={isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />} 
        onClick={onToggleFullscreen} 
        title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
      />
    </Card>
  );
}
