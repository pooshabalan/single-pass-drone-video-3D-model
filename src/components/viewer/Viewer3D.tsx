import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Edges } from '@react-three/drei';
import * as THREE from 'three';
import type { LayerDefaults, PointCloudDefaults } from '../../data/mockModel';

interface Viewer3DProps {
  layers: LayerDefaults;
  pointCloudSettings: PointCloudDefaults;
  meshMode: 'Solid' | 'Wireframe' | 'Solid + Wireframe';
  cameraView: 'Orbit' | 'Pan' | 'Top' | 'Front' | 'Side' | 'Reset' | null;
  onCameraViewComplete: () => void;
}

// Procedural logic shared for meshes and point clouds
const getTerrainHeight = (x: number, z: number) => {
  return Math.sin(x * 0.1) * Math.cos(z * 0.1) * 2 + Math.sin(x * 0.05 + z * 0.05) * 3;
};

const buildingsData = [
  { id: 1, x: 10, z: 10, w: 8, d: 12, h: 5, color: '#A0AAB5', type: 'flat' },
  { id: 2, x: -20, z: 15, w: 10, d: 10, h: 8, color: '#8F9AA6', type: 'gabled' },
  { id: 3, x: 5, z: -15, w: 6, d: 6, h: 3, color: '#B0BAC5', type: 'flat' },
  { id: 4, x: -25, z: -10, w: 12, d: 8, h: 4, color: '#9AA4AF', type: 'flat' },
  { id: 5, x: 20, z: -5, w: 15, d: 10, h: 12, color: '#A0AAB5', type: 'tiered' }
];

const getBuildingAt = (x: number, z: number) => {
  for (const b of buildingsData) {
    if (Math.abs(x - b.x) < b.w / 2 && Math.abs(z - b.z) < b.d / 2) {
      return b;
    }
  }
  return null;
};

// --- Components ---

const Terrain = ({ visible, meshMode }: { visible: boolean; meshMode: string }) => {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(100, 100, 64, 64);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const zHeight = getTerrainHeight(x, -y); // rotation puts -y to z
      pos.setZ(i, zHeight);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  if (!visible) return null;
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial 
        color="#8B7355" 
        wireframe={meshMode === 'Wireframe'} 
        flatShading 
      />
      {meshMode === 'Solid + Wireframe' && <Edges color="#ffffff" threshold={15} opacity={0.2} transparent />}
    </mesh>
  );
};

const SimpleRoads = ({ visible }: { visible: boolean }) => {
  if (!visible) return null;
  
  // Create roads out of many small segments to follow terrain
  const segments = [];
  for (let x = -50; x <= 50; x += 2) {
    const h = getTerrainHeight(x, 0);
    segments.push(
      <mesh key={`rx_${x}`} position={[x, h + 0.1, 0]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.1, 6]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
    );
  }
  for (let z = -50; z <= 50; z += 2) {
    if (Math.abs(z) < 3) continue; // skip intersection duplicate
    const h = getTerrainHeight(-15, z);
    segments.push(
      <mesh key={`rz_${z}`} position={[-15, h + 0.1, z]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
        <planeGeometry args={[6, 2.1]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
    );
  }

  return <group>{segments}</group>;
};

const Buildings = ({ visible, meshMode }: { visible: boolean; meshMode: string }) => {
  if (!visible) return null;
  return (
    <group>
      {buildingsData.map((b) => {
        const h0 = getTerrainHeight(b.x, b.z);
        return (
          <group key={b.id} position={[b.x, h0, b.z]}>
            {b.type === 'tiered' ? (
              <>
                <mesh position={[0, b.h * 0.3, 0]} castShadow receiveShadow>
                  <boxGeometry args={[b.w, b.h * 0.6, b.d]} />
                  <meshStandardMaterial color={b.color} wireframe={meshMode === 'Wireframe'} />
                  {meshMode === 'Solid + Wireframe' && <Edges color="#17212B" opacity={0.4} transparent />}
                </mesh>
                <mesh position={[0, b.h * 0.8, 0]} castShadow receiveShadow>
                  <boxGeometry args={[b.w * 0.6, b.h * 0.4, b.d * 0.6]} />
                  <meshStandardMaterial color={b.color} wireframe={meshMode === 'Wireframe'} />
                  {meshMode === 'Solid + Wireframe' && <Edges color="#17212B" opacity={0.4} transparent />}
                </mesh>
              </>
            ) : b.type === 'gabled' ? (
              <>
                <mesh position={[0, b.h * 0.5, 0]} castShadow receiveShadow>
                  <boxGeometry args={[b.w, b.h, b.d]} />
                  <meshStandardMaterial color={b.color} wireframe={meshMode === 'Wireframe'} />
                  {meshMode === 'Solid + Wireframe' && <Edges color="#17212B" opacity={0.4} transparent />}
                </mesh>
                <mesh position={[0, b.h + 1, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
                  <coneGeometry args={[Math.max(b.w, b.d)*0.7, 2, 4]} />
                  <meshStandardMaterial color={b.color} wireframe={meshMode === 'Wireframe'} />
                  {meshMode === 'Solid + Wireframe' && <Edges color="#17212B" opacity={0.4} transparent />}
                </mesh>
              </>
            ) : (
              <mesh position={[0, b.h / 2, 0]} castShadow receiveShadow>
                <boxGeometry args={[b.w, b.h, b.d]} />
                <meshStandardMaterial color={b.color} wireframe={meshMode === 'Wireframe'} />
                {meshMode === 'Solid + Wireframe' && <Edges color="#17212B" opacity={0.4} transparent />}
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
};

const Vegetation = ({ visible }: { visible: boolean }) => {
  const trees = useMemo(() => {
    const arr = [];
    for(let i = 0; i < 80; i++) {
      const x = (Math.random() - 0.5) * 90;
      const z = (Math.random() - 0.5) * 90;
      // keep away from roads
      if (Math.abs(z) < 4 || Math.abs(x + 15) < 4) continue;
      // keep away from buildings
      if (getBuildingAt(x, z)) continue;
      
      const y = getTerrainHeight(x, z);
      const scale = 0.5 + Math.random() * 0.8;
      arr.push({ x, y, z, scale });
    }
    return arr;
  }, []);

  if (!visible) return null;
  return (
    <group>
      {trees.map((t, i) => (
        <group key={i} position={[t.x, t.y, t.z]} scale={t.scale}>
          <mesh position={[0, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.2, 1]} />
            <meshStandardMaterial color="#4A3B2C" />
          </mesh>
          <mesh position={[0, 1.8, 0]} castShadow>
            <sphereGeometry args={[1.2, 5, 5]} />
            <meshStandardMaterial color="#2E5A27" flatShading />
          </mesh>
        </group>
      ))}
    </group>
  );
};

const PointCloud = ({ settings }: { settings: PointCloudDefaults }) => {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const count = settings.density === 'Low' ? 10000 : settings.density === 'Medium' ? 30000 : 80000;
    
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    let color = new THREE.Color();
    for(let i=0; i<count; i++) {
      const x = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      let y = getTerrainHeight(x, z);
      let isBuilding = false;
      let isVeg = false;

      const b = getBuildingAt(x, z);
      if (b) {
        isBuilding = true;
        // place on roof or walls
        if (Math.random() > 0.3) {
          y += b.h; // roof
          if (b.type === 'gabled') y += Math.random() * 2;
        } else {
          y += Math.random() * b.h; // wall
        }
      } else {
        // check vegetation proximity roughly
        if (Math.random() > 0.9) {
           isVeg = true;
           y += Math.random() * 3;
        } else {
           y += (Math.random() - 0.5) * 0.2; // ground noise
        }
      }

      positions[i*3] = x;
      positions[i*3+1] = y;
      positions[i*3+2] = z;
      
      if (settings.colorMode === 'Height') {
        const h = Math.max(0, Math.min(y / 15, 1));
        color.setHSL(0.6 - (h * 0.6), 1, 0.5); 
      } else if (settings.colorMode === 'Classification') {
        if (isBuilding) color.setHex(0xA0AAB5);
        else if (isVeg) color.setHex(0x2E5A27);
        else {
          if (Math.abs(z) < 3 || Math.abs(x + 15) < 3) color.setHex(0x444444); // road
          else color.setHex(0x8B7355); // terrain
        }
      } else {
        // Natural
        if (isBuilding) color.setRGB(0.6, 0.62, 0.65);
        else if (isVeg) color.setRGB(0.18, 0.35, 0.15);
        else {
          if (Math.abs(z) < 3 || Math.abs(x + 15) < 3) color.setRGB(0.3, 0.3, 0.3); // road
          else color.setRGB(0.45, 0.38, 0.28); // terrain
        }
        // apply shading
        const shade = 0.8 + Math.random() * 0.4;
        color.multiplyScalar(shade);
      }
      
      colors[i*3] = color.r;
      colors[i*3+1] = color.g;
      colors[i*3+2] = color.b;
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [settings.density, settings.colorMode]);

  if (!settings.visible) return null;
  return (
    <points>
      <primitive object={geometry} attach="geometry" />
      <pointsMaterial 
        size={settings.size / 15} 
        vertexColors 
        sizeAttenuation 
        transparent 
        opacity={0.9}
      />
    </points>
  );
};

const CameraController = ({ view, onComplete }: { view: string | null, onComplete: () => void }) => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (!view || !controlsRef.current) return;
    
    if (view === 'Top') {
      camera.position.set(0, 80, 0);
      controlsRef.current.target.set(0, 0, 0);
    } else if (view === 'Front') {
      camera.position.set(0, 20, 60);
      controlsRef.current.target.set(0, 0, 0);
    } else if (view === 'Side') {
      camera.position.set(60, 20, 0);
      controlsRef.current.target.set(0, 0, 0);
    } else if (view === 'Reset' || view === 'Orbit') {
      // Better framing to comfortably show the complete area
      camera.position.set(45, 35, 50);
      controlsRef.current.target.set(0, 0, 0);
    }

    controlsRef.current.update();
    onComplete();
  }, [view, camera, onComplete]);

  const mouseButtons = view === 'Pan' 
    ? { LEFT: THREE.MOUSE.PAN, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN }
    : { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };

  return (
    <OrbitControls 
      ref={controlsRef} 
      mouseButtons={mouseButtons} 
      makeDefault 
      dampingFactor={0.1} 
      maxPolarAngle={Math.PI / 2 - 0.05} // don't go below ground
      minDistance={5}
      maxDistance={150}
    />
  );
};

export default function Viewer3D({ 
  layers, 
  pointCloudSettings, 
  meshMode,
  cameraView,
  onCameraViewComplete
}: Viewer3DProps) {
  
  return (
    <Canvas 
      shadows 
      camera={{ position: [45, 35, 50], fov: 45 }}
      style={{ background: '#0A1016' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[30, 50, 20]} 
        intensity={1.2} 
        castShadow 
        shadow-mapSize-width={2048} 
        shadow-mapSize-height={2048}
        shadow-camera-far={150}
        shadow-camera-left={-60}
        shadow-camera-right={60}
        shadow-camera-top={60}
        shadow-camera-bottom={-60}
        shadow-bias={-0.0005}
      />
      
      <Terrain visible={layers.terrain} meshMode={meshMode} />
      <SimpleRoads visible={layers.roads} />
      <Buildings visible={layers.buildings} meshMode={meshMode} />
      <Vegetation visible={layers.vegetation} />
      
      <PointCloud settings={pointCloudSettings} />
      
      <CameraController view={cameraView} onComplete={onCameraViewComplete} />
    </Canvas>
  );
}
