export type MeasurementType = 'distance' | 'area' | 'volume';
export type UnitSystem = 'metric' | 'imperial';

export interface MeasurementRecord {
  id: string;
  name: string;
  type: MeasurementType;
  value: number; // Base metric value
  displayValue: string; // Demo value
  date: string;
  points: [number, number, number][]; // [x, y, z] tuples
  height?: number; // Used for volumes to extrude from base points
}

export const mockMeasurements: MeasurementRecord[] = [
  {
    id: '1',
    name: 'Building A — Main Span',
    type: 'distance',
    value: 24.6,
    displayValue: '24.6 m',
    date: '2026-09-08',
    points: [
      [-15, 0.5, 10],
      [9.6, 0.5, 10]
    ]
  },
  {
    id: '2',
    name: 'Survey Zone A',
    type: 'area',
    value: 1248,
    displayValue: '1,248 m²',
    date: '2026-09-08',
    points: [
      [-20, 0.1, -15],
      [10, 0.1, -15],
      [15, 0.1, 20],
      [-25, 0.1, 25]
    ]
  },
  {
    id: '3',
    name: 'Terrain Cut / Fill Zone',
    type: 'volume',
    value: 4820,
    displayValue: '4,820 m³',
    date: '2026-09-07',
    points: [
      [20, 0.1, -20],
      [40, 0.1, -20],
      [40, 0.1, 0],
      [20, 0.1, 0]
    ],
    height: 12.05
  },
  {
    id: '4',
    name: 'Perimeter Fence',
    type: 'distance',
    value: 142.5,
    displayValue: '142.5 m',
    date: '2026-09-06',
    points: [
      [-30, 0, -30],
      [-30, 0, 40]
    ]
  },
  {
    id: '5',
    name: 'Building East Footprint',
    type: 'area',
    value: 845.2,
    displayValue: '845.2 m²',
    date: '2026-09-06',
    points: [
      [5, 0.2, 5],
      [25, 0.2, 5],
      [25, 0.2, 25],
      [5, 0.2, 25]
    ]
  },
  {
    id: '6',
    name: 'Excavation Site Beta',
    type: 'volume',
    value: 1240.8,
    displayValue: '1,240.8 m³',
    date: '2026-09-05',
    points: [
      [-35, -5, -5],
      [-20, -5, -5],
      [-20, -5, 10],
      [-35, -5, 10]
    ],
    height: 5.5
  }
];
