import { useState, useEffect, useRef } from 'react';
import { 
  Settings as SettingsIcon, 
  Cpu, 
  HardDrive, 
  Monitor, 
  Shield, 
  Save, 
  RefreshCcw,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useAppStore, defaultSettings } from '../store/appStore';
import type { AppSettings } from '../store/appStore';

export default function Settings() {
  const theme = useAppStore(state => state.theme);
  const gpuAcceleration = useAppStore(state => state.gpuAcceleration);
  const maxMemoryGB = useAppStore(state => state.maxMemoryGB);
  const autoSaveCheckpoints = useAppStore(state => state.autoSaveCheckpoints);
  const cacheSizeGB = useAppStore(state => state.cacheSizeGB);
  const telemetryEnabled = useAppStore(state => state.telemetryEnabled);

  const storeSettings = {
    theme,
    gpuAcceleration,
    maxMemoryGB,
    autoSaveCheckpoints,
    cacheSizeGB,
    telemetryEnabled,
  };
  
  const updateSettings = useAppStore((state) => state.updateSettings);
  const setTheme = useAppStore((state) => state.setTheme);

  // Local state for unsaved changes
  const [localSettings, setLocalSettings] = useState<AppSettings>(storeSettings as AppSettings);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Active section for navigation
  const [activeSection, setActiveSection] = useState('appearance');

  // Refs for scrolling
  const headerRef = useRef<HTMLDivElement>(null);
  const appearanceRef = useRef<HTMLDivElement>(null);
  const processingRef = useRef<HTMLDivElement>(null);
  const storageRef = useRef<HTMLDivElement>(null);
  const privacyRef = useRef<HTMLDivElement>(null);

  // Sync local state when store changes externally (e.g., initial load)
  useEffect(() => {
    // Only sync if we haven't modified locally to avoid overwriting user edits before save
    if (!hasChanges) {
      setLocalSettings({
        theme,
        gpuAcceleration,
        maxMemoryGB,
        autoSaveCheckpoints,
        cacheSizeGB,
        telemetryEnabled,
      });
    }
  }, [theme, gpuAcceleration, maxMemoryGB, autoSaveCheckpoints, cacheSizeGB, telemetryEnabled, hasChanges]);

  // Check for unsaved changes
  useEffect(() => {
    const isDifferent = JSON.stringify(localSettings) !== JSON.stringify({
      theme,
      gpuAcceleration,
      maxMemoryGB,
      autoSaveCheckpoints,
      cacheSizeGB,
      telemetryEnabled,
    });
    setHasChanges(isDifferent);
    if (isDifferent && saveStatus === 'saved') {
      setSaveStatus('idle');
    }
  }, [localSettings, theme, gpuAcceleration, maxMemoryGB, autoSaveCheckpoints, cacheSizeGB, telemetryEnabled, saveStatus]);

  // Intersection Observer for scroll spy
  useEffect(() => {
    const mainEl = document.querySelector('main');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: mainEl, rootMargin: '-120px 0px -60% 0px' }
    );

    if (appearanceRef.current) observer.observe(appearanceRef.current);
    if (processingRef.current) observer.observe(processingRef.current);
    if (storageRef.current) observer.observe(storageRef.current);
    if (privacyRef.current) observer.observe(privacyRef.current);

    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (id: string, ref: React.RefObject<HTMLDivElement | null>) => {
    setActiveSection(id);
    if (ref.current && headerRef.current) {
      const mainEl = document.querySelector('main');
      if (mainEl) {
        const headerHeight = headerRef.current.offsetHeight;
        const elementTopRelative = ref.current.getBoundingClientRect().top - mainEl.getBoundingClientRect().top;
        const targetScrollTop = mainEl.scrollTop + elementTopRelative - headerHeight - 32;
        mainEl.scrollTo({ top: Math.max(0, targetScrollTop), behavior: 'smooth' });
      }
    }
  };

  const handleChange = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
    
    // Theme applies instantly globally (but also saves to store immediately for persistence)
    if (key === 'theme') {
      setTheme(value as any);
      updateSettings({ theme: value as any }); 
    }
  };

  const handleSave = () => {
    if (!hasChanges) return;
    updateSettings(localSettings);
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  const handleReset = () => {
    setLocalSettings(defaultSettings);
    setTheme(defaultSettings.theme);
    updateSettings(defaultSettings);
    setShowResetConfirm(false);
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  return (
    <div className="p-6 md:p-8 max-w-[1200px] mx-auto space-y-8 relative">
      
      {/* HEADER */}
      <div ref={headerRef} className="flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 bg-background z-20 py-6 -my-6 px-4 -mx-4 md:px-0 md:mx-0 mb-4 border-b border-border/50 shadow-sm">
        <div className="flex items-start space-x-3">
          <div className="mt-1 p-2 bg-secondary rounded-md text-accent">
            <SettingsIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-[24px] md:text-[32px] font-semibold text-primary tracking-tight">
              Settings
            </h1>
            <p className="text-[14px] md:text-[16px] text-secondary-text mt-1 max-w-2xl">
              Configure application preferences, processing parameters, and system resources.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {hasChanges && saveStatus !== 'saved' && (
            <span className="text-[13px] text-warning font-medium flex items-center animate-in fade-in">
              <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
              Unsaved changes
            </span>
          )}
          {saveStatus === 'saved' && (
            <span className="text-[13px] text-success font-medium flex items-center animate-in fade-in">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
              Settings saved
            </span>
          )}
          <div className="flex space-x-3">
            <Button variant="secondary" icon={<RefreshCcw className="w-4 h-4" />} onClick={() => setShowResetConfirm(true)}>
              Reset Defaults
            </Button>
            <Button 
              variant={hasChanges ? "primary" : "secondary"} 
              icon={<Save className="w-4 h-4" />} 
              onClick={handleSave}
              className={!hasChanges ? "opacity-70" : ""}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* RESET CONFIRMATION DIALOG */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={() => setShowResetConfirm(false)}>
          <div onClick={e => e.stopPropagation()} className="w-full max-w-md">
            <Card className="w-full shadow-lg">
              <CardHeader title="Reset Settings?" icon={<AlertTriangle className="w-4 h-4 text-warning" />} />
              <CardContent className="space-y-6">
                <p className="text-[14px] text-secondary-text">
                  This will restore all application preferences to their default values. This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                  <Button variant="secondary" onClick={() => setShowResetConfirm(false)}>Cancel</Button>
                  <Button variant="primary" className="bg-error hover:bg-error/90 text-white border-error" onClick={handleReset}>Reset Defaults</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-4">
        
        {/* LEFT NAV / CATEGORIES */}
        <div className="space-y-2 lg:sticky lg:top-32 self-start hidden md:block max-h-[calc(100vh-8rem)] overflow-y-auto pb-6 pr-2">
          <button 
            className={`w-full text-left px-4 py-3 rounded-md font-medium flex items-center transition-colors ${activeSection === 'appearance' ? 'bg-secondary/50 text-primary border border-accent/20' : 'text-secondary-text hover:bg-secondary/30 hover:text-primary'}`}
            onClick={() => handleScrollTo('appearance', appearanceRef)}
          >
            <Monitor className={`w-4 h-4 mr-3 ${activeSection === 'appearance' ? 'text-accent' : ''}`} />
            Appearance & UI
          </button>
          <button 
            className={`w-full text-left px-4 py-3 rounded-md font-medium flex items-center transition-colors ${activeSection === 'processing' ? 'bg-secondary/50 text-primary border border-accent/20' : 'text-secondary-text hover:bg-secondary/30 hover:text-primary'}`}
            onClick={() => handleScrollTo('processing', processingRef)}
          >
            <Cpu className={`w-4 h-4 mr-3 ${activeSection === 'processing' ? 'text-accent' : ''}`} />
            Processing & Performance
          </button>
          <button 
            className={`w-full text-left px-4 py-3 rounded-md font-medium flex items-center transition-colors ${activeSection === 'storage' ? 'bg-secondary/50 text-primary border border-accent/20' : 'text-secondary-text hover:bg-secondary/30 hover:text-primary'}`}
            onClick={() => handleScrollTo('storage', storageRef)}
          >
            <HardDrive className={`w-4 h-4 mr-3 ${activeSection === 'storage' ? 'text-accent' : ''}`} />
            Storage & Cache
          </button>
          <button 
            className={`w-full text-left px-4 py-3 rounded-md font-medium flex items-center transition-colors ${activeSection === 'privacy' ? 'bg-secondary/50 text-primary border border-accent/20' : 'text-secondary-text hover:bg-secondary/30 hover:text-primary'}`}
            onClick={() => handleScrollTo('privacy', privacyRef)}
          >
            <Shield className={`w-4 h-4 mr-3 ${activeSection === 'privacy' ? 'text-accent' : ''}`} />
            Privacy & Telemetry
          </button>

          {/* CURRENT CONFIGURATION SUMMARY */}
          <Card className="mt-8 bg-secondary/20">
            <CardHeader title="Current Config" />
            <CardContent className="space-y-3 py-4 text-[13px]">
              <div className="flex justify-between">
                <span className="text-secondary-text">Theme</span>
                <span className="font-medium capitalize">{localSettings.theme}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-text">GPU</span>
                <span className="font-medium">{localSettings.gpuAcceleration ? 'Enabled' : 'Disabled'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-text">Memory</span>
                <span className="font-medium">{localSettings.maxMemoryGB} GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-text">Cache</span>
                <span className="font-medium">{localSettings.cacheSizeGB} GB</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-3 space-y-8 pb-12">
          
          <div id="appearance" ref={appearanceRef}>
            <Card>
              <CardHeader title="Appearance & UI" icon={<Monitor className="w-4 h-4" />} />
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-[14px] font-medium text-primary mb-2">Theme Preference</label>
                  <div className="flex space-x-4">
                    <button 
                      className={`px-4 py-2 rounded-md border text-[13px] font-medium transition-colors ${
                        localSettings.theme === 'light' ? 'bg-primary/5 border-accent text-accent' : 'bg-transparent border-border text-secondary-text hover:border-accent/50'
                      }`}
                      onClick={() => handleChange('theme', 'light')}
                    >
                      Light Mode
                    </button>
                    <button 
                      className={`px-4 py-2 rounded-md border text-[13px] font-medium transition-colors ${
                        localSettings.theme === 'dark' ? 'bg-primary/5 border-accent text-accent' : 'bg-transparent border-border text-secondary-text hover:border-accent/50'
                      }`}
                      onClick={() => handleChange('theme', 'dark')}
                    >
                      Dark Mode
                    </button>
                    <button 
                      className={`px-4 py-2 rounded-md border text-[13px] font-medium transition-colors ${
                        localSettings.theme === 'system' ? 'bg-primary/5 border-accent text-accent' : 'bg-transparent border-border text-secondary-text hover:border-accent/50'
                      }`}
                      onClick={() => handleChange('theme', 'system')}
                    >
                      System Default
                    </button>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <label className="block text-[14px] font-medium text-primary mb-2">3D Viewer Background</label>
                  <p className="text-[13px] text-secondary-text mb-3 max-w-2xl">
                    The 3D model viewer operates with a fixed dark canvas to ensure optimal contrast and point cloud visibility regardless of the global UI theme.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div id="processing" ref={processingRef}>
            <Card>
              <CardHeader title="Processing & Performance" icon={<Cpu className="w-4 h-4" />} />
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-[14px] font-medium text-primary">GPU Acceleration</h4>
                    <p className="text-[12px] text-secondary-text mt-1 max-w-xl">Use hardware acceleration for feature extraction and dense reconstruction.</p>
                    <span className="inline-block mt-2 text-[11px] font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-sm">Frontend Simulation</span>
                  </div>
                  <button 
                    aria-label="Toggle GPU Acceleration"
                    aria-pressed={localSettings.gpuAcceleration}
                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${localSettings.gpuAcceleration ? 'bg-accent' : 'bg-secondary'}`}
                    onClick={() => handleChange('gpuAcceleration', !localSettings.gpuAcceleration)}
                  >
                    <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${localSettings.gpuAcceleration ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <label className="block text-[14px] font-medium text-primary mb-2" htmlFor="memory-target">Maximum Memory Usage (GB)</label>
                  <p className="text-[12px] text-secondary-text mt-1 mb-3 max-w-xl">Maximum memory target for future reconstruction processing.</p>
                  <select 
                    id="memory-target"
                    className="w-full max-w-xs bg-secondary/30 border border-border rounded-md px-3 py-2 text-[13px] text-primary focus:outline-none focus:border-accent"
                    value={localSettings.maxMemoryGB}
                    onChange={(e) => handleChange('maxMemoryGB', e.target.value)}
                  >
                    <option value="8">8 GB</option>
                    <option value="16">16 GB</option>
                    <option value="32">32 GB</option>
                    <option value="64">64 GB</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          <div id="storage" ref={storageRef}>
            <Card>
              <CardHeader title="Storage & Cache" icon={<HardDrive className="w-4 h-4" />} />
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-[14px] font-medium text-primary">Auto-save Checkpoints</h4>
                    <p className="text-[12px] text-secondary-text mt-1">Automatically save pipeline progress after each major reconstruction stage.</p>
                    <p className="text-[12px] font-medium mt-1 text-primary">
                      {localSettings.autoSaveCheckpoints ? 'Checkpoint saving enabled' : 'Checkpoint saving disabled'}
                    </p>
                  </div>
                  <button 
                    aria-label="Toggle Auto-save"
                    aria-pressed={localSettings.autoSaveCheckpoints}
                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${localSettings.autoSaveCheckpoints ? 'bg-accent' : 'bg-secondary'}`}
                    onClick={() => handleChange('autoSaveCheckpoints', !localSettings.autoSaveCheckpoints)}
                  >
                    <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${localSettings.autoSaveCheckpoints ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="pt-4 border-t border-border">
                  <label className="block text-[14px] font-medium text-primary mb-2" htmlFor="cache-limit">Cache Size Limit (GB)</label>
                  <p className="text-[12px] text-secondary-text mt-1 mb-3 max-w-xl">Controls the target cache limit for locally stored reconstruction data.</p>
                  <select 
                    id="cache-limit"
                    className="w-full max-w-xs bg-secondary/30 border border-border rounded-md px-3 py-2 text-[13px] text-primary focus:outline-none focus:border-accent"
                    value={localSettings.cacheSizeGB}
                    onChange={(e) => handleChange('cacheSizeGB', e.target.value)}
                  >
                    <option value="25">25 GB</option>
                    <option value="50">50 GB</option>
                    <option value="100">100 GB</option>
                    <option value="250">250 GB</option>
                    <option value="500">500 GB</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          <div id="privacy" ref={privacyRef}>
            <Card>
              <CardHeader title="Privacy & Telemetry" icon={<Shield className="w-4 h-4" />} />
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-[14px] font-medium text-primary">Share Telemetry</h4>
                    <p className="text-[12px] text-secondary-text mt-1 max-w-xl">
                      {localSettings.telemetryEnabled 
                        ? 'Anonymous crash reports and basic usage statistics may be shared.' 
                        : 'Anonymous telemetry is disabled.'}
                    </p>
                    <span className="inline-block mt-2 text-[11px] font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-sm">Future Preference</span>
                  </div>
                  <button 
                    aria-label="Toggle Telemetry"
                    aria-pressed={localSettings.telemetryEnabled}
                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${localSettings.telemetryEnabled ? 'bg-accent' : 'bg-secondary'}`}
                    onClick={() => handleChange('telemetryEnabled', !localSettings.telemetryEnabled)}
                  >
                    <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${localSettings.telemetryEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
