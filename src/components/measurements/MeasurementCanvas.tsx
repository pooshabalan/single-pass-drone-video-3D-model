import { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Line, Edges } from '@react-three/drei';
import * as THREE from 'three';
import { ZoomIn, ZoomOut, Maximize, ArrowUpSquare, ArrowRightSquare, ArrowDownSquare } from 'lucide-react';
import type { MeasurementRecord, UnitSystem } from '../../data/mockMeasurements';
import { formatMeasurement } from '../../utils/measurementUtils';
import { IconButton } from '../common/Button';

interface MeasurementCanvasProps {
  measurements: MeasurementRecord[];
  selectedId: string | null;
  unitSystem: UnitSystem;
  onSelect: (id: string) => void;
}

// Reusable label component
const MeasurementLabel = ({ position, text, isSelected, onClick }: { position: [number, number, number], text: string, isSelected: boolean, onClick: () => void }) => (
  <Html position={position} center className="pointer-events-none z-10">
    <div 
      className={`px-2.5 py-1.5 rounded border shadow-sm text-[12px] font-medium whitespace-nowrap pointer-events-auto cursor-pointer transition-colors ${
        isSelected ? 'bg-card border-accent text-accent' : 'bg-card/95 border-border text-primary hover:bg-secondary'
      }`}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
      {text}
    </div>
  </Html>
);

const DistanceVisual = ({ record, isSelected, unitSystem, onSelect }: { record: MeasurementRecord, isSelected: boolean, unitSystem: UnitSystem, onSelect: () => void }) => {
  const p1 = new THREE.Vector3(...record.points[0]);
  const p2 = new THREE.Vector3(...record.points[1]);
  const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
  
  // Deterministic offset to prevent label collision
  if (record.id === '4') {
    midPoint.x -= 3;
    midPoint.z += 2;
  }
  
  return (
    <group onClick={(e) => { e.stopPropagation(); onSelect(); }}>
      <Line points={[p1, p2]} color={isSelected ? "#087F78" : "#3b82f6"} lineWidth={isSelected ? 4 : 2} />
      <mesh position={p1}>
        <sphereGeometry args={[isSelected ? 0.6 : 0.4, 16, 16]} />
        <meshBasicMaterial color={isSelected ? "#087F78" : "#3b82f6"} />
      </mesh>
      <mesh position={p2}>
        <sphereGeometry args={[isSelected ? 0.6 : 0.4, 16, 16]} />
        <meshBasicMaterial color={isSelected ? "#087F78" : "#3b82f6"} />
      </mesh>
      {(isSelected || true) && (
        <MeasurementLabel position={[midPoint.x, midPoint.y + 1, midPoint.z]} text={formatMeasurement(record, unitSystem)} isSelected={isSelected} onClick={onSelect} />
      )}
    </group>
  );
};

const AreaVisual = ({ record, isSelected, unitSystem, onSelect }: { record: MeasurementRecord, isSelected: boolean, unitSystem: UnitSystem, onSelect: () => void }) => {
  const shape = new THREE.Shape();
  if (record.points.length > 0) {
    shape.moveTo(record.points[0][0], record.points[0][2]);
    for (let i = 1; i < record.points.length; i++) {
      shape.lineTo(record.points[i][0], record.points[i][2]);
    }
    shape.lineTo(record.points[0][0], record.points[0][2]);
  }

  // Calculate center roughly for label
  const center = record.points.reduce((acc, p) => [acc[0] + p[0], acc[1] + p[1], acc[2] + p[2]], [0, 0, 0]);
  const midPoint: [number, number, number] = [center[0] / record.points.length, center[1] / record.points.length, center[2] / record.points.length];

  if (record.id === '2') {
    midPoint[2] += 4;
  }
  if (record.id === '5') {
    midPoint[0] += 3;
    midPoint[2] -= 3;
  }

  return (
    <group onClick={(e) => { e.stopPropagation(); onSelect(); }}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, record.points[0][1], 0]}>
        <shapeGeometry args={[shape]} />
        <meshBasicMaterial color={isSelected ? "#087F78" : "#22c55e"} transparent opacity={isSelected ? 0.4 : 0.2} side={THREE.DoubleSide} />
        <Edges color={isSelected ? "#087F78" : "#22c55e"} threshold={15} />
      </mesh>
      
      {record.points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshBasicMaterial color={isSelected ? "#087F78" : "#22c55e"} />
        </mesh>
      ))}
      <MeasurementLabel position={[midPoint[0], midPoint[1] + 3, midPoint[2]]} text={formatMeasurement(record, unitSystem)} isSelected={isSelected} onClick={onSelect} />
    </group>
  );
};

const VolumeVisual = ({ record, isSelected, unitSystem, onSelect }: { record: MeasurementRecord, isSelected: boolean, unitSystem: UnitSystem, onSelect: () => void }) => {
  const shape = new THREE.Shape();
  if (record.points.length > 0) {
    shape.moveTo(record.points[0][0], record.points[0][2]);
    for (let i = 1; i < record.points.length; i++) {
      shape.lineTo(record.points[i][0], record.points[i][2]);
    }
    shape.lineTo(record.points[0][0], record.points[0][2]);
  }
  
  const extrudeSettings = {
    depth: record.height || 10,
    bevelEnabled: false
  };

  const center = record.points.reduce((acc, p) => [acc[0] + p[0], acc[1] + p[1], acc[2] + p[2]], [0, 0, 0]);
  const midPoint: [number, number, number] = [center[0] / record.points.length, (record.height || 10) + 6, center[2] / record.points.length];

  if (record.id === '6') {
    midPoint[0] -= 2;
    midPoint[2] -= 4;
  }

  return (
    <group onClick={(e) => { e.stopPropagation(); onSelect(); }}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, record.points[0][1], 0]}>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshStandardMaterial color={isSelected ? "#087F78" : "#a855f7"} transparent opacity={isSelected ? 0.5 : 0.25} />
        <Edges color={isSelected ? "#087F78" : "#a855f7"} threshold={15} />
      </mesh>
      <MeasurementLabel position={midPoint} text={formatMeasurement(record, unitSystem)} isSelected={isSelected} onClick={onSelect} />
    </group>
  );
};

const SceneContent = ({ measurements, selectedId, unitSystem, onSelect }: MeasurementCanvasProps) => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    // Expose controls to parent for UI buttons
    (window as any).__measurementControls = controlsRef.current;
    (window as any).__measurementCamera = camera;
  }, [camera]);

  return (
    <>
      <OrbitControls ref={controlsRef} makeDefault minDistance={10} maxDistance={200} maxPolarAngle={Math.PI / 2 - 0.05} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[50, 100, 50]} intensity={0.8} />
      
      {/* Base Grid */}
      <gridHelper args={[200, 40, '#DCE2E7', '#F1F4F6']} position={[0, -0.1, 0]} />
      
      {/* Render Measurements */}
      {measurements.map(m => {
        const isSelected = selectedId === m.id;
        // If an active tool is selected but it's not 'select', and this is NOT the selected item, 
        // we could dim it, but for demo, let's just show them.
        switch (m.type) {
          case 'distance': return <DistanceVisual key={m.id} record={m} isSelected={isSelected} unitSystem={unitSystem} onSelect={() => onSelect(m.id)} />;
          case 'area': return <AreaVisual key={m.id} record={m} isSelected={isSelected} unitSystem={unitSystem} onSelect={() => onSelect(m.id)} />;
          case 'volume': return <VolumeVisual key={m.id} record={m} isSelected={isSelected} unitSystem={unitSystem} onSelect={() => onSelect(m.id)} />;
          default: return null;
        }
      })}
    </>
  );
};

export default function MeasurementCanvas(props: MeasurementCanvasProps) {
  const handleZoom = (factor: number) => {
    const camera = (window as any).__measurementCamera as THREE.PerspectiveCamera;
    if (camera) {
      camera.position.multiplyScalar(factor);
      camera.updateProjectionMatrix();
    }
  };

  const handleReset = () => {
    const controls = (window as any).__measurementControls;
    const camera = (window as any).__measurementCamera as THREE.PerspectiveCamera;
    if (camera && controls) {
      camera.position.set(0, 60, 80);
      controls.target.set(0, 0, 0);
      controls.update();
    }
  };

  const setView = (x: number, y: number, z: number) => {
    const controls = (window as any).__measurementControls;
    const camera = (window as any).__measurementCamera as THREE.PerspectiveCamera;
    if (camera && controls) {
      camera.position.set(x, y, z);
      controls.target.set(0, 0, 0);
      controls.update();
    }
  };

  return (
    <div className="relative w-full h-full bg-secondary/10 flex flex-col items-center justify-center overflow-hidden rounded-lg">
      <Canvas camera={{ position: [0, 60, 80], fov: 45 }}>
        <SceneContent {...props} />
      </Canvas>
      
      {/* Legend & Status */}
      <div className="absolute top-4 left-4 pointer-events-none">
        <div className="bg-card/90 backdrop-blur-sm border border-border px-3 py-2 rounded-md shadow-sm mb-2">
          <span className="text-[11px] font-bold text-secondary-text uppercase tracking-wider block mb-1">Demo Reconstruction</span>
          <div className="space-y-1 text-[12px]">
            <div className="flex items-center space-x-2"><div className="w-3 h-0.5 bg-blue-500"></div><span className="text-primary">Distance</span></div>
            <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-green-500/40 border border-green-500"></div><span className="text-primary">Area</span></div>
            <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-purple-500/50 border border-purple-500 border-t-2"></div><span className="text-primary">Volume</span></div>
          </div>
        </div>
      </div>

      {/* Viewer Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 pointer-events-auto">
        <div className="flex flex-col bg-card border border-border rounded-lg shadow-sm overflow-hidden backdrop-blur-sm">
          <IconButton icon={<ZoomIn className="w-4 h-4" />} title="Zoom In" aria-label="Zoom In" variant="ghost" className="w-10 h-10 rounded-none border-b border-border" onClick={() => handleZoom(0.8)} />
          <IconButton icon={<ZoomOut className="w-4 h-4" />} title="Zoom Out" aria-label="Zoom Out" variant="ghost" className="w-10 h-10 rounded-none border-b border-border" onClick={() => handleZoom(1.25)} />
          <IconButton icon={<Maximize className="w-4 h-4" />} title="Reset View" aria-label="Reset View" variant="ghost" className="w-10 h-10 rounded-none" onClick={handleReset} />
        </div>
        <div className="flex flex-col bg-card border border-border rounded-lg shadow-sm overflow-hidden backdrop-blur-sm">
          <IconButton icon={<ArrowDownSquare className="w-4 h-4" />} title="Top View" aria-label="Top View" variant="ghost" className="w-10 h-10 rounded-none border-b border-border" onClick={() => setView(0, 100, 0)} />
          <IconButton icon={<ArrowUpSquare className="w-4 h-4" />} title="Front View" aria-label="Front View" variant="ghost" className="w-10 h-10 rounded-none border-b border-border" onClick={() => setView(0, 10, 100)} />
          <IconButton icon={<ArrowRightSquare className="w-4 h-4" />} title="Side View" aria-label="Side View" variant="ghost" className="w-10 h-10 rounded-none" onClick={() => setView(100, 10, 0)} />
        </div>
      </div>
    </div>
  );
}
