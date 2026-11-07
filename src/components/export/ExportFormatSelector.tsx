import { useExportStore } from '../../store/useExportStore';
import type { ExportFormat } from '../../data/mockExportHistory';

const formatCategories = [
  {
    title: 'Mesh',
    formats: [
      { id: 'OBJ', name: 'OBJ', desc: 'Widely supported 3D geometry format' },
      { id: 'FBX', name: 'FBX', desc: 'Rich format for game engines and 3D suites' }
    ]
  },
  {
    title: 'Web',
    formats: [
      { id: 'GLTF', name: 'GLTF', desc: 'Standard JSON-based format for 3D scenes' },
      { id: 'GLB', name: 'GLB', desc: 'Binary GLTF optimized for fast web loading' }
    ]
  },
  {
    title: 'Point Cloud',
    formats: [
      { id: 'PLY', name: 'PLY', desc: 'Standard polygon and point cloud format' },
      { id: 'LAS', name: 'LAS', desc: 'Industry standard for LiDAR and point clouds' }
    ]
  }
];

export default function ExportFormatSelector() {
  const { format, setFormat, status } = useExportStore();
  const isDisabled = status !== 'idle';

  return (
    <div className="space-y-6">
      {formatCategories.map((category) => (
        <div key={category.title}>
          <h4 className="text-[12px] font-bold text-secondary-text uppercase tracking-wider mb-3">
            {category.title}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {category.formats.map((f) => {
              const isSelected = format === f.id;
              return (
                <button
                  key={f.id}
                  disabled={isDisabled}
                  onClick={() => setFormat(f.id as ExportFormat)}
                  className={`text-left p-4 rounded-lg border transition-colors flex flex-col ${
                    isSelected
                      ? 'bg-accent/10 border-accent/50 shadow-sm'
                      : 'bg-card border-border hover:border-accent/30 hover:bg-secondary/20'
                  } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  aria-pressed={isSelected}
                >
                  <span className={`text-[15px] font-semibold mb-1 ${isSelected ? 'text-accent' : 'text-primary'}`}>
                    {f.name}
                  </span>
                  <span className="text-[12px] text-secondary-text leading-tight">
                    {f.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
