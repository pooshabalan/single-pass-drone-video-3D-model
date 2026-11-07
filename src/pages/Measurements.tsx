import { useState } from 'react';
import { Ruler, ShieldAlert } from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { mockMeasurements } from '../data/mockMeasurements';
import type { MeasurementType, UnitSystem } from '../data/mockMeasurements';
import MeasurementCanvas from '../components/measurements/MeasurementCanvas';
import MeasurementToolbar from '../components/measurements/MeasurementToolbar';
import MeasurementResult from '../components/measurements/MeasurementResult';
import MeasurementHistory from '../components/measurements/MeasurementHistory';
import MeasurementSummary from '../components/measurements/MeasurementSummary';

export default function Measurements() {
  const [activeTool, setActiveTool] = useState<MeasurementType | 'select'>('select');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');

  const handleSelect = (id: string) => {
    const selected = mockMeasurements.find(m => m.id === id);
    if (selected) {
      setSelectedId(id);
      setActiveTool(selected.type);
    }
  };

  const handleClearSelection = () => {
    setSelectedId(null);
    setActiveTool('select');
  };

  const handleToolSelect = (tool: MeasurementType | 'select') => {
    setActiveTool(tool);
    setSelectedId(null);
  };

  const selectedMeasurement = mockMeasurements.find(m => m.id === selectedId) || null;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto xl:h-[calc(100vh-4rem)] flex flex-col">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-start space-x-3">
          <div className="mt-1 p-2 bg-secondary rounded-md text-accent">
            <Ruler className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-[24px] md:text-[32px] font-semibold text-primary tracking-tight leading-tight">
                Measurements
              </h1>
              <Badge variant="warning" className="hidden md:inline-flex uppercase text-[10px] items-center">
                <ShieldAlert className="w-3 h-3 mr-1" />
                Demo / Simulation Data
              </Badge>
            </div>
            <p className="text-[14px] md:text-[16px] text-secondary-text mt-1">
              Inspect reconstructed geometry and review simulated survey measurements.
            </p>
          </div>
        </div>
      </div>

      {/* MOBILE WARNING BADGE */}
      <div className="md:hidden mb-4">
        <Badge variant="warning" className="uppercase text-[10px] items-center w-max">
          <ShieldAlert className="w-3 h-3 mr-1" />
          Demo / Simulation Data
        </Badge>
      </div>

      {/* MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col gap-6 min-h-0">
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-3 gap-6 min-h-0">
          
          {/* LEFT/MAIN: CANVAS */}
          <div className="xl:col-span-2 flex flex-col min-h-0 h-full">
            <div className="flex-1 min-h-[400px] xl:min-h-0 bg-card border border-border rounded-lg shadow-sm overflow-hidden relative">
              <MeasurementCanvas 
                measurements={mockMeasurements} 
                selectedId={selectedId} 
                unitSystem={unitSystem}
                onSelect={handleSelect}
              />
            </div>
          </div>

          {/* RIGHT: TOOLS & INSPECTOR */}
          <div className="xl:col-span-1 xl:overflow-y-auto xl:pr-2 pb-4 xl:pb-0 flex flex-col space-y-6">
            <MeasurementToolbar 
              activeTool={activeTool} 
              setActiveTool={handleToolSelect} 
              unitSystem={unitSystem}
              setUnitSystem={setUnitSystem}
              onClearSelection={handleClearSelection}
              hasSelection={selectedId !== null}
            />
            
            <MeasurementResult 
              measurement={selectedMeasurement} 
              unitSystem={unitSystem}
            />
            
            <MeasurementHistory 
              measurements={mockMeasurements} 
              selectedId={selectedId} 
              onSelect={handleSelect}
              unitSystem={unitSystem}
            />
          </div>
        </div>

        {/* BOTTOM: SUMMARY */}
        <MeasurementSummary measurements={mockMeasurements} />
      </div>
    </div>
  );
}
