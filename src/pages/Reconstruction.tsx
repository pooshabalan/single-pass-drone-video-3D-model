import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Box, 
  Video, 
  Activity, 
  Layers, 
  FileVideo, 
  AlertCircle,
  CheckCircle,
  Terminal,
  Cpu
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ProgressBar } from '../components/common/ProgressBar';
import { useReconstructionStore } from '../store/useReconstructionStore';
import { useAppStore } from '../store/appStore';

const STAGE_DURATIONS = [
  3000, // 01. Video Analysis
  3000, // 02. Frame Selection
  5000, // 03. Feature Extraction
  5000, // 04. Feature Matching
  5000, // 05. Camera Pose Estimation
  4000, // 06. Sparse Reconstruction
  6000, // 07. Dense Reconstruction
  5000, // 08. Mesh Generation
  4000, // 09. Mesh Optimization
  3000  // 10. Finalization
];

const TICK_RATE = 100; // ms per tick

export default function Reconstruction() {
  const navigate = useNavigate();
  const timerRef = useRef<number | null>(null);

  const videoMetadata = useAppStore((state) => state.videoMetadata);

  const {
    pipelineStatus,
    currentStageIndex,
    overallProgress,
    stages,
    logs,
    setPipelineStatus,
    setCurrentStageIndex,
    setOverallProgress,
    updateStage,
    addLog,
    resetReconstruction,
    cancelReconstruction
  } = useReconstructionStore();

  const cleanupTimer = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    // Cleanup on unmount
    return cleanupTimer;
  }, []);

  useEffect(() => {
    if (pipelineStatus === 'Processing') {
      if (currentStageIndex >= stages.length) {
        setPipelineStatus('Completed');
        addLog('Reconstruction simulation completed successfully.');
        cleanupTimer();
        return;
      }

      const currentStage = stages[currentStageIndex];
      if (currentStage.status === 'Pending') {
        updateStage(currentStageIndex, { status: 'Initializing' });
        addLog(`${currentStage.name} initialized`);
        setTimeout(() => {
          if (useReconstructionStore.getState().pipelineStatus !== 'Processing') return;
          updateStage(currentStageIndex, { status: 'Processing' });
          addLog(`${currentStage.name} started`);
        }, 500);
        return;
      }

      if (currentStage.status === 'Processing') {
        const totalDuration = STAGE_DURATIONS[currentStageIndex];
        const increment = (TICK_RATE / totalDuration) * 100;

        timerRef.current = window.setInterval(() => {
          const state = useReconstructionStore.getState();
          if (state.pipelineStatus !== 'Processing') {
            cleanupTimer();
            return;
          }

          const stage = state.stages[state.currentStageIndex];
          let newProgress = stage.progress + increment;
          
          if (newProgress >= 100) {
            newProgress = 100;
            cleanupTimer();
            updateStage(state.currentStageIndex, { status: 'Completed', progress: 100 });
            addLog(`${stage.name} completed`);
            
            const nextIndex = state.currentStageIndex + 1;
            const newOverallProgress = Math.round((nextIndex / state.stages.length) * 100);
            setOverallProgress(newOverallProgress);
            
            if (nextIndex < state.stages.length) {
              setCurrentStageIndex(nextIndex);
            } else {
              setPipelineStatus('Completed');
              addLog('Reconstruction simulation completed successfully.');
            }
          } else {
            updateStage(state.currentStageIndex, { progress: newProgress });
            // Approximate overall progress including partial stage
            const completedStagesProgress = (state.currentStageIndex / state.stages.length) * 100;
            const partialStageProgress = (newProgress / 100) * (100 / state.stages.length);
            setOverallProgress(Math.round(completedStagesProgress + partialStageProgress));
          }
        }, TICK_RATE);
      }
    } else {
      cleanupTimer();
    }

    return cleanupTimer;
  }, [pipelineStatus, currentStageIndex, stages[currentStageIndex]?.status]);

  const handleStart = () => {
    if (pipelineStatus === 'Ready' || pipelineStatus === 'Cancelled' || pipelineStatus === 'Error') {
      if (pipelineStatus === 'Cancelled' || pipelineStatus === 'Error') {
        resetReconstruction();
      }
      setPipelineStatus('Processing');
      addLog('Reconstruction simulation started');
    }
  };

  const handleRunAgain = () => {
    cleanupTimer();
    resetReconstruction();
    // After resetting, immediately start processing
    useReconstructionStore.getState().setPipelineStatus('Processing');
    useReconstructionStore.getState().addLog('Reconstruction simulation started');
  };

  const handlePause = () => {
    if (pipelineStatus === 'Processing') {
      setPipelineStatus('Paused');
      updateStage(currentStageIndex, { status: 'Paused' });
      addLog('Reconstruction simulation paused');
    }
  };

  const handleResume = () => {
    if (pipelineStatus === 'Paused') {
      setPipelineStatus('Processing');
      updateStage(currentStageIndex, { status: 'Processing' });
      addLog('Reconstruction simulation resumed');
    }
  };

  const handleCancel = () => {
    if (pipelineStatus === 'Processing' || pipelineStatus === 'Paused') {
      cancelReconstruction();
    }
  };

  const handleReset = () => {
    cleanupTimer();
    resetReconstruction();
  };



  // --- EMPTY STATE ---
  if (!videoMetadata) {
    return (
      <div className="p-6 md:p-8 max-w-[1600px] mx-auto min-h-[80vh] flex items-center justify-center">
        <Card className="max-w-md w-full text-center p-8 border-dashed border-2 border-border/60">
          <FileVideo className="w-16 h-16 text-secondary-text mx-auto mb-4 opacity-50" />
          <h2 className="text-[20px] font-semibold text-primary mb-2">No video available</h2>
          <p className="text-secondary-text mb-8">Upload a drone video before starting reconstruction.</p>
          <Button variant="primary" icon={<Video className="w-4 h-4" />} onClick={() => navigate('/upload')} fullWidth>
            Go to Video Upload
          </Button>
        </Card>
      </div>
    );
  }

  const activeStage = currentStageIndex < stages.length ? stages[currentStageIndex] : stages[stages.length - 1];

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="mt-1 p-2 bg-secondary rounded-md text-accent">
            <Box className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-[24px] md:text-[32px] font-semibold text-primary tracking-tight">
              Reconstruction
            </h1>
            <p className="text-[14px] md:text-[16px] text-secondary-text mt-1 max-w-2xl">
              Process the uploaded drone video through the planned 3D reconstruction workflow.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant="warning" className="uppercase tracking-wider text-[10px]">Simulation Mode</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* MAIN CONTENT */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* INPUT SUMMARY & OVERALL PROGRESS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader title="Input Video Summary" icon={<Video className="w-4 h-4" />} />
              <CardContent className="space-y-3 text-[13px]">
                <div className="flex justify-between items-center py-1 border-b border-border/50">
                  <span className="text-secondary-text font-medium">Filename</span>
                  <span className="font-mono text-primary truncate max-w-[180px]" title={videoMetadata.fileName}>{videoMetadata.fileName}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border/50">
                  <span className="text-secondary-text font-medium">Duration</span>
                  <span className="text-primary">{videoMetadata.duration}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border/50">
                  <span className="text-secondary-text font-medium">Resolution</span>
                  <span className="text-primary">{videoMetadata.width} × {videoMetadata.height}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border/50">
                  <span className="text-secondary-text font-medium">Frame Rate</span>
                  <span className="text-primary">{videoMetadata.fps} FPS (Estimated)</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-border/50">
                  <span className="text-secondary-text font-medium">Estimated Frames</span>
                  <span className="text-primary">{videoMetadata.estimatedFrames.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-secondary-text font-medium">Status</span>
                  <span className="text-success font-medium flex items-center"><CheckCircle className="w-3.5 h-3.5 mr-1" /> Loaded Locally</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="Overall Reconstruction Progress" icon={<Activity className="w-4 h-4" />} />
              <CardContent className="space-y-4">
                <div className="flex items-end justify-between">
                  <span className="text-[32px] font-bold text-primary leading-none">{overallProgress}%</span>
                  <Badge variant={
                    pipelineStatus === 'Completed' ? 'success' : 
                    pipelineStatus === 'Processing' ? 'info' : 
                    pipelineStatus === 'Error' ? 'error' : 
                    pipelineStatus === 'Cancelled' ? 'error' : 
                    pipelineStatus === 'Paused' ? 'warning' : 'default'
                  }>
                    {pipelineStatus}
                  </Badge>
                </div>
                <ProgressBar progress={overallProgress} />
                
                <div className="pt-2 space-y-2 text-[13px]">
                  <div className="flex justify-between">
                    <span className="text-secondary-text">Current Stage:</span>
                    <span className="text-primary font-medium">{pipelineStatus === 'Completed' ? 'Complete' : activeStage.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-text">Stages Completed:</span>
                    <span className="text-primary font-medium">{stages.filter(s => s.status === 'Completed').length} / {stages.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CONTROL BAR */}
          <Card className="bg-secondary/20">
            <CardContent className="p-4 flex flex-wrap gap-3">
              {pipelineStatus === 'Completed' ? (
                <Button 
                  variant="primary" 
                  icon={<RotateCcw className="w-4 h-4" />} 
                  onClick={handleRunAgain}
                >
                  Run Again
                </Button>
              ) : (
                <Button 
                  variant="primary" 
                  icon={<Play className="w-4 h-4" />} 
                  onClick={handleStart}
                  disabled={pipelineStatus === 'Processing'}
                >
                  {(pipelineStatus === 'Error' || pipelineStatus === 'Cancelled') ? 'Retry / Start' : 'Start Reconstruction'}
                </Button>
              )}
              <Button 
                variant="secondary" 
                icon={<Pause className="w-4 h-4" />} 
                onClick={handlePause}
                disabled={pipelineStatus !== 'Processing'}
              >
                Pause
              </Button>
              <Button 
                variant="secondary" 
                icon={<Play className="w-4 h-4 fill-current" />} 
                onClick={handleResume}
                disabled={pipelineStatus !== 'Paused'}
              >
                Resume
              </Button>
              <Button 
                variant="ghost" 
                icon={<Square className="w-4 h-4" />} 
                onClick={handleCancel}
                disabled={pipelineStatus !== 'Processing' && pipelineStatus !== 'Paused'}
                className="text-error hover:text-error hover:bg-error/10"
              >
                Cancel
              </Button>
              <Button 
                variant="ghost" 
                icon={<RotateCcw className="w-4 h-4" />} 
                onClick={handleReset}
                disabled={pipelineStatus === 'Ready'}
                className="ml-auto"
              >
                Reset
              </Button>
            </CardContent>
          </Card>

          {/* RECONSTRUCTION PIPELINE */}
          <Card>
            <CardHeader title="Reconstruction Pipeline" icon={<Layers className="w-4 h-4" />} />
            <CardContent className="space-y-4">
              {stages.map((stage) => (
                <div key={stage.id} className={`p-4 rounded-lg border ${
                  stage.status === 'Processing' ? 'bg-primary/5 border-accent/30' : 
                  stage.status === 'Completed' ? 'bg-success/5 border-success/20' : 
                  stage.status === 'Error' ? 'bg-error/5 border-error/20' : 
                  'bg-secondary/30 border-border/50'
                } transition-colors`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                      <span className="font-mono text-[14px] text-muted font-semibold w-6">{stage.id.toString().padStart(2, '0')}</span>
                      <span className={`font-semibold text-[14px] ${stage.status === 'Processing' ? 'text-accent' : 'text-primary'}`}>
                        {stage.name}
                      </span>
                    </div>
                    <Badge variant={
                      stage.status === 'Completed' ? 'success' : 
                      stage.status === 'Processing' ? 'info' : 
                      stage.status === 'Error' ? 'error' : 
                      stage.status === 'Paused' ? 'warning' : 
                      stage.status === 'Cancelled' ? 'error' : 'default'
                    }>
                      {stage.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <ProgressBar 
                        progress={Math.round(stage.progress)} 
                      />
                    </div>
                    <span className="text-[12px] font-mono text-muted min-w-[3rem] text-right">
                      {Math.round(stage.progress)}%
                    </span>
                  </div>
                  <p className="text-[12px] text-secondary-text mt-2">{stage.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>

        {/* SIDEBAR LOGS & STATS */}
        <div className="space-y-6">
          
          {/* COMPLETION STATE PANEL */}
          {pipelineStatus === 'Completed' && (
            <Card className="border-success/30 bg-success/5">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-[18px] font-semibold text-primary">Reconstruction Complete</h3>
                <p className="text-[13px] text-secondary-text">
                  The frontend reconstruction simulation has completed. No actual computer vision or 3D reconstruction processing was performed.
                </p>
                <div className="pt-4 flex flex-col space-y-3">
                  <Button variant="primary" icon={<Box className="w-4 h-4" />} onClick={() => navigate('/model')} fullWidth>
                    View 3D Model
                  </Button>
                  <Button variant="secondary" icon={<RotateCcw className="w-4 h-4" />} onClick={handleRunAgain} fullWidth>
                    Run Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* CANCELLED STATE PANEL */}
          {pipelineStatus === 'Cancelled' && (
            <Card className="border-error/30 bg-error/5">
              <CardContent className="p-6 text-center space-y-4">
                <AlertCircle className="w-8 h-8 text-error mx-auto mb-2" />
                <h3 className="text-[16px] font-semibold text-error">Reconstruction Cancelled</h3>
                <p className="text-[13px] text-secondary-text">
                  Simulation was cancelled by the user. Progress has been preserved.
                </p>
              </CardContent>
            </Card>
          )}

          {/* PROCESSING LOG */}
          <Card className="flex flex-col h-[350px]">
            <CardHeader title="Processing Log" icon={<Terminal className="w-4 h-4" />} />
            <CardContent className="flex-1 overflow-y-auto p-0 bg-[#0E141B] rounded-b-lg font-mono text-[12px]">
              <div className="p-4 space-y-1.5">
                {logs.map((log, i) => (
                  <div key={i} className="text-[#9AA8B5] leading-relaxed break-words">
                    <span className="text-[#71808D] mr-2">{log.timestamp}</span>
                    <span className={
                      log.message.includes('completed') ? 'text-[#4CAF7A]' : 
                      log.message.includes('started') ? 'text-[#2A9D8F]' : 
                      log.message.includes('Error') || log.message.includes('cancelled') ? 'text-[#D56A6A]' : ''
                    }>{log.message}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* RECONSTRUCTION STATISTICS (Mock Data) */}
          <Card>
            <CardHeader 
              title="Reconstruction Stats" 
              icon={<Cpu className="w-4 h-4" />} 
              action={<Badge variant="warning" className="text-[9px] uppercase">Simulation Data</Badge>}
            />
            <CardContent className="space-y-4">
              <div className="space-y-2 text-[13px]">
                <div className="flex justify-between items-center">
                  <span className="text-secondary-text">Input Frames</span>
                  <span className="font-medium text-primary">
                    {videoMetadata.estimatedFrames.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-text">Selected Frames</span>
                  <span className="font-medium text-primary">
                    {stages[1].status === 'Completed' || stages[1].status === 'Processing' ? '1,200' : '—'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-text">Registered Frames</span>
                  <span className="font-medium text-primary">
                    {stages[4].status === 'Completed' || stages[4].status === 'Processing' ? '982' : '—'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-text">Sparse Points</span>
                  <span className="font-medium text-primary">
                    {stages[5].status === 'Completed' || stages[5].status === 'Processing' ? '2.4M' : '—'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-text">Dense Points</span>
                  <span className="font-medium text-primary">
                    {stages[6].status === 'Completed' || stages[6].status === 'Processing' ? '8.7M' : '—'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-text">Reprojection Error</span>
                  <span className="font-medium text-primary">
                    {stages[4].status === 'Completed' || stages[4].status === 'Processing' ? '0.68 px' : '—'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-text">Mesh Vertices</span>
                  <span className="font-medium text-primary">
                    {stages[7].status === 'Completed' || stages[7].status === 'Processing' ? '1.1M' : '—'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-text">Mesh Faces</span>
                  <span className="font-medium text-primary">
                    {stages[7].status === 'Completed' || stages[7].status === 'Processing' ? '1.8M' : '—'}
                  </span>
                </div>
              </div>
              
              <div className="border-t border-border/50 pt-4 space-y-2 text-[13px]">
                <div className="flex justify-between items-center">
                  <span className="text-secondary-text">Reconstruction Quality</span>
                  {pipelineStatus === 'Completed' ? <Badge variant="success">Good</Badge> : <span className="text-muted">—</span>}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-text">Camera Registration</span>
                  <span className="font-medium text-primary">{stages[4].status === 'Completed' || stages[4].status === 'Processing' ? '82%' : '—'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-text">Point Density</span>
                  {stages[6].status === 'Completed' || stages[6].status === 'Processing' ? <Badge variant="info">High</Badge> : <span className="text-muted">—</span>}
                </div>
              </div>

            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
