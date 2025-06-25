import React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Globe: React.FC = () => {
  const meshRef = React.useRef<THREE.Mesh>(null!);

  // Optional: Add a slight rotation for visual effect
  useFrame(() => {
    if (meshRef.current) {
      // meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={meshRef} scale={2.5} receiveShadow castShadow> {/* Added receiveShadow and castShadow */}
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial color="royalblue" roughness={0.7} metalness={0.2} /> {/* Adjusted material slightly */}
    </mesh>
  );
};

export default Globe;
