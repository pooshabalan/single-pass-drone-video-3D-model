import { Ruler, Map as MapIcon, BoxSelect } from 'lucide-react';
import { Card, CardHeader } from '../common/Card';
import type { MeasurementRecord, UnitSystem } from '../../data/mockMeasurements';
import { formatMeasurement } from '../../utils/measurementUtils';

interface MeasurementHistoryProps {
  measurements: MeasurementRecord[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  unitSystem: UnitSystem;
}

export default function MeasurementHistory({ measurements, selectedId, onSelect, unitSystem }: MeasurementHistoryProps) {
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'distance': return <Ruler className="w-4 h-4 text-blue-500" />;
      case 'area': return <MapIcon className="w-4 h-4 text-green-500" />;
      case 'volume': return <BoxSelect className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <Card className="flex flex-col flex-1 min-h-[250px]">
      <CardHeader title="Measurement History" />
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-1 custom-scrollbar">
        {measurements.map(m => {
          const isSelected = selectedId === m.id;
          return (
            <button
              key={m.id}
              onClick={() => onSelect(m.id)}
              className={`w-full flex items-center justify-between p-3 rounded-md text-left transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent ${
                isSelected 
                  ? 'bg-accent/10 border border-accent/30' 
                  : 'bg-transparent border border-transparent hover:bg-secondary/50'
              }`}
              aria-pressed={isSelected}
            >
              <div className="flex items-start space-x-3 w-full">
                <div className="flex-shrink-0 mt-0.5">
                  {getIcon(m.type)}
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className={`text-[13px] font-medium truncate pr-2 ${isSelected ? 'text-accent' : 'text-primary'}`}>
                      {m.name}
                    </span>
                    <span className="text-[13px] font-mono font-medium text-primary flex-shrink-0">
                      {formatMeasurement(m, unitSystem)}
                    </span>
                  </div>
                  <div className="flex text-[11px] text-secondary-text capitalize">
                    <span>{m.type}</span>
                    <span className="mx-1.5 opacity-50">•</span>
                    <span>{m.date}</span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
