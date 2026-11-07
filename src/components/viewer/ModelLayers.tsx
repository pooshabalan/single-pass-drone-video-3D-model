import { Layers } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../common/Card';
import type { LayerDefaults } from '../../data/mockModel';

interface ModelLayersProps {
  layers: LayerDefaults;
  onToggleLayer: (layer: keyof LayerDefaults) => void;
}

export default function ModelLayers({ layers, onToggleLayer }: ModelLayersProps) {
  const layerItems: { key: keyof LayerDefaults; label: string }[] = [
    { key: 'terrain', label: 'Terrain' },
    { key: 'buildings', label: 'Buildings' },
    { key: 'roads', label: 'Roads' },
    { key: 'vegetation', label: 'Vegetation' },
    { key: 'water', label: 'Water' },
    { key: 'pointCloud', label: 'Point Cloud' },
    { key: 'meshWireframe', label: 'Mesh Wireframe' },
  ];

  return (
    <Card>
      <CardHeader title="Model Layers" icon={<Layers className="w-4 h-4" />} />
      <CardContent className="space-y-2 p-4">
        {layerItems.map((item) => (
          <label key={item.key} className="flex items-center space-x-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                checked={layers[item.key]}
                onChange={() => onToggleLayer(item.key)}
                className="w-4 h-4 border border-border rounded-sm bg-surface checked:bg-accent checked:border-accent focus:ring-accent/20 cursor-pointer appearance-none transition-colors"
                aria-label={`Toggle ${item.label}`}
              />
              {layers[item.key] && (
                <svg className="w-3 h-3 text-white absolute pointer-events-none" viewBox="0 0 14 14" fill="none">
                  <path d="M3 8L6 11L11 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-[13px] text-primary select-none group-hover:text-accent transition-colors">
              {item.label}
            </span>
          </label>
        ))}
      </CardContent>
    </Card>
  );
}
