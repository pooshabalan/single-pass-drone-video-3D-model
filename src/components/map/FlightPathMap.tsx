import { useEffect, useState, useRef, useMemo } from 'react';
import { PlaneTakeoff, PlaneLanding, Compass, ZoomIn, ZoomOut, Home, LocateFixed } from 'lucide-react';
import { mockFlightData } from '../../data/mockFlightPath';
import { useAppStore } from '../../store/appStore';

interface FlightPathMapProps {
  showFlightPath: boolean;
  showWaypoints: boolean;
  showSurveyArea: boolean;
  followDrone: boolean;
  onDronePositionChange?: (pos: { lat: number, lng: number, alt: number } | null) => void;

  selectedWaypointId: number | null;
  onSelectWaypoint: (id: number | null) => void;
}

export default function FlightPathMap({
  showFlightPath,
  showWaypoints,
  showSurveyArea,
  followDrone,
  onDronePositionChange,

  selectedWaypointId,
  onSelectWaypoint
}: FlightPathMapProps) {
  const theme = useAppStore(state => state.theme);
  const svgRef = useRef<SVGSVGElement>(null);

  // Compute the perfect "Overview" bounding box based on the mock data
  const initialViewBox = useMemo(() => {
    const xs = mockFlightData.surveyBoundary.map(p => p.x);
    const ys = mockFlightData.surveyBoundary.map(p => p.y);
    const minX = Math.min(...xs, mockFlightData.takeoff.x, mockFlightData.landing.x) - 40;
    const maxX = Math.max(...xs, mockFlightData.takeoff.x, mockFlightData.landing.x) + 40;
    const minY = Math.min(...ys, mockFlightData.takeoff.y, mockFlightData.landing.y) - 40;
    const maxY = Math.max(...ys, mockFlightData.takeoff.y, mockFlightData.landing.y) + 40;
    return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;
  }, []);

  const initialWidth = useMemo(() => Number(initialViewBox.split(' ')[2]), [initialViewBox]);

  const [viewBox, setViewBox] = useState(initialViewBox);
  const [droneIndex, setDroneIndex] = useState(-1); // -1 = takeoff, 0..17 = waypoints, 18 = landing
  const [userHasPanned, setUserHasPanned] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });

  const fullPath = useMemo(() => {
    return [mockFlightData.takeoff, ...mockFlightData.path, mockFlightData.landing];
  }, []);

  const totalSteps = fullPath.length;

  // Handle gentle focus when selectedWaypointId changes externally
  useEffect(() => {
    if (selectedWaypointId !== null) {
      const wp = mockFlightData.path.find(p => p.id === selectedWaypointId);
      if (wp) {
        // We want to pan gently. We don't change zoom (width/height), just move x/y to center on wp
        // But if we are zoomed out too much, maybe zoom in a bit, but instructions say "without excessive zooming. Keep surrounding flight-path context visible"
        // So we will just center the current viewBox on the waypoint.
        const parts = viewBox.split(' ').map(Number);
        if (parts.length === 4) {
          let w = parts[2];
          let h = parts[3];
          
          // Ensure we are somewhat zoomed in, but not too much. 
          // If w > initialWidth, we are zoomed out beyond overview. Let's snap to a decent context zoom (e.g. 500)
          if (w > initialWidth * 0.8) {
             w = initialWidth * 0.6; // show about 60% of the survey
             h = initialWidth * 0.6 * (parts[3] / parts[2]); // maintain aspect ratio
          }

          const newX = wp.x - w / 2;
          const newY = wp.y - h / 2;
          
          setViewBox(`${newX} ${newY} ${w} ${h}`);
          setUserHasPanned(true); // Stop auto-drone following from hijacking immediately
        }
      }
    }
  }, [selectedWaypointId]); // intentionally omitting viewBox from deps to prevent loop

  // Drone simulation
  useEffect(() => {
    if (!followDrone) return;
    const interval = setInterval(() => {
      setDroneIndex(prev => (prev + 1) % totalSteps);
    }, 1500);
    return () => clearInterval(interval);
  }, [followDrone, totalSteps]);

  // Position change notification
  useEffect(() => {
    if (droneIndex === -1) {
      onDronePositionChange?.(null);
    } else {
      const baseLat = mockFlightData.location.lat;
      const baseLng = mockFlightData.location.lng;
      const baseAlt = mockFlightData.location.alt;
      const pos = fullPath[Math.max(0, droneIndex)];
      onDronePositionChange?.({
        lat: baseLat + (pos.y - 500) * 0.000005,
        lng: baseLng + (pos.x - 500) * 0.000005,
        alt: baseAlt + (Math.random() * 2 - 1)
      });
    }
  }, [droneIndex, onDronePositionChange, fullPath]);

  const fitView = () => {
    setViewBox(initialViewBox);
    setUserHasPanned(false);
  };

  // Follow drone centering logic
  useEffect(() => {
    if (followDrone && droneIndex >= 0 && !userHasPanned) {
      const parts = viewBox.split(' ').map(Number);
      if (parts.length === 4) {
        const dronePos = fullPath[droneIndex];
        const w = parts[2];
        const h = parts[3];
        const newX = dronePos.x - w / 2;
        const newY = dronePos.y - h / 2;
        setViewBox(`${newX} ${newY} ${w} ${h}`);
      }
    }
  }, [droneIndex, followDrone, fullPath, viewBox, userHasPanned]);

  // Mouse pan logic
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof SVGElement && (e.target.tagName === 'circle' || e.target.tagName === 'button' || e.target.closest('button'))) {
      // Don't start pan if clicking a waypoint or button
      return; 
    }
    setIsPanning(true);
    setStartPan({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning || !svgRef.current) return;
    setUserHasPanned(true);
    const dx = e.clientX - startPan.x;
    const dy = e.clientY - startPan.y;
    const parts = viewBox.split(' ').map(Number);
    if (parts.length === 4) {
      const rect = svgRef.current.getBoundingClientRect();
      const scaleX = parts[2] / rect.width;
      const scaleY = parts[3] / rect.height;
      const newX = parts[0] - dx * scaleX;
      const newY = parts[1] - dy * scaleY;
      setViewBox(`${newX} ${newY} ${parts[2]} ${parts[3]}`);
      setStartPan({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => setIsPanning(false);

  // Zoom logic
  const handleZoom = (factor: number) => {
    setUserHasPanned(true);
    const parts = viewBox.split(' ').map(Number);
    if (parts.length === 4) {
      const minW = 100;
      const maxW = 5000;
      const newW = Math.max(minW, Math.min(maxW, parts[2] * factor));
      const newH = Math.max(minW, Math.min(maxW, parts[3] * factor));
      const newX = parts[0] + (parts[2] - newW) / 2;
      const newY = parts[1] + (parts[3] - newH) / 2;
      setViewBox(`${newX} ${newY} ${newW} ${newH}`);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    const zoomOut = e.deltaY > 0;
    handleZoom(zoomOut ? 1.15 : 0.85);
  };

  const centerOnDrone = () => {
    const parts = viewBox.split(' ').map(Number);
    if (parts.length === 4) {
      const w = parts[2];
      const h = parts[3];
      const newX = currentDronePos.x - w / 2;
      const newY = currentDronePos.y - h / 2;
      setViewBox(`${newX} ${newY} ${w} ${h}`);
      setUserHasPanned(false);
    }
  };

  const currentWidth = Number(viewBox.split(' ')[2] || initialWidth);
  const minW = 100;
  const maxW = 5000;

  // Path strings
  const surveyPolygon = mockFlightData.surveyBoundary.map(p => `${p.x},${p.y}`).join(' ');
  const flightPolyline = fullPath.map(p => `${p.x},${p.y}`).join(' ');

  // Theming colors
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const bgColor = isDark ? '#0A1016' : '#F8FAFC';
  const gridColor = isDark ? '#17212B' : '#E2E8F0';
  const surveyFill = isDark ? 'rgba(42, 157, 143, 0.1)' : 'rgba(42, 157, 143, 0.1)';
  const surveyStroke = isDark ? 'rgba(42, 157, 143, 0.4)' : 'rgba(42, 157, 143, 0.5)';
  const flightStroke = '#2A9D8F';
  const waypointFill = isDark ? '#17212B' : '#FFFFFF';
  
  const currentDronePos = droneIndex >= 0 ? fullPath[droneIndex] : mockFlightData.takeoff;

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-secondary/10 overflow-hidden" style={{ backgroundColor: bgColor }}>
      
      {/* BACKGROUND GRID */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center'
        }}
      />

      {/* MAP CANVAS */}
      <svg 
        ref={svgRef}
        viewBox={viewBox} 
        className={`w-full h-full relative z-10 ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ touchAction: 'none' }}
      >
        <defs>
          <filter id="drone-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.3" />
          </filter>
        </defs>

        {showSurveyArea && (
          <polygon 
            points={surveyPolygon} 
            fill={surveyFill} 
            stroke={surveyStroke} 
            strokeWidth="2" 
            strokeDasharray="10, 5"
          />
        )}

        {showFlightPath && (
          <polyline 
            points={flightPolyline} 
            fill="none" 
            stroke={flightStroke} 
            strokeWidth="3" 
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />
        )}

        {/* WAYPOINTS */}
        {showWaypoints && mockFlightData.path.map((wp, i) => {
          const isSelected = selectedWaypointId === wp.id;
          return (
            <g 
              key={wp.id} 
              transform={`translate(${wp.x}, ${wp.y})`}
              onClick={(e) => {
                e.stopPropagation(); // prevent pan
                onSelectWaypoint(wp.id);
              }}
              className="cursor-pointer group"
              role="button"
              aria-label={`Inspect Waypoint ${wp.id}`}
            >
              {/* Invisible larger hit area */}
              <circle r="20" fill="transparent" />
              
              <circle 
                r={isSelected ? "10" : "6"} 
                fill={isSelected ? '#2A9D8F' : waypointFill} 
                stroke={flightStroke} 
                strokeWidth={isSelected ? "3" : "2"}
                className="transition-all duration-200 group-hover:scale-125"
              />
              
              {(isSelected || i % 4 === 0) && (
                <text 
                  y="-16" 
                  textAnchor="middle" 
                  fill={isSelected ? (isDark ? '#F1F5F9' : '#1E293B') : (isDark ? '#9AA8B5' : '#64748B')} 
                  fontSize={isSelected ? "16" : "12"} 
                  fontFamily="monospace"
                  fontWeight={isSelected ? "bold" : "normal"}
                  className="pointer-events-none"
                >
                  {(i + 1).toString().padStart(2, '0')}
                </text>
              )}
            </g>
          );
        })}

        {/* PROJECT LOCATION */}
        <g transform={`translate(${mockFlightData.projectLocation.x}, ${mockFlightData.projectLocation.y})`}>
          <circle r="8" fill="#F59E0B" opacity="0.2" />
          <circle r="4" fill="#F59E0B" />
          <text x="12" y="4" fontSize="14" fill={isDark ? '#F1F5F9' : '#1E293B'} fontWeight="500">Site Alpha Base</text>
        </g>

        {/* TAKEOFF */}
        <g transform={`translate(${mockFlightData.takeoff.x}, ${mockFlightData.takeoff.y})`}>
          <circle r="16" fill={isDark ? '#1E293B' : '#FFFFFF'} stroke="#3B82F6" strokeWidth="2" />
          <foreignObject x="-10" y="-10" width="20" height="20">
            <PlaneTakeoff className="w-5 h-5 text-blue-500" />
          </foreignObject>
          <text x="24" y="4" fontSize="14" fill={isDark ? '#F1F5F9' : '#1E293B'} fontWeight="500">Takeoff</text>
        </g>

        {/* LANDING */}
        <g transform={`translate(${mockFlightData.landing.x}, ${mockFlightData.landing.y})`}>
          <circle r="16" fill={isDark ? '#1E293B' : '#FFFFFF'} stroke="#EF4444" strokeWidth="2" />
          <foreignObject x="-10" y="-10" width="20" height="20">
            <PlaneLanding className="w-5 h-5 text-red-500" />
          </foreignObject>
          <text x="24" y="4" fontSize="14" fill={isDark ? '#F1F5F9' : '#1E293B'} fontWeight="500">Landing</text>
        </g>

        {/* DRONE POSITION */}
        {(droneIndex >= 0 || followDrone) && (
          <g transform={`translate(${currentDronePos.x}, ${currentDronePos.y})`} filter="url(#drone-shadow)">
            <circle r="12" fill="#2A9D8F" />
            <circle r="4" fill="#FFFFFF" />
          </g>
        )}
      </svg>

      {/* OVERLAYS */}
      <div className="absolute top-4 right-4 flex flex-col items-center pointer-events-none text-primary">
        <Compass className="w-6 h-6 mb-1 text-secondary-text" />
        <span className="text-[12px] font-bold text-secondary-text">N</span>
      </div>

      <div className="absolute bottom-4 left-4 bg-secondary/80 backdrop-blur-sm border border-border px-3 py-2 rounded-md pointer-events-none mb-24 xl:mb-0">
        <div className="flex items-center text-[10px] text-secondary-text mb-1">
          <span>0</span>
          <span className="mx-auto">100 m</span>
          <span>200 m</span>
        </div>
        <div className="flex w-32 h-1 bg-border relative">
          <div className="absolute left-0 top-0 bottom-0 w-1/2 border-r border-secondary-text bg-secondary-text/30" />
          <div className="absolute right-0 top-0 bottom-0 w-1/2 border-l border-secondary-text bg-secondary-text/10" />
        </div>
      </div>


      {/* ZOOM CONTROLS OVERLAY */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-3 z-30 pointer-events-auto">
        {/* Zoom Group */}
        <div className="flex flex-col bg-card border border-border rounded-lg shadow-sm overflow-hidden backdrop-blur-sm">
          <button 
            onClick={(e) => { e.stopPropagation(); handleZoom(0.8); }} 
            disabled={currentWidth <= minW}
            className="flex items-center justify-center w-11 h-11 text-secondary-text hover:text-primary hover:bg-secondary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border-b border-border focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
            aria-label="Zoom in"
            title="Zoom in"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); handleZoom(1.25); }} 
            disabled={currentWidth >= maxW}
            className="flex items-center justify-center w-11 h-11 text-secondary-text hover:text-primary hover:bg-secondary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
            aria-label="Zoom out"
            title="Zoom out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Group */}
        <div className="flex flex-col bg-card border border-border rounded-lg shadow-sm overflow-hidden backdrop-blur-sm">
          <button 
            onClick={(e) => { e.stopPropagation(); fitView(); }} 
            className="flex items-center justify-center w-11 h-11 text-secondary-text hover:text-primary hover:bg-secondary/50 transition-colors border-b border-border focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
            aria-label="Show full survey"
            title="Show full survey"
          >
            <Home className="w-5 h-5" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); centerOnDrone(); }} 
            className={`flex items-center justify-center w-11 h-11 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent ${followDrone && !userHasPanned ? 'text-accent bg-accent/10' : 'text-secondary-text hover:text-primary hover:bg-secondary/50'}`}
            aria-label="Center on drone"
            title="Center on drone"
          >
            <LocateFixed className="w-5 h-5" />
          </button>
        </div>
      </div>

    </div>
  );
}
