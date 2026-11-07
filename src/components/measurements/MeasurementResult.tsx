import { Ruler, Map as MapIcon, BoxSelect, ShieldAlert, Calendar } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../common/Card';
import { Badge } from '../common/Badge';
import type { MeasurementRecord, UnitSystem } from '../../data/mockMeasurements';
import { formatMeasurement } from '../../utils/measurementUtils';

interface MeasurementResultProps {
  measurement: MeasurementRecord | null;
  unitSystem: UnitSystem;
}

export default function MeasurementResult({ measurement, unitSystem }: MeasurementResultProps) {
  if (!measurement) {
    return (
      <Card className="border-border bg-card flex-shrink-0">
        <CardHeader title="Selected Measurement" />
        <CardContent className="p-5 flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-text">
            <Ruler className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[14px] font-medium text-primary">Select a measurement</p>
            <p className="text-[12px] text-secondary-text mt-1 max-w-[200px]">
              Choose an item from the history or click a measurement in the 3D view.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getIcon = () => {
    switch (measurement.type) {
      case 'distance': return <Ruler className="w-4 h-4 text-blue-500" />;
      case 'area': return <MapIcon className="w-4 h-4 text-green-500" />;
      case 'volume': return <BoxSelect className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <Card className="border-accent/30 shadow-sm relative flex-shrink-0">
      <div className="absolute top-0 left-0 w-1 h-full bg-accent z-10" />
      <CardHeader title="Selected Measurement" />
      <CardContent className="p-4 space-y-4">
        <div>
          <div className="flex items-center space-x-2 text-[10px] font-bold tracking-wider uppercase text-secondary-text mb-1">
            {getIcon()}
            <span>{measurement.type}</span>
          </div>
          <h3 className="text-[15px] font-medium text-primary">{measurement.name}</h3>
        </div>

        <div className="flex items-baseline space-x-2 pb-1">
          <span className="text-[32px] font-bold text-primary tracking-tight leading-none">
            {formatMeasurement(measurement, unitSystem).split(' ')[0]}
          </span>
          <span className="text-[14px] font-medium text-secondary-text">
            {formatMeasurement(measurement, unitSystem).split(' ')[1]}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-[12px] pt-3 border-t border-border">
          <div>
            <span className="text-secondary-text block mb-0.5">Points</span>
            <span className="text-primary font-mono">{measurement.points.length}</span>
          </div>
          <div>
            <span className="text-secondary-text block mb-0.5 flex items-center">
              <Calendar className="w-3 h-3 mr-1" /> Date
            </span>
            <span className="text-primary">{measurement.date}</span>
          </div>
          <div className="col-span-2 flex items-center space-x-2 pt-1">
            <Badge variant="warning" className="text-[9px] uppercase px-1.5 py-0">
              <ShieldAlert className="w-3 h-3 mr-1" />
              Demo / Simulation
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
