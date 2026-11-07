import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { useReconstructionStore } from '../store/useReconstructionStore';
import { mockModelData } from '../data/mockModel';
import { mockFlightData } from '../data/mockFlightPath';
import { 
  FolderOpen, 
  Video, 
  Map as MapIcon, 
  Layers, 
  Box, 
  Activity, 
  CheckCircle,
  Upload,
  Play,
  ArrowRight,
  Info
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

export default function Project() {
  const navigate = useNavigate();
  const videoMetadata = useAppStore((state) => state.videoMetadata);
  const { stages, pipelineStatus } = useReconstructionStore();

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8">
      
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="mt-1 p-2 bg-secondary rounded-md text-accent">
            <FolderOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-[24px] md:text-[32px] font-semibold text-primary tracking-tight">
              Project
            </h1>
            <p className="text-[14px] md:text-[16px] text-secondary-text mt-1">
              Campus Survey — Site Alpha
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center space-x-3">
            <Badge variant={pipelineStatus === 'Completed' ? 'success' : pipelineStatus === 'Processing' ? 'info' : pipelineStatus === 'Error' ? 'error' : pipelineStatus === 'Cancelled' ? 'warning' : 'default'}>
              {pipelineStatus}
            </Badge>
          </div>
          <div className="flex items-center text-[11px] font-medium text-secondary-text bg-secondary/80 px-2 py-1 rounded-sm">
            <Info className="w-3.5 h-3.5 mr-1.5" />
            Mock/Demo Data Display
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* MAIN COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 8. PROJECT WORKFLOW (Visual) */}
          <section>
            <h2 className="text-[16px] md:text-[20px] font-semibold mb-4 text-primary">Workflow Architecture</h2>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-row flex-wrap items-center justify-center lg:justify-start gap-y-6 gap-x-2 md:gap-x-4 text-secondary-text text-[13px] font-medium">
                  <div className="flex flex-col items-center w-20 text-center">
                    <div className="p-3 bg-secondary rounded-full mb-3"><Video className="w-5 h-5 text-accent" /></div>
                    <span className="leading-tight">Video</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-border" />
                  <div className="flex flex-col items-center w-20 text-center">
                    <div className="p-3 bg-secondary rounded-full mb-3"><Layers className="w-5 h-5 text-primary" /></div>
                    <span className="leading-tight">Frame Select</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-border" />
                  <div className="flex flex-col items-center w-20 text-center">
                    <div className="p-3 bg-secondary rounded-full mb-3"><Activity className="w-5 h-5 text-primary" /></div>
                    <span className="leading-tight">Feature Match</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-border" />
                  <div className="flex flex-col items-center w-20 text-center">
                    <div className="p-3 bg-secondary rounded-full mb-3"><MapIcon className="w-5 h-5 text-primary" /></div>
                    <span className="leading-tight">Camera Pose</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-border" />
                  <div className="flex flex-col items-center w-20 text-center">
                    <div className="p-3 bg-secondary rounded-full mb-3"><Box className="w-5 h-5 text-primary" /></div>
                    <span className="leading-tight">Sparse Model</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-border" />
                  <div className="flex flex-col items-center w-20 text-center">
                    <div className="p-3 bg-secondary rounded-full mb-3"><Box className="w-5 h-5 text-primary" /></div>
                    <span className="leading-tight">Dense Model</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-border" />
                  <div className="flex flex-col items-center w-20 text-center">
                    <div className="p-3 bg-secondary rounded-full mb-3"><Layers className="w-5 h-5 text-primary" /></div>
                    <span className="leading-tight">Mesh</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-border" />
                  <div className="flex flex-col items-center w-20 text-center">
                    <div className="p-3 bg-success/10 rounded-full mb-3"><CheckCircle className="w-5 h-5 text-success" /></div>
                    <span className="leading-tight text-success font-semibold">3D Viewer</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 2. PROJECT INFORMATION */}
          <section>
            <Card>
              <CardHeader title="Project Information" icon={<Info className="w-4 h-4" />} />
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-[14px]">
                  <div>
                    <p className="text-[12px] text-secondary-text mb-1 uppercase tracking-wider font-semibold">Project</p>
                    <p className="font-medium text-primary">Campus Survey — Site Alpha</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-secondary-text mb-1 uppercase tracking-wider font-semibold">Project Type</p>
                    <p className="font-medium text-primary">Drone Photogrammetry</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-secondary-text mb-1 uppercase tracking-wider font-semibold">Workflow</p>
                    <p className="font-medium text-primary">Single-Pass Video Reconstruction</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-secondary-text mb-1 uppercase tracking-wider font-semibold">Status</p>
                    <p className="font-medium text-primary">
                      {pipelineStatus}
                    </p>
                  </div>
                  <div>
                    <p className="text-[12px] text-secondary-text mb-1 uppercase tracking-wider font-semibold">Data Mode</p>
                    <Badge variant="warning">Frontend Mock Data</Badge>
                  </div>
                  <div>
                    <p className="text-[12px] text-secondary-text mb-1 uppercase tracking-wider font-semibold">Coordinate Reference</p>
                    <p className="font-medium text-primary">Demo / Local</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* 3. VIDEO SOURCE INFORMATION */}
            <section>
              <Card className="h-full">
                <CardHeader title="Source Video" icon={<Video className="w-4 h-4" />} />
                <CardContent>
                  <div className="space-y-3 text-[14px]">
                    <div className="flex justify-between items-center py-1 border-b border-border/50">
                      <span className="text-secondary-text">Filename</span>
                      <span className="font-mono font-medium">{videoMetadata.fileName}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-border/50">
                      <span className="text-secondary-text">Duration</span>
                      <span className="font-medium">{videoMetadata.duration}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-border/50">
                      <span className="text-secondary-text">Resolution</span>
                      <span className="font-medium">{videoMetadata.width} × {videoMetadata.height}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-border/50">
                      <span className="text-secondary-text">Frame Rate</span>
                      <span className="font-medium">{videoMetadata.fps} FPS</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-border/50">
                      <span className="text-secondary-text">File Size</span>
                      <span className="font-medium">{videoMetadata.fileSize}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-secondary-text">Estimated Frames</span>
                      <span className="font-medium">{videoMetadata.estimatedFrames.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 4. SURVEY / FLIGHT INFORMATION */}
            <section>
              <Card className="h-full">
                <CardHeader 
                  title="Survey Data" 
                  icon={<MapIcon className="w-4 h-4" />} 
                  action={<span className="text-[11px] font-medium text-secondary-text bg-secondary/80 px-2 py-0.5 rounded-sm">Demo Values</span>}
                />
                <CardContent>
                  <div className="space-y-3 text-[14px]">
                    <div className="flex justify-between items-center py-1 border-b border-border/50">
                      <span className="text-secondary-text">Location</span>
                      <span className="font-mono font-medium">{mockFlightData.location.lat}°, {mockFlightData.location.lng}°</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-border/50">
                      <span className="text-secondary-text">Flight Altitude</span>
                      <span className="font-medium">{mockFlightData.location.alt} m</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-border/50">
                      <span className="text-secondary-text">Flight Distance</span>
                      <span className="font-medium">{mockFlightData.flight.distance} km</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-secondary-text">Flight Duration</span>
                      <span className="font-medium">{mockFlightData.flight.duration}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">

          {/* 9. QUICK ACTIONS */}
          <section>
            <Card>
              <CardHeader title="Quick Actions" icon={<Activity className="w-4 h-4" />} />
              <CardContent className="space-y-4">
                <Button 
                  variant="primary" 
                  icon={<Upload className="w-5 h-5" />} 
                  onClick={() => navigate('/upload')}
                  fullWidth
                  className="justify-start py-3"
                >
                  Upload Video
                </Button>
                
                <div className="pt-2 border-t border-border/50 space-y-3">
                  <Button 
                    variant="secondary" 
                    icon={<Play className="w-4 h-4" />} 
                    onClick={() => navigate('/reconstruction')}
                    fullWidth
                    className="justify-start"
                  >
                    Reconstruction
                  </Button>
                  <Button 
                    variant="secondary" 
                    icon={<Box className="w-4 h-4" />} 
                    onClick={() => navigate('/model')}
                    fullWidth
                    className="justify-start"
                  >
                    Open 3D Model
                  </Button>
                  <Button 
                    variant="secondary" 
                    icon={<MapIcon className="w-4 h-4" />} 
                    onClick={() => navigate('/map')}
                    fullWidth
                    className="justify-start"
                  >
                    View Flight Path
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 6. CURRENT MODEL SUMMARY & 7. QUALITY SUMMARY */}
          <section>
            <Card>
              <CardHeader 
                title="Model Metrics" 
                icon={<Layers className="w-4 h-4" />} 
                action={<span className="text-[11px] font-medium text-secondary-text bg-secondary/80 px-2 py-0.5 rounded-sm">Demo Data</span>}
              />
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2 text-[13px]">
                    <h4 className="text-[12px] font-semibold text-secondary-text uppercase tracking-wider mb-2">Model Summary</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-secondary-text">Model Type</span>
                      <span className="font-medium">{mockModelData.info.type}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-secondary-text">Vertices</span>
                      <span className="font-medium">{mockModelData.info.vertices}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-secondary-text">Faces</span>
                      <span className="font-medium">{mockModelData.info.faces}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-secondary-text">Point Count</span>
                      <span className="font-medium">{mockModelData.info.pointCount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-secondary-text">Bounding Size</span>
                      <span className="font-mono font-medium">{mockModelData.info.boundingSize}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-secondary-text">Coordinate Reference</span>
                      <span className="font-medium">{mockModelData.info.coordinateReference}</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 space-y-2 text-[13px]">
                    <h4 className="text-[12px] font-semibold text-secondary-text uppercase tracking-wider mb-2">Quality Summary</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-secondary-text">Reconstruction Quality</span>
                      <Badge variant={mockModelData.quality.quality === 'Good' ? 'success' : 'default'}>{mockModelData.quality.quality}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-secondary-text">Camera Registration</span>
                      <span className="font-medium">{mockModelData.quality.registration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-secondary-text">Point Density</span>
                      <Badge variant={mockModelData.quality.density === 'High' ? 'info' : 'default'}>{mockModelData.quality.density}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-secondary-text">Reprojection Error</span>
                      <span className="font-mono font-medium">{mockModelData.quality.reprojectionError}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* 5. RECONSTRUCTION STATUS */}
          <section>
            <Card>
              <CardHeader title="Processing Status" icon={<Activity className="w-4 h-4" />} />
              <CardContent>
                <div className="space-y-3">
                  {stages.map((stage) => (
                    <div key={stage.id} className="flex justify-between items-center text-[13px]">
                      <span className="text-secondary-text">
                        <span className="mr-2 opacity-50 font-mono">{(stage.id).toString().padStart(2, '0')}</span> 
                        {stage.name}
                      </span>
                      <Badge variant={stage.status === 'Completed' ? 'success' : stage.status === 'Processing' ? 'info' : stage.status === 'Error' ? 'error' : 'default'}>
                        {stage.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

        </div>
      </div>
    </div>
  );
}
