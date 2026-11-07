export type ExportFormat = 'OBJ' | 'PLY' | 'LAS' | 'GLTF' | 'GLB' | 'FBX';

export interface ExportRecord {
  id: string;
  format: ExportFormat;
  date: string;
  size: string;
  status: 'Completed' | 'Failed';
  settingsSummary: string;
}

export const mockExportHistory: ExportRecord[] = [
  {
    id: 'exp-001',
    format: 'GLB',
    date: '2026-09-09',
    size: '286 MB',
    status: 'Completed',
    settingsSummary: '4K Textures, Medium Detail'
  },
  {
    id: 'exp-002',
    format: 'LAS',
    date: '2026-09-08',
    size: '1.2 GB',
    status: 'Completed',
    settingsSummary: 'High Density, RGB, Classification'
  },
  {
    id: 'exp-003',
    format: 'OBJ',
    date: '2026-09-07',
    size: '845 MB',
    status: 'Completed',
    settingsSummary: '8K Textures, High Detail, Materials'
  }
];
