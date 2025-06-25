import React, { useMemo } from 'react';
import * as THREE from 'three';
import { InstancedMeshProps, useFrame } from '@react-three/fiber';

interface MarkerData {
  id: string;
  lat: number;
  lon: number;
  name: string;
}

// Helper function to convert lat/lon to Cartesian coordinates
const latLonToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
};

// Sample surf spots data
const sampleSurfSpots: MarkerData[] = [
  { id: 'spot1', lat: 34.0522, lon: -118.2437, name: 'Los Angeles' }, // Example
  { id: 'spot2', lat: -33.8688, lon: 151.2093, name: 'Sydney' },      // Example
  { id: 'spot3', lat: 40.7128, lon: -74.0060, name: 'New York' },    // Example
  { id: 'spot4', lat: 6.9271, lon: 79.8612, name: 'Colombo' },       // Sri Lanka
  { id: 'spot5', lat: -8.3405, lon: 115.0914, name: 'Bali' },          // Indonesia
];

const MARKER_RADIUS = 0.05; // Size of the marker
const GLOBE_RADIUS = 2.5;   // Must match globe's scale/radius in Globe.tsx

const Markers: React.FC = () => {
  const instancedMeshRef = React.useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useMemo(() => {
    if (instancedMeshRef.current) {
      sampleSurfSpots.forEach((spot, i) => {
        const position = latLonToVector3(spot.lat, spot.lon, GLOBE_RADIUS);
        dummy.position.copy(position);
        // Point the marker outwards from the center of the globe
        dummy.lookAt(0,0,0);
        dummy.rotation.x += Math.PI / 2; // Adjust if markers are not oriented correctly
        dummy.updateMatrix();
        instancedMeshRef.current!.setMatrixAt(i, dummy.matrix);
      });
      instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [dummy]); // Re-run if dummy changes (shouldn't but good practice)

  // Optional: Hover effect or other interactions can be added later
  // useFrame(() => {
  //   // ...
  // });

  return (
    <instancedMesh
      ref={instancedMeshRef}
      args={[undefined, undefined, sampleSurfSpots.length]}
      castShadow
      receiveShadow
    >
      <sphereGeometry args={[MARKER_RADIUS, 16, 16]} />
      <meshStandardMaterial color="red" emissive="darkred" roughness={0.5} />
    </instancedMesh>
  );
};

export default Markers;
