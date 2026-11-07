import { useEffect } from 'react';
import { useExportStore } from '../../store/useExportStore';
import { downloadDemoFile } from '../../utils/exportUtils';
import { Card, CardContent } from '../common/Card';
import { Button } from '../common/Button';
import { ProgressBar } from '../common/ProgressBar';
import { CheckCircle2, Download, RefreshCw, X } from 'lucide-react';


const EXPORT_STEPS = [
  { p: 10, text: 'Preparing geometry...' },
  { p: 35, text: 'Processing model data...' },
  { p: 60, text: 'Applying export settings...' },
  { p: 85, text: 'Packaging output...' },
  { p: 100, text: 'Finalizing export...' }
];

export default function ExportProgress() {
  const { format, status, progress, currentStep, setProgress, completeExport, cancelExport, resetExport, settings } = useExportStore();

  useEffect(() => {
    if (status !== 'processing') return;

    let currentIdx = 0;
    
    const interval = setInterval(() => {
      if (currentIdx >= EXPORT_STEPS.length) {
        clearInterval(interval);
        
        // Calculate the same deterministic size for the success state
        let base = 150;
        if (['OBJ', 'FBX', 'GLTF', 'GLB'].includes(format)) {
          if (format === 'FBX') base += 50;
          if (format === 'OBJ') base += 80;
          if (settings.meshDetail === 'High') base *= 1.5;
          if (settings.meshDetail === 'Low') base *= 0.6;
          if (settings.textureResolution === '8K') base += 200;
          if (settings.textureResolution === '4K') base += 50;
        } else {
          base = 400;
          if (format === 'LAS') base *= 1.2;
          if (settings.pointDensity === 'High') base *= 2;
          if (settings.pointDensity === 'Low') base *= 0.5;
          if (settings.includeClassification) base *= 1.1;
        }
        
        completeExport(`~${Math.round(base)} MB`);
        return;
      }

      const step = EXPORT_STEPS[currentIdx];
      setProgress(step.p, step.text);
      currentIdx++;
    }, 800); // roughly 4 seconds total (5 steps * 800ms)

    return () => clearInterval(interval);
  }, [status, format, settings, setProgress, completeExport]);

  if (status === 'idle') return null;

  if (status === 'success') {
    return (
      <Card className="border-green-500/30 bg-green-500/5 shadow-sm">
        <CardContent className="p-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-[20px] font-bold text-primary mb-1">Export Complete</h3>
          <p className="text-[14px] text-secondary-text mb-6">Your simulated model has been packaged.</p>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm">
            <Button className="flex-1 w-full" icon={<Download className="w-4 h-4" />} onClick={() => downloadDemoFile(format, 'Campus Survey — Site Alpha')}>
              Download Demo File
            </Button>
            <Button variant="secondary" className="flex-1 w-full" icon={<RefreshCw className="w-4 h-4" />} onClick={resetExport}>
              Export Another
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-accent/30 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-accent/20" />
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[16px] font-bold text-primary">Exporting {format}</h3>
          <span className="text-[16px] font-bold text-accent">{progress}%</span>
        </div>
        
        <ProgressBar progress={progress} className="mb-4" />
        
        <div className="flex items-center justify-between">
          <p className="text-[13px] text-secondary-text animate-pulse">{currentStep}</p>
          <Button variant="ghost" size="sm" icon={<X className="w-3.5 h-3.5" />} onClick={cancelExport} className="text-error hover:bg-error/10 hover:text-error">
            Cancel Export
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
