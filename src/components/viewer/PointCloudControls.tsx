import { BoxSelect } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../common/Card';
import type { PointCloudDefaults } from '../../data/mockModel';

interface PointCloudControlsProps {
  settings: PointCloudDefaults;
  onUpdateSettings: (updates: Partial<PointCloudDefaults>) => void;
  meshMode: 'Solid' | 'Wireframe' | 'Solid + Wireframe';
  onUpdateMeshMode: (mode: 'Solid' | 'Wireframe' | 'Solid + Wireframe') => void;
}

export default function PointCloudControls({ settings, onUpdateSettings, meshMode, onUpdateMeshMode }: PointCloudControlsProps) {
  return (
    <Card>
      <CardHeader title="Point Cloud & Mesh" icon={<BoxSelect className="w-4 h-4" />} />
      <CardContent className="space-y-4 p-4 text-[13px]">
        
        {/* Visibility */}
        <div className="flex items-center justify-between">
          <span className="text-secondary-text">Visibility</span>
          <button 
            className={`px-3 py-1 rounded-sm border text-[12px] font-medium transition-colors ${settings.visible ? 'bg-accent/10 border-accent/50 text-accent' : 'bg-surface border-border text-secondary-text hover:bg-secondary'}`}
            onClick={() => onUpdateSettings({ visible: !settings.visible })}
          >
            {settings.visible ? 'On' : 'Off'}
          </button>
        </div>

        {/* Point Size */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-secondary-text">Point Size</span>
            <span className="text-primary font-mono">{settings.size}</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={settings.size} 
            onChange={(e) => onUpdateSettings({ size: parseInt(e.target.value) })}
            className="w-full h-1.5 bg-secondary rounded-full appearance-none cursor-pointer accent-accent"
            disabled={!settings.visible}
            aria-label="Point Size"
          />
        </div>

        {/* Density */}
        <div className="space-y-2">
          <span className="text-secondary-text block">Density</span>
          <div className="flex border border-border rounded-md overflow-hidden">
            {['Low', 'Medium', 'High'].map((level) => (
              <button
                key={level}
                onClick={() => onUpdateSettings({ density: level as any })}
                disabled={!settings.visible}
                className={`flex-1 py-1.5 text-[12px] transition-colors border-r border-border last:border-r-0 ${
                  settings.density === level 
                    ? 'bg-accent text-white font-medium' 
                    : 'bg-surface text-secondary-text hover:bg-secondary'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Color Mode */}
        <div className="space-y-2 pb-2 border-b border-border/60">
          <span className="text-secondary-text block">Color Mode</span>
          <select 
            value={settings.colorMode}
            onChange={(e) => onUpdateSettings({ colorMode: e.target.value as any })}
            disabled={!settings.visible}
            className="w-full bg-surface border border-border text-primary text-[12px] rounded-md px-3 py-2 outline-none focus:border-accent disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Color Mode"
          >
            <option value="Natural">Natural</option>
            <option value="Height">Height (Elevation)</option>
            <option value="Classification">Classification</option>
          </select>
        </div>

        {/* Mesh Controls */}
        <div className="space-y-2 pt-2">
          <span className="text-secondary-text block">Mesh Mode</span>
          <select 
            value={meshMode}
            onChange={(e) => onUpdateMeshMode(e.target.value as any)}
            className="w-full bg-surface border border-border text-primary text-[12px] rounded-md px-3 py-2 outline-none focus:border-accent"
            aria-label="Mesh Mode"
          >
            <option value="Solid">Solid</option>
            <option value="Wireframe">Wireframe</option>
            <option value="Solid + Wireframe">Solid + Wireframe</option>
          </select>
        </div>

      </CardContent>
    </Card>
  );
}
