import React, { useRef } from 'react'; // Added useRef
import { Canvas, useFrame } from '@react-three/fiber'; // Added useFrame
import { OrbitControls } from '@react-three/drei';
import Globe from './components/Globe';
import Markers from './components/Markers';
import useSunPosition from './hooks/useSunPosition'; // Import the hook
import './App.css';
import * as THREE from 'three'; // Import THREE

const SceneLighting: React.FC = () => {
  const directionalLightRef = useRef<THREE.DirectionalLight>(null!);

  // Example: Get sun position for a fixed location (e.g., London) for now
  // In a real app, this might be dynamic or user-set
  const sunPosition = useSunPosition(new Date(), 51.5074, 0.1278, 10);

  useFrame(() => {
    if (directionalLightRef.current) {
      // Update light position continuously for real-time effect if date changes dynamically
      // For now, it's set once based on initial date from useSunPosition
      // To make it truly dynamic with time, useSunPosition would need to be called in useFrame
      // or App would need to re-render. For simplicity, we set it based on current time on load.
    }
  });

  // Set initial light position
  // The position is now directly passed to the directionalLight component below.
  // The ref can still be used for dynamic updates if needed.

  // useFrame(() => {
  //   // Example: if you wanted to animate the sun based on time passing
  //   const newSunPos = useSunPosition(new Date(), 51.5074, 0.1278, 10);
  //   if (directionalLightRef.current) {
  //     directionalLightRef.current.position.copy(newSunPos);
  //   }
  // });

  return (
    <>
      <ambientLight intensity={0.3} /> {/* Reduced ambient for better day/night contrast */}
      <directionalLight
        ref={directionalLightRef}
        position={sunPosition} // Set position directly from the hook
        intensity={1.5} // Slightly increased intensity
        castShadow
        shadow-mapSize-width={1024} // Optional: improve shadow quality
        shadow-mapSize-height={1024}
      />
    </>
  );
};

const App: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#050510' }}> {/* Darker background */}
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }} shadows> {/* Enabled shadows on Canvas */}
        <SceneLighting />
        <React.Suspense fallback={null}>
          <Globe />
          <Markers />
        </React.Suspense>
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={3.5}
          maxDistance={15}
        />
      </Canvas>
    </div>
  );
};

export default App;
