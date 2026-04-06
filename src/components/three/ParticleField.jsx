/**
 * ParticleField.jsx - 3D Animated Background using React Three Fiber.
 * Lightweight instanced points for premium performance.
 */
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Particles = ({ count = 3000, mouse }) => {
  const mesh = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 10 + Math.random() * 50;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -25 + Math.random() * 50;
      const yFactor = -25 + Math.random() * 50;
      const zFactor = -25 + Math.random() * 50;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      particle.mx += (mouse.current[0] - particle.mx) * 0.01;
      particle.my += (mouse.current[1] * -1 - particle.my) * 0.01;
      
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.05, 12, 12]} />
      <meshPhongMaterial color="#0ea5e9" />
    </instancedMesh>
  );
};

export default function ParticleField() {
  const mouse = useRef([0, 0]);

  return (
    <div className="absolute inset-0 z-0 bg-dark-1000 overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 25], fov: 75 }}
        onMouseMove={(e) => (mouse.current = [(e.clientX - window.innerWidth / 2) / 20, (e.clientY - window.innerHeight / 2) / 20])}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Particles mouse={mouse} />
      </Canvas>
    </div>
  );
}
