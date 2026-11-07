import { Ruler, Map as MapIcon, BoxSelect, Trash2 } from 'lucide-react';
import { Button } from '../common/Button';
import { Card, CardHeader, CardContent } from '../common/Card';
import type { MeasurementType, UnitSystem } from '../../data/mockMeasurements';

interface MeasurementToolbarProps {
  activeTool: MeasurementType | 'select';
  setActiveTool: (tool: MeasurementType | 'select') => void;
  unitSystem: UnitSystem;
  setUnitSystem: (sys: UnitSystem) => void;
  onClearSelection: () => void;
  hasSelection: boolean;
}

export default function MeasurementToolbar({
  activeTool,
  setActiveTool,
  unitSystem,
  setUnitSystem,
  onClearSelection,
  hasSelection
}: MeasurementToolbarProps) {
  return (
    <Card>
      <CardHeader title="Measurement Tools" />
      <CardContent className="p-3">
        <div className="grid grid-cols-3 gap-2 mb-4">
          <Button
            variant="ghost"
            onClick={() => setActiveTool('distance')}
            className={`flex-col items-center justify-center py-3 h-auto ${
              activeTool === 'distance' 
                ? 'bg-accent/10 border-accent/30 text-accent shadow-sm' 
                : 'border-border/50 text-secondary-text hover:text-primary'
            }`}
            aria-label="Distance Tool"
            title="Distance Tool"
          >
            <Ruler className="w-5 h-5 mb-1.5" />
            <span className="text-[11px]">Distance</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTool('area')}
            className={`flex-col items-center justify-center py-3 h-auto ${
              activeTool === 'area' 
                ? 'bg-accent/10 border-accent/30 text-accent shadow-sm' 
                : 'border-border/50 text-secondary-text hover:text-primary'
            }`}
            aria-label="Area Tool"
            title="Area Tool"
          >
            <MapIcon className="w-5 h-5 mb-1.5" />
            <span className="text-[11px]">Area</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTool('volume')}
            className={`flex-col items-center justify-center py-3 h-auto ${
              activeTool === 'volume' 
                ? 'bg-accent/10 border-accent/30 text-accent shadow-sm' 
                : 'border-border/50 text-secondary-text hover:text-primary'
            }`}
            aria-label="Volume Tool"
            title="Volume Tool"
          >
            <BoxSelect className="w-5 h-5 mb-1.5" />
            <span className="text-[11px]">Volume</span>
          </Button>
        </div>
        
        <div className="flex flex-col pt-3 border-t border-border">
          <span className="text-[11px] font-bold text-secondary-text uppercase tracking-wider mb-2">Unit System</span>
          <div className="flex items-center justify-between">
            <div className="flex bg-secondary/30 p-1 rounded-md border border-border">
              <button
                onClick={() => setUnitSystem('metric')}
                className={`px-3 py-1 rounded text-[11px] font-medium transition-colors ${
                  unitSystem === 'metric' ? 'bg-card shadow-sm border border-border text-primary' : 'text-secondary-text hover:text-primary'
                }`}
              >
                Metric
              </button>
              <button
                onClick={() => setUnitSystem('imperial')}
                className={`px-3 py-1 rounded text-[11px] font-medium transition-colors ${
                  unitSystem === 'imperial' ? 'bg-card shadow-sm border border-border text-primary' : 'text-secondary-text hover:text-primary'
                }`}
              >
                Imperial
              </button>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              icon={<Trash2 className="w-3 h-3" />}
              onClick={onClearSelection}
              disabled={!hasSelection}
              className={hasSelection ? 'text-error hover:bg-error/10' : 'opacity-50'}
            >
              Clear Selection
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
