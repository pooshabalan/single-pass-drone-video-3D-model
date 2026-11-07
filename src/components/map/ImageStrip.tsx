import { mockDroneFrames } from '../../data/mockDroneFrames';

interface ImageStripProps {
  selectedWaypointId: number | null;
  onSelectWaypoint: (id: number) => void;
}

export default function ImageStrip({ selectedWaypointId, onSelectWaypoint }: ImageStripProps) {
  return (
    <div className="w-full bg-card border border-border rounded-lg shadow-sm p-3 flex flex-col space-y-2 flex-shrink-0">
      <div className="flex items-center justify-between px-1">
        <span className="text-[11px] font-bold text-secondary-text uppercase tracking-wider">Captured Frames</span>
        <span className="text-[10px] text-secondary-text bg-secondary px-2 py-0.5 rounded-full">Simulation Data</span>
      </div>
      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent">
        {mockDroneFrames.map((frame) => {
          const isSelected = frame.waypointId === selectedWaypointId;
          return (
            <button
              key={frame.id}
              onClick={() => onSelectWaypoint(frame.waypointId)}
              className={`relative flex-shrink-0 w-24 h-16 rounded overflow-hidden border-2 transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-card ${
                isSelected ? 'border-accent shadow-md scale-105' : 'border-transparent opacity-70 hover:opacity-100 hover:border-border'
              }`}
              aria-label={`Select waypoint ${frame.waypointId}, frame ${frame.frameNumber}`}
              aria-pressed={isSelected}
            >
              <img 
                src={frame.imagePath} 
                alt={`Thumbnail ${frame.frameNumber}`} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] font-mono px-1 py-0.5 flex justify-between items-center">
                <span>WP-{frame.waypointId.toString().padStart(2, '0')}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
