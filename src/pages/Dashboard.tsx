import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { useReconstructionStore } from '../store/useReconstructionStore';
import { mockModelData } from '../data/mockModel';
import { 
  Video, 
  Camera, 
  Layers, 
  Box, 
  Map as MapIcon, 
  Activity, 
  Cpu, 
  Play,
  Upload,
  Thermometer,
  FolderOpen
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/common/Card';
import { StatCard } from '../components/common/StatCard';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { Button } from '../components/common/Button';

export default function Dashboard() {
  const navigate = useNavigate();
  const videoMetadata = useAppStore((state) => state.videoMetadata);

  const { stages, pipelineStatus } = useReconstructionStore();

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8">
      
      {/* PAGE HEADER & PROJECT STATUS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] md:text-[32px] font-semibold text-primary tracking-tight">
            Dashboard
          </h1>
          <p className="text-[14px] md:text-[16px] text-secondary-text mt-1">
            Campus Survey — Site Alpha
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-[14px] font-medium text-muted">Project State:</span>
          <Badge variant={pipelineStatus === 'Completed' ? 'success' : pipelineStatus === 'Processing' ? 'info' : pipelineStatus === 'Error' ? 'error' : pipelineStatus === 'Cancelled' ? 'warning' : 'default'}>
            {pipelineStatus}
          </Badge>
          <span className="text-[11px] font-medium text-secondary-text bg-secondary/80 px-2 py-0.5 rounded-sm ml-2">(Mock Data)</span>
        </div>
      </div>

      {/* KEY STATISTICS */}
      <section>
        <h2 className="text-[16px] md:text-[20px] font-semibold mb-4">Key Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard label="Frames" value={videoMetadata.estimatedFrames.toString()} icon={<Video className="w-5 h-5" />} />
          <StatCard label="Registered" value={Math.floor(videoMetadata.estimatedFrames * 0.82).toString()} icon={<Camera className="w-5 h-5" />} />
          <StatCard label="Sparse Points" value="2.4M" icon={<Activity className="w-5 h-5" />} />
          <StatCard label="Dense Points" value={mockModelData.info.pointCount} icon={<Layers className="w-5 h-5" />} />
          <StatCard label="Processing Time" value="--:--" icon={<Activity className="w-5 h-5" />} />
          <StatCard label="Model Size" value="1.2 GB" icon={<Box className="w-5 h-5" />} />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* MAIN COLUMN (Project Summary & Actions) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* QUICK ACTIONS */}
          <section>
            <h2 className="text-[16px] md:text-[20px] font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                variant="primary" 
                icon={<Upload className="w-4 h-4" />} 
                onClick={() => navigate('/upload')}
                className="justify-start"
              >
                Upload Video
              </Button>
              <Button 
                variant="secondary" 
                icon={<Play className="w-4 h-4" />} 
                onClick={() => navigate('/reconstruction')}
                className="justify-start"
              >
                Start Reconstruction
              </Button>
              <Button 
                variant="secondary" 
                icon={<Box className="w-4 h-4" />} 
                onClick={() => navigate('/model')}
                className="justify-start"
              >
                Open 3D Model
              </Button>
              <Button 
                variant="secondary" 
                icon={<MapIcon className="w-4 h-4" />} 
                onClick={() => navigate('/map')}
                className="justify-start"
              >
                View Flight Path
              </Button>
            </div>
          </section>

          {/* PROJECT SUMMARY */}
          <section>
            <Card>
              <CardHeader title="Project Summary" icon={<FolderOpen className="w-4 h-4" />} />
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-[14px]">
                  <div>
                    <p className="text-secondary-text mb-1">Project</p>
                    <p className="font-medium text-primary">Campus Survey — Site Alpha</p>
                  </div>
                  <div>
                    <p className="text-secondary-text mb-1">Video</p>
                    <p className="font-medium text-primary font-mono text-[13px] break-all">{videoMetadata.fileName}</p>
                  </div>
                  <div>
                    <p className="text-secondary-text mb-1">Duration</p>
                    <p className="font-medium text-primary">{videoMetadata.duration}</p>
                  </div>
                  <div>
                    <p className="text-secondary-text mb-1">Resolution</p>
                    <p className="font-medium text-primary">{videoMetadata.width} × {videoMetadata.height}</p>
                  </div>
                  <div>
                    <p className="text-secondary-text mb-1">Frame Rate</p>
                    <p className="font-medium text-primary">{videoMetadata.fps} FPS</p>
                  </div>
                  <div>
                    <p className="text-secondary-text mb-1">Estimated Frames</p>
                    <p className="font-medium text-primary">{videoMetadata.estimatedFrames}</p>
                  </div>
                  <div>
                    <p className="text-secondary-text mb-1">File Size</p>
                    <p className="font-medium text-primary">{videoMetadata.fileSize}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* RIGHT COLUMN (System Status, Quality, Recon Overview) */}
        <div className="space-y-6">
          
          {/* SYSTEM STATUS */}
          <section>
            <Card>
              <CardHeader 
                title="System Status" 
                icon={<Cpu className="w-4 h-4" />} 
                action={<span className="text-[11px] font-medium text-secondary-text bg-secondary/80 px-2 py-0.5 rounded-sm">Demo Status</span>}
              />
              <CardContent className="space-y-4">
                <ProgressBar progress={45} label="CPU Usage" />
                <ProgressBar progress={68} label="GPU Usage" />
                <ProgressBar progress={72} label="Memory" />
                <ProgressBar progress={60} label="Disk" />
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-secondary-text font-medium flex items-center">
                    <Thermometer className="w-4 h-4 mr-2" /> Temperature
                  </span>
                  <span className="text-primary font-medium">62°C</span>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* QUALITY INDICATORS */}
          <section>
            <Card>
              <CardHeader 
                title="Quality Indicators" 
                icon={<Activity className="w-4 h-4" />} 
                action={<span className="text-[11px] font-medium text-secondary-text bg-secondary/80 px-2 py-0.5 rounded-sm">Mock Values</span>}
              />
              <CardContent>
                <div className="space-y-3 text-[13px]">
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-secondary-text">Feature Matches</span>
                    <span className="font-medium">1.84M</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-secondary-text">Inlier Ratio</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-secondary-text">Camera Pose Confidence</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-secondary-text">Reconstruction Coverage</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-border/50">
                    <span className="text-secondary-text">Point Cloud Density</span>
                    <Badge variant={mockModelData.quality.density === 'High' ? 'info' : 'default'}>{mockModelData.quality.density}</Badge>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-secondary-text">Reprojection Error</span>
                    <span className="font-mono font-medium">{mockModelData.quality.reprojectionError}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* RECONSTRUCTION OVERVIEW */}
          <section>
            <Card>
              <CardHeader 
                title="Reconstruction Workflow" 
                icon={<Layers className="w-4 h-4" />} 
              />
              <CardContent>
                <div className="text-[13px] space-y-2 font-mono text-secondary-text mb-4 pr-2">
                  {stages.map((stage) => (
                    <div key={stage.id} className="flex justify-between items-center">
                      <span><span className="opacity-50 mr-2">-</span> {(stage.id).toString().padStart(2, '0')} {stage.name}</span>
                      {stage.status === 'Completed' && <span className="text-[10px] text-success uppercase">Completed</span>}
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-border flex justify-between items-center">
                  <span className="text-[13px] font-medium text-primary">Simulation Status</span>
                  <Badge variant={pipelineStatus === 'Completed' ? 'success' : pipelineStatus === 'Processing' ? 'info' : pipelineStatus === 'Error' ? 'error' : pipelineStatus === 'Cancelled' ? 'warning' : 'default'}>
                    {pipelineStatus}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </section>

        </div>
      </div>
    </div>
  );
}
