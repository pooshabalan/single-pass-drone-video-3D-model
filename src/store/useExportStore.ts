import { create } from 'zustand';
import type { ExportFormat, ExportRecord } from '../data/mockExportHistory';
import { mockExportHistory } from '../data/mockExportHistory';

export type ExportStatus = 'idle' | 'processing' | 'success' | 'error';

interface ExportSettings {
  textureResolution: '2K' | '4K' | '8K';
  meshDetail: 'High' | 'Medium' | 'Low';
  includeMaterials: boolean;
  pointDensity: 'High' | 'Medium' | 'Low';
  includeRGB: boolean;
  includeClassification: boolean;
  coordinateReference: 'Demo / Local';
}

interface ExportState {
  format: ExportFormat;
  settings: ExportSettings;
  status: ExportStatus;
  progress: number;
  currentStep: string;
  history: ExportRecord[];
  
  setFormat: (format: ExportFormat) => void;
  updateSettings: (settings: Partial<ExportSettings>) => void;
  startExport: () => void;
  setProgress: (progress: number, step: string) => void;
  completeExport: (estimatedSize: string) => void;
  cancelExport: () => void;
  resetExport: () => void;
}

const defaultSettings: ExportSettings = {
  textureResolution: '4K',
  meshDetail: 'Medium',
  includeMaterials: true,
  pointDensity: 'Medium',
  includeRGB: true,
  includeClassification: false,
  coordinateReference: 'Demo / Local',
};

export const useExportStore = create<ExportState>((set, get) => ({
  format: 'OBJ',
  settings: defaultSettings,
  status: 'idle',
  progress: 0,
  currentStep: '',
  history: mockExportHistory,

  setFormat: (format) => set({ format }),
  
  updateSettings: (newSettings) => set((state) => ({
    settings: { ...state.settings, ...newSettings }
  })),

  startExport: () => set({ 
    status: 'processing', 
    progress: 0, 
    currentStep: 'Preparing geometry...' 
  }),

  setProgress: (progress, currentStep) => set({ progress, currentStep }),

  completeExport: (estimatedSize) => {
    const state = get();
    
    // Create settings summary
    let summary = '';
    if (['OBJ', 'FBX', 'GLTF', 'GLB'].includes(state.format)) {
      summary = `${state.settings.textureResolution} Textures, ${state.settings.meshDetail} Detail`;
    } else {
      summary = `${state.settings.pointDensity} Density, ${state.settings.includeRGB ? 'RGB' : 'No RGB'}`;
    }

    const newRecord: ExportRecord = {
      id: `exp-${Date.now()}`,
      format: state.format,
      date: new Date().toISOString().split('T')[0],
      size: estimatedSize,
      status: 'Completed',
      settingsSummary: summary
    };

    set({ 
      status: 'success', 
      progress: 100,
      currentStep: 'Export complete',
      history: [newRecord, ...state.history]
    });
  },

  cancelExport: () => set({ 
    status: 'idle', 
    progress: 0, 
    currentStep: '' 
  }),

  resetExport: () => set({ 
    status: 'idle', 
    progress: 0, 
    currentStep: '' 
  })
}));
