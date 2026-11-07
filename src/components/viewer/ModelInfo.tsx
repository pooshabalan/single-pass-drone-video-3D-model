import { Info, BarChart2 } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../common/Card';
import { Badge } from '../common/Badge';
import type { ModelInfo as ModelInfoData, QualityMetrics } from '../../data/mockModel';

interface ModelInfoProps {
  info: ModelInfoData;
  quality: QualityMetrics;
}

export default function ModelInfo({ info, quality }: ModelInfoProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader 
          title="Model Information" 
          icon={<Info className="w-4 h-4" />} 
          action={<Badge variant="warning" className="text-[9px] uppercase">Demo Model</Badge>}
        />
        <CardContent className="space-y-3 p-4 text-[13px]">
          <div className="flex justify-between items-center py-1 border-b border-border/50">
            <span className="text-secondary-text font-medium">Model Type</span>
            <span className="text-primary">{info.type}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-border/50">
            <span className="text-secondary-text font-medium">Vertices</span>
            <span className="text-primary font-mono">{info.vertices}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-border/50">
            <span className="text-secondary-text font-medium">Faces</span>
            <span className="text-primary font-mono">{info.faces}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-border/50">
            <span className="text-secondary-text font-medium">Point Count</span>
            <span className="text-primary font-mono">{info.pointCount}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-border/50">
            <span className="text-secondary-text font-medium">Bounding Size</span>
            <span className="text-primary">{info.boundingSize}</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-secondary-text font-medium">Coordinate Ref.</span>
            <span className="text-primary">{info.coordinateReference}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader 
          title="Quality Metrics" 
          icon={<BarChart2 className="w-4 h-4" />} 
          action={<Badge variant="warning" className="text-[9px] uppercase">Simulation Data</Badge>}
        />
        <CardContent className="space-y-3 p-4 text-[13px]">
          <div className="flex justify-between items-center py-1 border-b border-border/50">
            <span className="text-secondary-text font-medium">Reconstruction Quality</span>
            <Badge variant="success">{quality.quality}</Badge>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-border/50">
            <span className="text-secondary-text font-medium">Camera Registration</span>
            <span className="text-primary font-medium">{quality.registration}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-border/50">
            <span className="text-secondary-text font-medium">Point Density</span>
            <Badge variant="info">{quality.density}</Badge>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-secondary-text font-medium">Reprojection Error</span>
            <span className="text-primary font-medium">{quality.reprojectionError}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
