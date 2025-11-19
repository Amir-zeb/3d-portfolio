import { Canvas } from "@react-three/fiber";
import { CurveModifier, OrbitControls, Text3D } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { skills } from "../data/data";
import { folder, useControls } from "leva";

// --------------------- MAIN CANVAS ---------------------
export default function SkillsCanvas() {


    return (
        <div className="canvas_container">
            <Canvas camera={{ position: [0, 15, 10] }}>
                <OrbitControls enableZoom={false} enablePan />
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
            </Canvas>
        </div>
    );
}

// --------------------- SUN ---------------------

const MyText = ({ text, ...props }) => {

    return (
        <Text3D font="/fonts/Montserrat_Regular.json" {...props} >
            {text}
            <meshNormalMaterial />
        </Text3D>
    )
}

function Stage() {
    const ref = useRef()
    const stage = useControls({
        stage: folder({
            color: '#ffffff',
            axisX: { value: 0, min: -10, max: 10, step: 0.5 },
            axisY: { value: -1, min: -10, max: 10, step: 0.5 },
            axisZ: { value: 0, min: -10, max: 10, step: 0.5 },
        })
    })
    const { axisX, axisY, axisZ, color } = stage

    return (
        <mesh ref={ref} position={[axisX, axisY, axisZ]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow >
            <planeGeometry args={[40, 40]} />
            <meshStandardMaterial color={color} side={THREE.DoubleSide} />
        </mesh>
    );
}