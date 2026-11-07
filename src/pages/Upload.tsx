import { useState, useRef, type DragEvent, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload as UploadIcon, 
  Video, 
  FileVideo, 
  X, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  PlaySquare,
  ArrowRight,
  Info
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { useAppStore, type VideoMetadata, defaultDemoMetadata } from '../store/appStore';

export default function Upload() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const setGlobalVideoMetadata = useAppStore((state) => state.setVideoMetadata);

  const supportedTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo']; // mp4, mov, avi

  const cleanup = () => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    setSelectedFile(null);
    setVideoUrl(null);
    setMetadata(null);
    setError(null);
    setIsValidating(false);
    setGlobalVideoMetadata(defaultDemoMetadata);
  };

  const handleFile = (file: File) => {
    cleanup();
    
    if (!supportedTypes.includes(file.type) && !file.name.match(/\.(mp4|mov|avi)$/i)) {
      setError('Unsupported Video Format. Please select an MP4, MOV, or AVI video.');
      return;
    }

    setIsValidating(true);
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
    // Reset the input value so the same file can be selected again if removed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number) => {
    if (!seconds || !isFinite(seconds)) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const onVideoLoadedMetadata = () => {
    if (videoRef.current && selectedFile) {
      const estimatedFrames = Math.round(videoRef.current.duration * 30);
      const newMetadata: VideoMetadata = {
        fileName: selectedFile.name,
        duration: formatDuration(videoRef.current.duration),
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight,
        fileSize: formatSize(selectedFile.size),
        fps: 30,
        estimatedFrames: estimatedFrames,
        isDemo: false
      };
      setMetadata(newMetadata);
      setGlobalVideoMetadata(newMetadata);
      setIsValidating(false);
    }
  };

  const onVideoError = () => {
    setError('Unable to Read Video. Please select another supported video file.');
    setIsValidating(false);
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
      setVideoUrl(null);
    }
  };



  const hasValidMetadata = metadata !== null;

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8">
      
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="mt-1 p-2 bg-secondary rounded-md text-accent">
            <UploadIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-[24px] md:text-[32px] font-semibold text-primary tracking-tight">
              Video Upload
            </h1>
            <p className="text-[14px] md:text-[16px] text-secondary-text mt-1 max-w-2xl">
              Upload a single drone flight video to prepare it for photogrammetric reconstruction.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant={hasValidMetadata ? 'success' : 'default'}>
            {hasValidMetadata ? 'Ready for Review' : 'No Video Selected'}
          </Badge>
        </div>
      </div>

      {/* WORKFLOW INDICATOR */}
      <div className="flex items-center space-x-2 text-[12px] font-medium text-muted uppercase tracking-wider overflow-x-auto whitespace-nowrap hide-scrollbar pb-2">
        <div className="flex items-center text-accent bg-accent/10 px-3 py-1.5 rounded-sm">
          <UploadIcon className="w-4 h-4 mr-2" /> Video Input
        </div>
        <ArrowRight className="w-4 h-4" />
        <div className="flex items-center px-2">Frame Preparation</div>
        <ArrowRight className="w-4 h-4" />
        <div className="flex items-center px-2">Reconstruction</div>
        <ArrowRight className="w-4 h-4" />
        <div className="flex items-center px-2">3D Model</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: UPLOAD & PREVIEW */}
        <div className="space-y-6">
          
          {error ? (
            <Card className="border-error/50 bg-error/5">
              <CardContent className="p-8 text-center flex flex-col items-center">
                <AlertCircle className="w-12 h-12 text-error mb-4" />
                <h3 className="text-[18px] font-semibold text-error mb-2">{error.split('.')[0]}</h3>
                <p className="text-secondary-text mb-6">{error.split('.').slice(1).join('.').trim() || 'An error occurred.'}</p>
                <Button variant="secondary" onClick={cleanup} icon={<RefreshCw className="w-4 h-4" />}>
                  Choose Another Video
                </Button>
              </CardContent>
            </Card>
          ) : !videoUrl ? (
            <div 
              className={`border-2 border-dashed rounded-lg p-10 md:p-16 flex flex-col items-center justify-center text-center transition-colors ${
                isDragging ? 'border-accent bg-accent/5' : 'border-border hover:bg-secondary/50 hover:border-accent/50'
              }`}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
              <FileVideo className="w-12 h-12 text-secondary-text mb-4" />
              <h3 className="text-[18px] font-semibold text-primary mb-2">Drop your drone video here</h3>
              <p className="text-[14px] text-secondary-text mb-6">Drag and drop a video file, or browse from your computer.</p>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="video/mp4,video/quicktime,video/x-msvideo,video/*" 
                onChange={onFileInputChange}
              />
              <Button 
                variant="primary" 
                onClick={() => fileInputRef.current?.click()}
                icon={<UploadIcon className="w-4 h-4" />}
              >
                Browse Video
              </Button>
              
              <div className="mt-6 flex items-center justify-center space-x-4 text-[12px] text-muted">
                <span>Supported: MP4, MOV, AVI</span>
              </div>
            </div>
          ) : (
            <Card>
              <CardHeader title="Video Preview" icon={<PlaySquare className="w-4 h-4" />} />
              <div className="bg-black w-full aspect-video flex items-center justify-center relative overflow-hidden">
                <video 
                  ref={videoRef}
                  src={videoUrl} 
                  controls 
                  className="w-full h-full object-contain"
                  onLoadedMetadata={onVideoLoadedMetadata}
                  onError={onVideoError}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <CardContent className="bg-secondary/30 flex justify-between items-center py-3">
                <span className="text-[13px] font-medium text-success flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1.5" /> Loaded Locally
                </span>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} icon={<RefreshCw className="w-3.5 h-3.5" />}>
                    Replace
                  </Button>
                  <Button variant="ghost" size="sm" onClick={cleanup} icon={<X className="w-3.5 h-3.5" />} className="text-error hover:text-error hover:bg-error/10">
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* REQUIREMENTS PANEL */}
          <Card>
            <CardHeader title="Video Input Requirements" icon={<Info className="w-4 h-4" />} />
            <CardContent>
              <div className="space-y-4 text-[13px]">
                <div>
                  <h4 className="font-semibold text-primary mb-2">Recommended:</h4>
                  <ul className="list-disc pl-5 text-secondary-text space-y-1">
                    <li>Single continuous drone flight</li>
                    <li>Stable forward motion</li>
                    <li>Sufficient scene overlap</li>
                    <li>Good lighting</li>
                    <li>Minimal motion blur</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Supported Formats:</h4>
                  <p className="text-secondary-text">MP4, MOV, AVI</p>
                </div>
                <div className="p-3 bg-secondary/50 rounded-md border border-border">
                  <p className="text-secondary-text">
                    <strong className="text-primary font-medium">Purpose:</strong> The uploaded video will later provide frames for feature extraction, camera pose estimation, and 3D reconstruction. 
                    <span className="italic ml-1">These operations are future pipeline steps and are not being performed now.</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* RIGHT COLUMN: METADATA & VALIDATION */}
        <div className="space-y-6">
          
          <Card>
            <CardHeader title="Video Metadata" icon={<Video className="w-4 h-4" />} />
            <CardContent>
              {metadata ? (
                <div className="space-y-3 text-[14px]">
                  <div className="flex flex-col py-1 border-b border-border/50">
                    <span className="text-secondary-text text-[12px] uppercase tracking-wider font-semibold mb-1">Filename</span>
                    <span className="font-mono font-medium text-primary break-all">{metadata.fileName}</span>
                  </div>
                  <div className="flex flex-col py-1 border-b border-border/50">
                    <span className="text-secondary-text text-[12px] uppercase tracking-wider font-semibold mb-1">File Size</span>
                    <span className="font-medium text-primary">{metadata.fileSize}</span>
                  </div>
                  <div className="flex flex-col py-1 border-b border-border/50">
                    <span className="text-secondary-text text-[12px] uppercase tracking-wider font-semibold mb-1">Duration</span>
                    <span className="font-medium text-primary">{metadata.duration}</span>
                  </div>
                  <div className="flex flex-col py-1 border-b border-border/50">
                    <span className="text-secondary-text text-[12px] uppercase tracking-wider font-semibold mb-1">Resolution</span>
                    <span className="font-medium text-primary">{metadata.width} × {metadata.height}</span>
                  </div>
                  <div className="flex flex-col py-1 border-b border-border/50">
                    <span className="text-secondary-text text-[12px] uppercase tracking-wider font-semibold mb-1">Frame Rate</span>
                    <span className="font-medium text-primary flex items-center">
                      {metadata.fps} FPS <Badge variant="default" className="ml-2 font-normal text-[10px]">Estimated</Badge>
                    </span>
                  </div>
                  <div className="flex flex-col py-1">
                    <span className="text-secondary-text text-[12px] uppercase tracking-wider font-semibold mb-1">Estimated Frames</span>
                    <span className="font-medium text-primary flex items-center">
                      {metadata.estimatedFrames.toLocaleString()} <Badge variant="default" className="ml-2 font-normal text-[10px]">Estimated</Badge>
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-secondary-text text-[13px]">
                  Select a video to view metadata
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Video Validation" icon={<CheckCircle className="w-4 h-4" />} />
            <CardContent>
              <div className="space-y-3 text-[14px]">
                <div className="flex items-center">
                  {selectedFile ? <CheckCircle className="w-4 h-4 text-success mr-3 shrink-0" /> : <div className="w-4 h-4 rounded-full border-2 border-border mr-3 shrink-0" />}
                  <span className={selectedFile ? "text-primary font-medium" : "text-muted"}>Video file detected</span>
                </div>
                <div className="flex items-center">
                  {selectedFile && !error ? <CheckCircle className="w-4 h-4 text-success mr-3 shrink-0" /> : <div className="w-4 h-4 rounded-full border-2 border-border mr-3 shrink-0" />}
                  <span className={selectedFile && !error ? "text-primary font-medium" : "text-muted"}>Supported format</span>
                </div>
                <div className="flex items-center">
                  {metadata ? <CheckCircle className="w-4 h-4 text-success mr-3 shrink-0" /> : <div className="w-4 h-4 rounded-full border-2 border-border mr-3 shrink-0" />}
                  <span className={metadata ? "text-primary font-medium" : "text-muted"}>
                    {isValidating ? 'Reading metadata...' : 'Video metadata readable'}
                  </span>
                </div>
                <div className="flex items-center">
                  {metadata && !error ? <CheckCircle className="w-4 h-4 text-success mr-3 shrink-0" /> : <div className="w-4 h-4 rounded-full border-2 border-border mr-3 shrink-0" />}
                  <span className={metadata && !error ? "text-primary font-medium" : "text-muted"}>Ready for reconstruction</span>
                </div>
              </div>

              {metadata && !error && (
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="bg-success/5 border border-success/20 rounded-md p-4 mb-4 text-[13px]">
                    <p className="text-primary font-medium mb-1">Ready for Reconstruction</p>
                    <p className="text-secondary-text">The video has been loaded locally and is ready for the future reconstruction workflow.</p>
                  </div>
                  <Button 
                    variant="primary" 
                    fullWidth 
                    size="lg"
                    icon={<ArrowRight className="w-5 h-5" />}
                    onClick={() => navigate('/reconstruction')}
                  >
                    Continue to Reconstruction
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
