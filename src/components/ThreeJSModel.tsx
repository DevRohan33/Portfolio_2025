import { useRef, useMemo, useState, RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  OrbitControls, 
  Text, 
  PerspectiveCamera,
  Environment,
  Float,
  MeshDistortMaterial
} from "@react-three/drei";
import * as THREE from "three";

// Type definitions for the refs
type PointsRef = RefObject<THREE.Points>;
type MeshRef = RefObject<THREE.Mesh>;
type MaterialRef = RefObject<{ distort: number }>;

// Animated particles background with improved visibility
const Particles = ({ count = 200 }) => {
  const mesh = useRef<THREE.Points>(null);
  
  // Create particles with random positions
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 0.3 + 0.1; // Increased size
      const factor = size * 0.7;
      const speed = Math.random() * 0.1 + 0.05;
      const x = Math.random() * 50 - 25;
      const y = Math.random() * 50 - 25;
      const z = Math.random() * 50 - 25;
      
      temp.push({ size, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);
  
  // Particle positions and sizes
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = particles[i].x;
      positions[i * 3 + 1] = particles[i].y;
      positions[i * 3 + 2] = particles[i].z;
    }
    return positions;
  }, [count, particles]);
  
  useFrame(() => {
    if (!mesh.current) return;
    
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] += particles[i].speed / 2;
      positions[i3 + 1] += particles[i].speed / 3;
      positions[i3 + 2] += particles[i].speed / 4;
      
      // Reset position when particles go too far
      if (positions[i3] > 25) positions[i3] = -25;
      if (positions[i3 + 1] > 25) positions[i3 + 1] = -25;
      if (positions[i3 + 2] > 25) positions[i3 + 2] = -25;
    }
    
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.2} 
        color="#0078FF" 
        transparent 
        opacity={0.9} 
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Defining custom interface for the distortion material
interface DistortMaterialRef {
  distort: number;
}

// Animated floating sphere with distortion
const AnimatedSphere = ({ position, color }: { position: [number, number, number], color: string }) => {
  const sphere = useRef<DistortMaterialRef>(null);
  
  useFrame(({ clock }) => {
    if (!sphere.current) return;
    sphere.current.distort = Math.sin(clock.getElapsedTime()) * 0.4 + 0.5;
  });
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh position={position}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial 
          ref={sphere} 
          color={color} 
          speed={2} 
          distort={0.4} 
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  );
};

// Animated glowing torus
const GlowingTorus = ({ 
  position, 
  rotation 
}: { 
  position: [number, number, number], 
  rotation: { x: number, y: number } 
}) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!ref.current) return;
    
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = rotation.x + Math.sin(t / 2) * 0.5;
    ref.current.rotation.y = rotation.y + Math.cos(t / 3) * 0.5;
  });
  
  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[1.5, 0.4, 16, 60]} />
      <meshStandardMaterial 
        color="#FF5A5A" 
        emissive="#FF3030"
        emissiveIntensity={0.8}
        roughness={0.3}
        metalness={0.7}
      />
    </mesh>
  );
};

// Interactive cube with hover effect
const InteractiveCube = () => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!ref.current) return;
    
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = Math.sin(t / 4) * 0.5;
    ref.current.rotation.y = Math.sin(t / 2) * 0.5;
  });
  
  return (
    <mesh
      ref={ref}
      position={[-3, -2, 1]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial 
        color={hovered ? "#32CD32" : "#00C000"} 
        roughness={0.1}
        metalness={0.6}
        emissive={hovered ? "#32CD32" : "#00C000"}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

// Main component
const ThreeJSModel = () => {
  return (
    <Canvas 
      style={{ width: '100%', height: '100%' }}
      camera={{ position: [0, 0, 10], fov: 60 }}
      gl={{ 
        alpha: true,           // Enable transparency
        antialias: true,       // Smooth edges
        powerPreference: "high-performance"
      }}
    >
      {/* Enhanced lighting for better visibility */}
      <ambientLight intensity={0.8} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.3} 
        penumbra={1} 
        intensity={1.5} 
        castShadow
      />
      <spotLight 
        position={[-10, -10, -10]} 
        angle={0.3} 
        penumbra={1} 
        intensity={0.5} 
        castShadow
      />
      
      <Environment preset="sunset" />
      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={20}
      />
      
      {/* 3D elements */}
      <Particles count={300} />
      
      {/* Name text as centerpiece with high contrast */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          position={[0, 0, 0]}
          color="#000000"
          fontSize={1.2}
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#FFFFFF"
          depthOffset={1}
        >
          Sk Rohad Parveag
        </Text>
        <Text
          position={[0, -1.5, 0]}
          color="#000000"
          fontSize={0.5}
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#FFFFFF"
        >
          DEVELOPER
        </Text>
      </Float>
      
      <AnimatedSphere position={[3, 1, 0]} color="#0066CC" />
      <AnimatedSphere position={[-3, 1, -2]} color="#8000A0" />
      <GlowingTorus position={[3, -2, -1]} rotation={{ x: Math.PI / 4, y: 0 }} />
      <InteractiveCube />
    </Canvas>
  );
};

export default ThreeJSModel;