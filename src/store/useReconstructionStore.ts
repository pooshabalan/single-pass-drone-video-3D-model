import { create } from 'zustand';

export type StageStatus = 'Pending' | 'Initializing' | 'Processing' | 'Completed' | 'Paused' | 'Cancelled' | 'Error';
export type PipelineStatus = 'Ready' | 'Processing' | 'Paused' | 'Completed' | 'Cancelled' | 'Error';

export interface ReconstructionStage {
  id: number;
  name: string;
  status: StageStatus;
  progress: number;
  description: string;
}

export interface LogEntry {
  timestamp: string;
  message: string;
}

interface ReconstructionState {
  pipelineStatus: PipelineStatus;
  currentStageIndex: number;
  overallProgress: number;
  stages: ReconstructionStage[];
  logs: LogEntry[];
  
  // Actions
  setPipelineStatus: (status: PipelineStatus) => void;
  setCurrentStageIndex: (index: number) => void;
  setOverallProgress: (progress: number) => void;
  updateStage: (index: number, updates: Partial<ReconstructionStage>) => void;
  addLog: (message: string) => void;
  resetReconstruction: () => void;
  cancelReconstruction: () => void;
}

const initialStages: ReconstructionStage[] = [
  { id: 1, name: "Video Analysis", status: "Pending", progress: 0, description: "Extracting video metadata and frames" },
  { id: 2, name: "Frame Selection", status: "Pending", progress: 0, description: "Filtering optimal frames for reconstruction" },
  { id: 3, name: "Feature Extraction", status: "Pending", progress: 0, description: "Detecting visual features across frames" },
  { id: 4, name: "Feature Matching", status: "Pending", progress: 0, description: "Matching corresponding features" },
  { id: 5, name: "Camera Pose Estimation", status: "Pending", progress: 0, description: "Calculating 3D camera positions" },
  { id: 6, name: "Sparse Reconstruction", status: "Pending", progress: 0, description: "Generating initial sparse point cloud" },
  { id: 7, name: "Dense Reconstruction", status: "Pending", progress: 0, description: "Generating dense depth maps" },
  { id: 8, name: "Mesh Generation", status: "Pending", progress: 0, description: "Creating 3D surface mesh" },
  { id: 9, name: "Mesh Optimization", status: "Pending", progress: 0, description: "Refining mesh topology" },
  { id: 10, name: "Finalization", status: "Pending", progress: 0, description: "Applying textures and saving model" }
];

export const useReconstructionStore = create<ReconstructionState>((set) => ({
  pipelineStatus: 'Ready',
  currentStageIndex: 0,
  overallProgress: 0,
  stages: JSON.parse(JSON.stringify(initialStages)),
  logs: [],


  
  setPipelineStatus: (status) => set({ pipelineStatus: status }),
  
  setCurrentStageIndex: (index) => set({ currentStageIndex: index }),
  
  setOverallProgress: (progress) => set({ overallProgress: progress }),
  
  updateStage: (index, updates) => set((state) => {
    const newStages = [...state.stages];
    newStages[index] = { ...newStages[index], ...updates };
    return { stages: newStages };
  }),
  
  addLog: (message) => set((state) => {
    const now = new Date();
    // Use simulated time or real time? Let's use simple real local time for logs: [HH:MM:SS]
    const timestamp = `[${now.toTimeString().split(' ')[0]}]`;
    return { logs: [...state.logs, { timestamp, message }] };
  }),
  
  resetReconstruction: () => set(() => ({
    pipelineStatus: 'Ready',
    currentStageIndex: 0,
    overallProgress: 0,
    stages: JSON.parse(JSON.stringify(initialStages)),
    logs: [{ timestamp: `[${new Date().toTimeString().split(' ')[0]}]`, message: "Reconstruction simulation initialized." }],
  })),

  cancelReconstruction: () => set((state) => {
    const newStages = [...state.stages];
    // Mark current as cancelled if processing/paused
    if (state.pipelineStatus === 'Processing' || state.pipelineStatus === 'Paused') {
      newStages[state.currentStageIndex].status = 'Cancelled';
    }
    return {
      pipelineStatus: 'Cancelled',
      stages: newStages,
      logs: [...state.logs, { timestamp: `[${new Date().toTimeString().split(' ')[0]}]`, message: "Reconstruction simulation cancelled." }]
    };
  })
}));
