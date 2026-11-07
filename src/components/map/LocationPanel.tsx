import { MapPin, Navigation, Info, Target, Play, Pause } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { mockFlightData } from '../../data/mockFlightPath';
import { mockDroneFrames } from '../../data/mockDroneFrames';
import FrameInspector from './FrameInspector';

interface LocationPanelProps {
  showFlightPath: boolean;
  setShowFlightPath: (val: boolean) => void;
  showWaypoints: boolean;
  setShowWaypoints: (val: boolean) => void;
  showSurveyArea: boolean;
  setShowSurveyArea: (val: boolean) => void;
  followDrone: boolean;
  setFollowDrone: (val: boolean) => void;
  currentDronePos: { lat: number, lng: number, alt: number } | null;
  selectedWaypointId: number | null;
  setSelectedWaypointId: (id: number | null) => void;
}

export default function LocationPanel({
  showFlightPath,
  setShowFlightPath,
  showWaypoints,
  setShowWaypoints,
  showSurveyArea,
  setShowSurveyArea,
  followDrone,
  setFollowDrone,
  currentDronePos,
  selectedWaypointId,
  setSelectedWaypointId
}: LocationPanelProps) {
  
  if (selectedWaypointId !== null) {
    const selectedFrame = mockDroneFrames.find(f => f.waypointId === selectedWaypointId);
    if (selectedFrame) {
      return (
        <div className="w-full flex flex-col space-y-6">
          <FrameInspector 
            frame={selectedFrame} 
            onClose={() => setSelectedWaypointId(null)} 
          />
        </div>
      );
    }
  }

  return (
    <div className="w-full flex flex-col space-y-6">
      
      {/* PROJECT LOCATION */}
      <Card>
        <CardHeader 
          title="Project Location" 
          icon={<MapPin className="w-4 h-4" />} 
          action={<Badge variant="warning" className="text-[9px] uppercase">Demo / Simulation Data</Badge>}
        />
        <CardContent className="space-y-3 p-4 text-[13px]">
          <div className="mb-2">
            <span className="text-primary font-medium text-[14px]">{mockFlightData.project}</span>
          </div>
          
          <div className="flex justify-between items-center py-1 border-b border-border/50">
            <span className="text-secondary-text font-medium">Latitude</span>
            <span className="text-primary font-mono">{mockFlightData.location.lat}°</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-border/50">
            <span className="text-secondary-text font-medium">Longitude</span>
            <span className="text-primary font-mono">{mockFlightData.location.lng}°</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-border/50">
            <span className="text-secondary-text font-medium">Altitude</span>
            <span className="text-primary font-mono">{mockFlightData.location.alt} m</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-secondary-text font-medium">Coordinate Reference</span>
            <span className="text-primary">{mockFlightData.location.ref}</span>
          </div>
          
          {currentDronePos && (
            <div className="mt-4 pt-3 border-t border-accent/20 bg-accent/5 -mx-4 px-4 pb-2">
              <span className="text-[11px] font-bold text-accent uppercase tracking-wider mb-2 block">Live Drone Position</span>
              <div className="grid grid-cols-2 gap-2 text-[12px]">
                <div><span className="text-secondary-text">Lat:</span> <span className="font-mono text-primary">{currentDronePos.lat.toFixed(6)}°</span></div>
                <div><span className="text-secondary-text">Lng:</span> <span className="font-mono text-primary">{currentDronePos.lng.toFixed(6)}°</span></div>
                <div className="col-span-2"><span className="text-secondary-text">Alt:</span> <span className="font-mono text-primary">{currentDronePos.alt.toFixed(1)} m</span></div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* FLIGHT SUMMARY */}
      <Card>
        <CardHeader 
          title="Flight Summary" 
          icon={<Navigation className="w-4 h-4" />} 
        />
        <CardContent className="space-y-3 p-4 text-[13px]">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-secondary-text font-medium block text-[11px] uppercase tracking-wider mb-1">Distance</span>
              <span className="text-primary font-medium">{mockFlightData.flight.distance} km</span>
            </div>
            <div>
              <span className="text-secondary-text font-medium block text-[11px] uppercase tracking-wider mb-1">Duration</span>
              <span className="text-primary font-medium">{mockFlightData.flight.duration}</span>
            </div>
            <div>
              <span className="text-secondary-text font-medium block text-[11px] uppercase tracking-wider mb-1">Waypoints</span>
              <span className="text-primary font-medium">{mockFlightData.flight.waypoints}</span>
            </div>
            <div>
              <span className="text-secondary-text font-medium block text-[11px] uppercase tracking-wider mb-1">Coverage</span>
              <span className="text-primary font-medium">{mockFlightData.flight.coverage} ha</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* MAP CONTROLS */}
      <Card>
        <CardHeader 
          title="Map Layers & Simulation" 
          icon={<Target className="w-4 h-4" />} 
        />
        <CardContent className="p-4 space-y-4 text-[13px]">
          <div className="space-y-2">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-primary font-medium">Show Flight Path</span>
              <button 
                role="switch"
                aria-checked={showFlightPath}
                aria-label="Toggle Flight Path visibility"
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${showFlightPath ? 'bg-accent' : 'bg-secondary'}`}
                onClick={() => setShowFlightPath(!showFlightPath)}
              >
                <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${showFlightPath ? 'translate-x-5' : 'translate-x-1'}`} />
              </button>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-primary font-medium">Show Waypoints</span>
              <button 
                role="switch"
                aria-checked={showWaypoints}
                aria-label="Toggle Waypoints visibility"
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${showWaypoints ? 'bg-accent' : 'bg-secondary'}`}
                onClick={() => setShowWaypoints(!showWaypoints)}
              >
                <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${showWaypoints ? 'translate-x-5' : 'translate-x-1'}`} />
              </button>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-primary font-medium">Show Survey Area</span>
              <button 
                role="switch"
                aria-checked={showSurveyArea}
                aria-label="Toggle Survey Area visibility"
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${showSurveyArea ? 'bg-accent' : 'bg-secondary'}`}
                onClick={() => setShowSurveyArea(!showSurveyArea)}
              >
                <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${showSurveyArea ? 'translate-x-5' : 'translate-x-1'}`} />
              </button>
            </label>
          </div>

          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <Button 
              variant={followDrone ? "primary" : "secondary"} 
              size="sm" 
              className="text-[12px] w-full" 
              icon={followDrone ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              onClick={() => setFollowDrone(!followDrone)}
              aria-label={followDrone ? "Stop following drone" : "Start following drone"}
            >
              {followDrone ? 'Stop Drone Simulation' : 'Follow Drone'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* LEGEND */}
      <Card>
        <CardHeader 
          title="Legend" 
          icon={<Info className="w-4 h-4" />} 
        />
        <CardContent className="p-4 grid grid-cols-2 gap-3 text-[12px]">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full border-2 border-blue-500 flex items-center justify-center"><div className="w-1 h-1 bg-blue-500 rounded-full" /></div>
            <span className="text-secondary-text">Takeoff</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full border-2 border-red-500 flex items-center justify-center"><div className="w-1 h-1 bg-red-500 rounded-full" /></div>
            <span className="text-secondary-text">Landing</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-accent border border-white"></div>
            <span className="text-secondary-text">Drone Pos</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full border-2 border-accent"></div>
            <span className="text-secondary-text">Waypoint</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-0 border-t-2 border-accent"></div>
            <span className="text-secondary-text">Flight Path</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-accent/20 border border-accent/50 border-dashed"></div>
            <span className="text-secondary-text">Survey Area</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-secondary-text">Project Loc</span>
          </div>
        </CardContent>
      </Card>
      
    </div>
  );
}
