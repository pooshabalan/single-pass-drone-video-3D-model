import React, { useState, useRef } from 'react';
import { Box, AlertCircle } from 'lucide-react';
import { Badge } from '../components/common/Badge';
import Viewer3D from '../components/viewer/Viewer3D';
import ViewerToolbar from '../components/viewer/ViewerToolbar';
import ModelLayers from '../components/viewer/ModelLayers';
import PointCloudControls from '../components/viewer/PointCloudControls';
import ModelInfo from '../components/viewer/ModelInfo';
import ViewerLegend from '../components/viewer/ViewerLegend';
import { mockModelData, type LayerDefaults, type PointCloudDefaults } from '../data/mockModel';

export default function ModelViewer() {
  const [layers, setLayers] = useState<LayerDefaults>(mockModelData.layerDefaults);
  const [pointCloudSettings, setPointCloudSettings] = useState<PointCloudDefaults>(mockModelData.pointCloudDefaults);
  const [meshMode, setMeshMode] = useState<'Solid' | 'Wireframe' | 'Solid + Wireframe'>('Solid');
  const [cameraView, setCameraView] = useState<'Orbit' | 'Pan' | 'Top' | 'Front' | 'Side' | 'Reset' | null>('Reset');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewerError, setViewerError] = useState(false);

  const viewerContainerRef = useRef<HTMLDivElement>(null);

  const handleToggleLayer = (layer: keyof LayerDefaults) => {
    setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  const handleUpdatePointCloud = (updates: Partial<PointCloudDefaults>) => {
    setPointCloudSettings((prev) => ({ ...prev, ...updates }));
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerContainerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Sync fullscreen state with browser API
  React.useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-6">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="mt-1 p-2 bg-secondary rounded-md text-accent">
            <Box className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-[24px] md:text-[32px] font-semibold text-primary tracking-tight">
              3D Model
            </h1>
            <p className="text-[14px] md:text-[16px] text-secondary-text mt-1 max-w-2xl">
              Interactive 3D visualization of the project model.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant="warning" className="uppercase tracking-wider text-[10px]">Demo Model</Badge>
        </div>
      </div>

      {/* WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* MAIN VIEWER AREA */}
        <div className="lg:col-span-3 flex flex-col space-y-4">
          <div 
            ref={viewerContainerRef}
            className={`relative rounded-xl overflow-hidden border border-border/60 shadow-sm bg-[#0A1016] ${isFullscreen ? 'w-screen h-screen' : 'h-[500px] lg:h-[700px]'}`}
          >
            {viewerError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-surface">
                <AlertCircle className="w-12 h-12 text-error mb-4 opacity-80" />
                <h3 className="text-[18px] font-semibold text-primary mb-2">3D Viewer Unavailable</h3>
                <p className="text-secondary-text max-w-sm mb-6">
                  Unable to initialize the interactive viewer. This could be due to WebGL not being supported by your browser.
                </p>
                <button 
                  onClick={() => setViewerError(false)}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors text-[14px] font-medium"
                >
                  Retry Initialization
                </button>
              </div>
            ) : (
              <React.Suspense fallback={
                <div className="absolute inset-0 flex items-center justify-center text-secondary-text text-[14px] font-mono">
                  Initializing 3D Workspace...
                </div>
              }>
                <Viewer3D 
                  layers={layers}
                  pointCloudSettings={pointCloudSettings}
                  meshMode={meshMode}
                  cameraView={cameraView}
                  onCameraViewComplete={() => setCameraView(null)}
                />
              </React.Suspense>
            )}

            {/* OVERLAYS */}
            {!viewerError && (
              <>
                <div className="absolute top-4 right-4">
                  <ViewerToolbar 
                    onCameraView={setCameraView} 
                    isFullscreen={isFullscreen}
                    onToggleFullscreen={handleToggleFullscreen}
                  />
                </div>
                <ViewerLegend layers={layers} />
              </>
            )}
          </div>
        </div>

        {/* SIDEBAR CONTROLS */}
        <div className="space-y-6">
          <ModelLayers layers={layers} onToggleLayer={handleToggleLayer} />
          <PointCloudControls 
            settings={pointCloudSettings} 
            onUpdateSettings={handleUpdatePointCloud}
            meshMode={meshMode}
            onUpdateMeshMode={setMeshMode}
          />
          <ModelInfo info={mockModelData.info} quality={mockModelData.quality} />
        </div>

      </div>
    </div>
  );
}
