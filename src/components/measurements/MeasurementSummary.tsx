import type { MeasurementRecord } from '../../data/mockMeasurements';

interface MeasurementSummaryProps {
  measurements: MeasurementRecord[];
}

export default function MeasurementSummary({ measurements }: MeasurementSummaryProps) {
  const counts = {
    total: measurements.length,
    distance: measurements.filter(m => m.type === 'distance').length,
    area: measurements.filter(m => m.type === 'area').length,
    volume: measurements.filter(m => m.type === 'volume').length,
  };

  return (
    <div className="w-full bg-card border border-border rounded-lg shadow-sm px-6 py-4 flex items-center justify-between text-[13px] flex-shrink-0">
      <div className="flex items-center justify-start sm:justify-around w-full gap-4 sm:gap-0">
        <div className="flex flex-col items-start sm:items-center">
          <span className="text-secondary-text uppercase tracking-wider text-[10px] font-bold block mb-0.5">Total Items</span>
          <span className="text-primary font-bold text-[16px]">{counts.total}</span>
        </div>
        <div className="hidden sm:block h-8 w-px bg-border/60" />
        <div className="flex flex-col items-start sm:items-center">
          <span className="text-secondary-text uppercase tracking-wider text-[10px] font-bold block mb-0.5">Distance</span>
          <span className="text-primary font-medium text-[16px]">{counts.distance}</span>
        </div>
        <div className="flex flex-col items-start sm:items-center">
          <span className="text-secondary-text uppercase tracking-wider text-[10px] font-bold block mb-0.5">Area</span>
          <span className="text-primary font-medium text-[16px]">{counts.area}</span>
        </div>
        <div className="flex flex-col items-start sm:items-center">
          <span className="text-secondary-text uppercase tracking-wider text-[10px] font-bold block mb-0.5">Volume</span>
          <span className="text-primary font-medium text-[16px]">{counts.volume}</span>
        </div>
      </div>
    </div>
  );
}
