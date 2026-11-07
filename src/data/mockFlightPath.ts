export interface Waypoint {
  id: number;
  x: number;
  y: number;
}

export interface MockFlightData {
  project: string;
  location: {
    lat: number;
    lng: number;
    alt: number;
    ref: string;
  };
  flight: {
    distance: number; // km
    duration: string;
    waypoints: number;
    coverage: number; // ha
  };
  path: Waypoint[];
  takeoff: { x: number, y: number };
  landing: { x: number, y: number };
  surveyBoundary: { x: number, y: number }[];
  projectLocation: { x: number, y: number };
}

// Coordinate space: 0 to 1000 for x and y
export const mockFlightData: MockFlightData = {
  project: "Campus Survey — Site Alpha",
  location: {
    lat: 12.9716,
    lng: 77.5946,
    alt: 120,
    ref: "Demo / Local"
  },
  flight: {
    distance: 2.8,
    duration: "02:14",
    waypoints: 18,
    coverage: 14.6
  },
  takeoff: { x: 100, y: 800 },
  landing: { x: 150, y: 850 },
  projectLocation: { x: 50, y: 900 },
  
  // A lawn-mower pattern covering a roughly rectangular area
  path: [
    { id: 1, x: 200, y: 800 }, // Start of pass 1
    { id: 2, x: 800, y: 800 }, // End of pass 1
    { id: 3, x: 800, y: 700 }, // Turn
    { id: 4, x: 200, y: 700 }, // End of pass 2
    { id: 5, x: 200, y: 600 }, // Turn
    { id: 6, x: 800, y: 600 }, // End of pass 3
    { id: 7, x: 800, y: 500 }, // Turn
    { id: 8, x: 200, y: 500 }, // End of pass 4
    { id: 9, x: 200, y: 400 }, // Turn
    { id: 10, x: 800, y: 400 }, // End of pass 5
    { id: 11, x: 800, y: 300 }, // Turn
    { id: 12, x: 200, y: 300 }, // End of pass 6
    { id: 13, x: 200, y: 200 }, // Turn
    { id: 14, x: 800, y: 200 }, // End of pass 7
    { id: 15, x: 800, y: 100 }, // Turn
    { id: 16, x: 200, y: 100 }, // End of pass 8
    { id: 17, x: 200, y: 50 },  // Final turn to prepare for landing
    { id: 18, x: 150, y: 50 }   // Final waypoint before landing sequence
  ],
  
  surveyBoundary: [
    { x: 150, y: 850 },
    { x: 850, y: 850 },
    { x: 850, y: 50 },
    { x: 150, y: 50 }
  ]
};
