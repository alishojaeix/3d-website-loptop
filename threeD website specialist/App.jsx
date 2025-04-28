import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, ScrollControls } from '@react-three/drei';
import { useIntersectionObserver } from 'react-intersection-observer';
import gsap from 'gsap';

function LaptopModel() {
  const group = useRef();
  const { nodes, materials } = useGLTF('/laptop.glb');

  useFrame(({ clock }) => {
    group.current.rotation.y = clock.getElapsedTime() * 0.5;
  });

  return (
    <group ref={group} dispose={null}>
      <mesh geometry={nodes.laptop.geometry} material={materials.aluminum} />
    </group>
  );
}

function ScrollAnimation() {
  const laptopRef = useRef();
  const infoSection = useRef();

  useIntersectionObserver(
    laptopRef,
    ([entry]) => {
      gsap.to(laptopRef.current.rotation, {
        y: entry.isIntersecting ? Math.PI * 2 : 0,
        duration: 2
      });
    }
  );

  return (
    <>
      <div ref={laptopRef} style={{ height: '100vh' }}>
        <Canvas>
          <ScrollControls pages={3}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <LaptopModel />
            <OrbitControls enableZoom={false} />
          </ScrollControls>
        </Canvas>
      </div>

      <section ref={infoSection} className="info-section">
        <h2>آموزش ساخت سایت سه‌بعدی</h2>
        <p>این پروژه با Three.js و React ساخته شده است...</p>
      </section>
    </>
  );
}

export default function App() {
  return (
    <div className="app">
      <ScrollAnimation />
    </div>
  );
}