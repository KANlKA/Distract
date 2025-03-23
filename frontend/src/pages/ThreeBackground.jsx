import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { useStore } from '../lib/store';

function Particles() {
  const points = useRef();
  const { darkMode } = useStore();

  useFrame((state) => {
    points.current.rotation.y += 0.0005;
    points.current.rotation.x += 0.0005;
  });

  const particlesCount = 2000;
  const positions = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color={darkMode ? '#bb86fc' : '#00ffcc'} // Dynamic color based on theme
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

export default function ThreeBackground() {
  const { darkMode } = useStore();

  return (
    <div
      className="fixed inset-0 z-0 w-full h-full opacity-30"
      style={{
        background: darkMode
          ? 'radial-gradient(circle, #1a1a1a, #000000)' // Dark gradient
          : 'radial-gradient(circle, #f0f0f0, #ffffff)', // Light gradient
      }}
    >
      <Canvas camera={{ position: [0, 0, 8] }}>
        <fog attach="fog" args={[darkMode ? '#000000' : '#ffffff', 5, 20]} /> {/* Add fog for depth */}
        <Particles />
      </Canvas>
    </div>
  );
}