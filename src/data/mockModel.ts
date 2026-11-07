export interface ModelInfo {
  type: string;
  vertices: string;
  faces: string;
  pointCount: string;
  boundingSize: string;
  coordinateReference: string;
}

export interface QualityMetrics {
  quality: string;
  registration: string;
  density: string;
  reprojectionError: string;
}

export interface LayerDefaults {
  terrain: boolean;
  buildings: boolean;
  roads: boolean;
  vegetation: boolean;
  water: boolean;
  pointCloud: boolean;
  meshWireframe: boolean;
}

export interface PointCloudDefaults {
  visible: boolean;
  size: number;
  density: 'Low' | 'Medium' | 'High';
  colorMode: 'Natural' | 'Height' | 'Classification';
}

export const mockModelData = {
  info: {
    type: 'Textured Mesh',
    vertices: '1.1M',
    faces: '1.8M',
    pointCount: '8.7M',
    boundingSize: '286 × 241 × 42 m',
    coordinateReference: 'Demo / Local'
  } as ModelInfo,

  quality: {
    quality: 'Good',
    registration: '82%',
    density: 'High',
    reprojectionError: '0.68 px'
  } as QualityMetrics,

  layerDefaults: {
    terrain: true,
    buildings: true,
    roads: true,
    vegetation: true,
    water: false,
    pointCloud: true,
    meshWireframe: false
  } as LayerDefaults,

  pointCloudDefaults: {
    visible: true,
    size: 2,
    density: 'Medium',
    colorMode: 'Natural'
  } as PointCloudDefaults
};
