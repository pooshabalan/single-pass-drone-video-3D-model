import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

export interface AppSettings {
  theme: Theme;
  gpuAcceleration: boolean;
  maxMemoryGB: string;
  autoSaveCheckpoints: boolean;
  cacheSizeGB: string;
  telemetryEnabled: boolean;
}

export const defaultSettings: AppSettings = {
  theme: 'light',
  gpuAcceleration: true,
  maxMemoryGB: '32',
  autoSaveCheckpoints: true,
  cacheSizeGB: '100',
  telemetryEnabled: false
};

export interface VideoMetadata {
  fileName: string;
  duration: string;
  width: number;
  height: number;
  fileSize: string;
  fps: number;
  estimatedFrames: number;
  isDemo: boolean;
}

export const defaultDemoMetadata: VideoMetadata = {
  fileName: "LineVision-VideoGeoTagging.mp4",
  duration: "01:17",
  width: 1920,
  height: 1080,
  fileSize: "272.3 MB",
  fps: 30,
  estimatedFrames: 2310,
  isDemo: true
};

interface AppState {
  theme: Theme;
  gpuAcceleration: boolean;
  maxMemoryGB: string;
  autoSaveCheckpoints: boolean;
  cacheSizeGB: string;
  telemetryEnabled: boolean;
  sidebarOpen: boolean;
  currentProject: string | null;
  videoMetadata: VideoMetadata;
  setTheme: (theme: Theme) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  toggleSidebar: () => void;
  setCurrentProject: (project: string | null) => void;
  setVideoMetadata: (metadata: VideoMetadata) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: defaultSettings.theme,
      gpuAcceleration: defaultSettings.gpuAcceleration,
      maxMemoryGB: defaultSettings.maxMemoryGB,
      autoSaveCheckpoints: defaultSettings.autoSaveCheckpoints,
      cacheSizeGB: defaultSettings.cacheSizeGB,
      telemetryEnabled: defaultSettings.telemetryEnabled,
      sidebarOpen: true,
      currentProject: null,
      videoMetadata: defaultDemoMetadata,
      setTheme: (theme) => set({ theme }),
      updateSettings: (settings) => set(settings),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setCurrentProject: (currentProject) => set({ currentProject }),
      setVideoMetadata: (videoMetadata) => set({ videoMetadata }),
    }),
    {
      name: 'drone2d3d-app-storage',
      partialize: (state) => ({ 
        theme: state.theme,
        gpuAcceleration: state.gpuAcceleration,
        maxMemoryGB: state.maxMemoryGB,
        autoSaveCheckpoints: state.autoSaveCheckpoints,
        cacheSizeGB: state.cacheSizeGB,
        telemetryEnabled: state.telemetryEnabled
      }),
    }
  )
);
