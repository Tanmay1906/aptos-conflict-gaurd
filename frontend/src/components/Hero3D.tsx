import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Line } from "@react-three/drei";
import * as THREE from "three";

const AnimatedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.5}>
      <MeshDistortMaterial
        color="#3b82f6"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};

const ConnectionNodes = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  const nodes = [
    [2, 0, 0],
    [-2, 0, 0],
    [0, 2, 0],
    [0, -2, 0],
    [0, 0, 2],
    [0, 0, -2],
  ];

  return (
    <group ref={groupRef}>
      {nodes.map((position, i) => (
        <mesh key={i} position={position as [number, number, number]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={0.5} />
        </mesh>
      ))}
      {/* Connection lines */}
      {nodes.map((_, i) => {
        const nextIndex = (i + 1) % nodes.length;
        const points = [
          new THREE.Vector3(...nodes[i] as [number, number, number]),
          new THREE.Vector3(...nodes[nextIndex] as [number, number, number]),
        ];
        return (
          <Line
            key={`line-${i}`}
            points={points}
            color="#60a5fa"
            lineWidth={1}
            opacity={0.3}
            transparent
          />
        );
      })}
    </group>
  );
};

export const Hero3D = () => {
  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#60a5fa" />
        <AnimatedSphere />
        <ConnectionNodes />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};
