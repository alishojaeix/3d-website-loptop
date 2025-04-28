import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/laptop.glb');
  return <primitive object={scene} />;
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 5 }}
        gl={{ antialias: true }}
      >
        {/* نورپردازی */}
        <ambientLight intensity={0.8} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />
        
        {/* محیط پس‌زمینه */}
        <Environment preset="city" />
        
        {/* مدل 3D */}
        <Model />
        
        {/* کنترل‌های دوربین */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          minDistance={3}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
}