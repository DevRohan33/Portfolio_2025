
import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const Box = ({ position, size, color }: any) => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 0.2;
    ref.current.rotation.y += delta * 0.3;
  });

  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Sphere = ({ position, radius, color }: any) => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 0.1;
    ref.current.rotation.y += delta * 0.4;
  });

  return (
    <mesh position={position} ref={ref}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Torus = ({ position, args, color }: any) => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 0.3;
    ref.current.rotation.y += delta * 0.2;
  });

  return (
    <mesh position={position} ref={ref}>
      <torusGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Tetrahedron = ({ position, radius, color }: any) => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 0.4;
    ref.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh position={position} ref={ref}>
      <tetrahedronGeometry args={[radius, 0]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const ThreeJSModel = () => {
  return (
    <div className="w-full h-[500px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.5, 0, 0]} size={[1, 1, 1]} color={"#0066FF"} />
        <Sphere position={[1.5, 0, 0]} radius={0.8} color={"#5599FF"} />
        <Torus position={[0, 1.5, 0]} args={[0.6, 0.3, 16, 32]} color={"#0044CC"} />
        <Tetrahedron position={[0, -1.5, 0]} radius={1} color={"#003399"} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default ThreeJSModel;
