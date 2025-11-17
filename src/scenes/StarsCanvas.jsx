import { OrbitControls, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import Stars from "./shapes/Stars";

const StarsCanvas = () => {
  return (
    <div className="stars_canvas_container">
      <Canvas camera={{ position: [0, 0, -10] }} >
        <Stars size={0.2} />
        <ambientLight intensity={1} color="#ffffff" />
      </Canvas>
    </div>
  );
}

function PointsExampleOld() {
  const ref = useRef()
  // create geometry with random points
  const points = new THREE.BufferGeometry();
  const count = 500;
  const positions = new Float32Array(count * 3);
  const texture = useTexture('public/star.png')

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10; // spread points in a 10x10x10 space
  }

  points.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  useFrame(() => {
    ref.current.rotation.x += 1 - Math.random() * 1
  })

  return (
    <points ref={ref} geometry={points}>
      <pointsMaterial
        transparent={true}
        color="#f5e664ff"
        size={0.1}           // size of each point
        map={texture}
        sizeAttenuation={true} // perspective scaling
      />
    </points>
  );
}


export default StarsCanvas;