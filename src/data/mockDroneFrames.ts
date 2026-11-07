export interface DroneFrame {
  id: string;
  waypointId: number;
  frameNumber: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  altitude: number;
  imagePath: string; // Local SVG data URI for now
  imageWidth: number;
  imageHeight: number;
  quality: string;
}

// Generates a mock "drone shot" SVG base64 placeholder
const generateMockImage = (waypointId: number) => {
  const svg = `
    <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#E2E8F0"/>
      <path d="M0,150 Q100,50 200,150 T400,150 L400,300 L0,300 Z" fill="#CBD5E1"/>
      <rect x="50" y="200" width="40" height="30" fill="#94A3B8"/>
      <rect x="150" y="180" width="60" height="40" fill="#94A3B8"/>
      <rect x="280" y="220" width="50" height="35" fill="#94A3B8"/>
      <text x="200" y="140" font-family="monospace" font-size="24" font-weight="bold" fill="#475569" text-anchor="middle">
        WP-${waypointId.toString().padStart(2, '0')} Frame
      </text>
      <text x="200" y="160" font-family="sans-serif" font-size="12" fill="#64748B" text-anchor="middle">
        Mock Drone Imagery
      </text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

export const mockDroneFrames: DroneFrame[] = Array.from({ length: 18 }, (_, i) => {
  const waypointId = i + 1;
  // Make up some simulated coordinates slightly varying around the base project location
  const lat = 12.9716 + (Math.random() * 0.002 - 0.001);
  const lng = 77.5946 + (Math.random() * 0.002 - 0.001);
  const alt = 120 + (Math.random() * 4 - 2);

  return {
    id: `frame_${waypointId.toString().padStart(5, '0')}`,
    waypointId,
    frameNumber: (waypointId * 15 + Math.floor(Math.random() * 5)).toString().padStart(5, '0'),
    timestamp: `00:${(i * 4).toString().padStart(2, '0')}`,
    latitude: lat,
    longitude: lng,
    altitude: alt,
    imagePath: generateMockImage(waypointId),
    imageWidth: 3840,
    imageHeight: 2160,
    quality: "High"
  };
});
