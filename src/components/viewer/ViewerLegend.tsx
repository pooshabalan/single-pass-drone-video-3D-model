import type { LayerDefaults } from '../../data/mockModel';

export default function ViewerLegend({ layers }: { layers: LayerDefaults }) {
  return (
    <div className="absolute bottom-4 left-4 bg-surface/80 backdrop-blur-md border border-border/60 p-3 rounded-lg shadow-lg text-[11px] pointer-events-none">
      <div className="font-semibold text-primary mb-2 uppercase tracking-wider text-[10px]">Model Legend</div>
      <div className="space-y-1.5">
        <div className={`flex items-center space-x-2 transition-opacity ${layers.terrain ? 'opacity-100' : 'opacity-40'}`}>
          <div className="w-3 h-3 rounded-sm bg-[#8B7355]" />
          <span className="text-secondary-text font-medium">Terrain</span>
        </div>
        <div className={`flex items-center space-x-2 transition-opacity ${layers.buildings ? 'opacity-100' : 'opacity-40'}`}>
          <div className="w-3 h-3 rounded-sm bg-[#A0AAB5]" />
          <span className="text-secondary-text font-medium">Buildings</span>
        </div>
        <div className={`flex items-center space-x-2 transition-opacity ${layers.roads ? 'opacity-100' : 'opacity-40'}`}>
          <div className="w-3 h-3 rounded-sm bg-[#444444]" />
          <span className="text-secondary-text font-medium">Roads</span>
        </div>
        <div className={`flex items-center space-x-2 transition-opacity ${layers.vegetation ? 'opacity-100' : 'opacity-40'}`}>
          <div className="w-3 h-3 rounded-sm bg-[#2E5A27]" />
          <span className="text-secondary-text font-medium">Vegetation</span>
        </div>
        <div className={`flex items-center space-x-2 transition-opacity ${layers.pointCloud ? 'opacity-100' : 'opacity-40'}`}>
          <div className="w-3 h-3 rounded-full border border-current text-[#A0AAB5]" />
          <span className="text-secondary-text font-medium">Point Cloud</span>
        </div>
        <div className={`flex items-center space-x-2 transition-opacity ${layers.meshWireframe ? 'opacity-100' : 'opacity-40'}`}>
          <svg className="w-3 h-3 text-[#A0AAB5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v18m-9-9h18M5.6 5.6l12.8 12.8m0-12.8L5.6 18.4"/></svg>
          <span className="text-secondary-text font-medium">Wireframe</span>
        </div>
      </div>
    </div>
  );
}
