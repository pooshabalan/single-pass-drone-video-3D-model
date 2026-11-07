import { useExportStore } from '../../store/useExportStore';
import { mockModelData } from '../../data/mockModel';
import { Card, CardHeader, CardContent } from '../common/Card';
import { Badge } from '../common/Badge';
import { ShieldAlert } from 'lucide-react';

export default function ExportSummaryPanel() {
  const { format, settings } = useExportStore();
  const info = mockModelData.info;

  // Simple deterministic size estimation
  const getEstimatedSize = () => {
    let base = 150;
    
    if (['OBJ', 'FBX', 'GLTF', 'GLB'].includes(format)) {
      if (format === 'FBX') base += 50;
      if (format === 'OBJ') base += 80;
      if (settings.meshDetail === 'High') base *= 1.5;
      if (settings.meshDetail === 'Low') base *= 0.6;
      
      if (settings.textureResolution === '8K') base += 200;
      if (settings.textureResolution === '4K') base += 50;
    } else {
      base = 400; // Point clouds are larger
      if (format === 'LAS') base *= 1.2;
      if (settings.pointDensity === 'High') base *= 2;
      if (settings.pointDensity === 'Low') base *= 0.5;
      if (settings.includeClassification) base *= 1.1;
    }

    return `~${Math.round(base)} MB`;
  };

  return (
    <Card className="flex-shrink-0">
      <CardHeader title="Model Summary" action={<Badge variant="warning" className="text-[9px] uppercase px-1.5 py-0"><ShieldAlert className="w-3 h-3 mr-1"/> Demo / Simulation</Badge>} />
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          <div className="p-4 grid grid-cols-2 gap-y-4 gap-x-2 text-[13px]">
            <div>
              <span className="block text-[11px] font-bold text-secondary-text uppercase tracking-wider mb-1">Model Type</span>
              <span className="text-primary font-medium">{info.type}</span>
            </div>
            <div>
              <span className="block text-[11px] font-bold text-secondary-text uppercase tracking-wider mb-1">Dimensions</span>
              <span className="text-primary font-medium">{info.boundingSize}</span>
            </div>
            <div>
              <span className="block text-[11px] font-bold text-secondary-text uppercase tracking-wider mb-1">Vertices</span>
              <span className="text-primary font-medium">{info.vertices}</span>
            </div>
            <div>
              <span className="block text-[11px] font-bold text-secondary-text uppercase tracking-wider mb-1">Faces</span>
              <span className="text-primary font-medium">{info.faces}</span>
            </div>
            <div>
              <span className="block text-[11px] font-bold text-secondary-text uppercase tracking-wider mb-1">Point Count</span>
              <span className="text-primary font-medium">{info.pointCount}</span>
            </div>
          </div>
          
          <div className="p-4 bg-secondary/10 flex items-center justify-between">
            <span className="text-[13px] font-bold text-primary">Estimated Export Size</span>
            <span className="text-[18px] font-bold text-accent tracking-tight">{getEstimatedSize()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
