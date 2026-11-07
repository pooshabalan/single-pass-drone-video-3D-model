import { useState } from 'react';
import { Map as MapIcon, ShieldAlert } from 'lucide-react';
import { Badge } from '../components/common/Badge';
import FlightPathMap from '../components/map/FlightPathMap';
import LocationPanel from '../components/map/LocationPanel';
import ImageStrip from '../components/map/ImageStrip';

export default function Map() {
  const [showFlightPath, setShowFlightPath] = useState(true);
  const [showWaypoints, setShowWaypoints] = useState(true);
  const [showSurveyArea, setShowSurveyArea] = useState(true);
  const [followDrone, setFollowDrone] = useState(false);

  
  const [currentDronePos, setCurrentDronePos] = useState<{lat: number, lng: number, alt: number} | null>(null);
  const [selectedWaypointId, setSelectedWaypointId] = useState<number | null>(null);



  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto xl:h-[calc(100vh-4rem)] flex flex-col">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-start space-x-3">
          <div className="mt-1 p-2 bg-secondary rounded-md text-accent">
            <MapIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-[24px] md:text-[32px] font-semibold text-primary tracking-tight leading-tight">
                Map & Flight Path
              </h1>
              <Badge variant="warning" className="hidden md:inline-flex uppercase text-[10px] items-center">
                <ShieldAlert className="w-3 h-3 mr-1" />
                Demo / Simulation Data
              </Badge>
            </div>
            <p className="text-[14px] md:text-[16px] text-secondary-text mt-1">
              Visualize the simulated drone survey route and captured area.
            </p>
          </div>
        </div>
      </div>

      {/* MOBILE WARNING BADGE */}
      <div className="md:hidden mb-4">
        <Badge variant="warning" className="uppercase text-[10px] items-center w-max">
          <ShieldAlert className="w-3 h-3 mr-1" />
          Demo / Simulation Data
        </Badge>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-4 gap-6 min-h-0">
        
        {/* LEFT/TOP: MAP WORKSPACE (Takes 3 columns on xl) */}
        <div className="xl:col-span-3 flex flex-col gap-4 min-h-0 h-full">
          <div className="flex-1 min-h-[350px] xl:min-h-0 bg-card border border-border rounded-lg shadow-sm overflow-hidden relative">
            <FlightPathMap 
              showFlightPath={showFlightPath}
              showWaypoints={showWaypoints}
              showSurveyArea={showSurveyArea}
              followDrone={followDrone}
              onDronePositionChange={setCurrentDronePos}
              selectedWaypointId={selectedWaypointId}
              onSelectWaypoint={setSelectedWaypointId}
            />
          </div>
          <ImageStrip 
            selectedWaypointId={selectedWaypointId}
            onSelectWaypoint={setSelectedWaypointId}
          />
        </div>

        {/* RIGHT/BOTTOM: PANELS (Takes 1 column on xl) */}
        <div className="xl:col-span-1 xl:overflow-y-auto xl:pr-2 pb-8 xl:pb-0">
          <LocationPanel 
            showFlightPath={showFlightPath}
            setShowFlightPath={setShowFlightPath}
            showWaypoints={showWaypoints}
            setShowWaypoints={setShowWaypoints}
            showSurveyArea={showSurveyArea}
            setShowSurveyArea={setShowSurveyArea}
            followDrone={followDrone}
            setFollowDrone={setFollowDrone}
            currentDronePos={currentDronePos}
            selectedWaypointId={selectedWaypointId}
            setSelectedWaypointId={setSelectedWaypointId}
          />
        </div>

      </div>
    </div>
  );
}
