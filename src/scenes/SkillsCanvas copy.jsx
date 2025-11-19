import { Box, Environment, GradientTexture, OrbitControls, PerspectiveCamera, Text, Text3D, Torus, useHelper, useTexture } from "@react-three/drei";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { skills } from "../data/data";
import { TextGeometry } from "three/examples/jsm/Addons.js";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import { folder, useControls } from "leva";
extend({ TextGeometry });

const radius = 1.5;

// Pre-calculate safe visible positions
const skillPositions = skills.map((_, i) => {
    const angle = (i / skills.length) * Math.PI * 2;
    return [
        (Math.random() - 0.5) * 0.4, // small vertical offset
        Math.cos(angle) * radius,
        Math.sin(angle) * radius - 2 // push slightly backward for visibility
    ];
});

// const GRID_SIZE = 5;      // 5x5 grid
// const SPACING = 0.6;      // distance between items

// const skillPositions = skills.map((skill, index) => {
//     const row = Math.floor(index / GRID_SIZE);
//     const col = index % GRID_SIZE;

//     // center grid around (0,0)
//     const x = (col - (GRID_SIZE - 1) / 2) * SPACING;
//     const y = (row - (GRID_SIZE - 1) / 2) * SPACING;

//     return [x, y, 0];
// });

const SkillsCanvas = () => {
    return (
        <div className="canvas_container">
            <Canvas camera={{ position: [2, 0, 2] }}>
                <OrbitControls enableZoom={false} />
                <Environment preset="warehouse" />
                <Suspense>
                    <Physics>
                        {/* {[skills[0], skills[1], skills[2]].map((x, i) => ( */}

                        {/* <RigidBody type="fixed">
                            <Stage />
                        </RigidBody> */}
                        <SkillsGroup />
                        {/* <SkillsGrid skills={skills} /> */}
                    </Physics>
                </Suspense>
                {/* <SpotLightWithHelper intensity={1} color="#ffffff" /> */}
                <ambientLight intensity={1} color="#ffffff" />
            </Canvas>
        </div>
    );
}

function SkillsGrid({ skills }) {
    const { viewport } = useThree();
    const { width, height } = viewport; // scene space width/height

    const COLS = 5; // 5 columns
    const ROWS = Math.ceil(skills.length / COLS);

    // Grid covers 80% of screen
    const gridWidth = width * 0.8;
    const gridHeight = height * 0.8;

    const cellW = gridWidth / COLS;
    const cellH = gridHeight / ROWS;

    return (
        <>
            {skills.map((skill, index) => {
                const row = Math.floor(index / COLS);
                const col = index % COLS;

                // center grid
                const x = (col - (COLS - 1) / 2) * cellW;
                const y = ((ROWS - 1) / 2 - row) * cellH;

                return (
                    <MyText
                        key={index}
                        text={skill.title}
                        position={[x, y, 0]}
                        fontSize={cellH * 0.25} // auto scaling
                    />
                );
            })}
        </>
    );
}
const SkillsGroup = () => {
    const ref = useRef();

    useFrame(() => {
        // ref.current.rotation.z += 0.1
    })

    return (<>
        <group ref={ref}
        // rotateY={THREE.MathUtils.degToRad(45)}
        >
            {skills.map((x, i) => (
                <RigidBody
                    key={i}
                    gravityScale={-0.01}
                    linearDamping={2}
                    angularDamping={2}
                    restitution={0.2}
                    friction={1}
                >
                    <MyText
                        position={skillPositions[i]}
                        fontSize={0.1}
                        color="#fff"
                        text={x.title}
                    />
                </RigidBody>
            ))}
        </group>
    </>)
}

const MyText = ({ text, position, timeout = 0, fontSize, color }) => {
    const ref = useRef()
    const r = Math.random(); // Random value for red (0 to 1)
    const g = Math.random(); // Random value for green (0 to 1)
    const b = Math.random(); // Random value for blue (0 to 1)
    const randomColor = new THREE.Color(r, g, b);

    // useFrame((state) => {
    //     const t = state.clock.getElapsedTime();

    //     if (!ref.current) return;

    //     // gentle wobble (left-right)
    //     ref.current.position.x += Math.sin(t * 0.8 + text.length) * 0.0005;

    //     // vertical bobbing
    //     ref.current.position.y += Math.cos(t * 1.2 + text.length) * 0.0008;

    //     // slow rotation like a balloon string turning
    //     ref.current.rotation.z = Math.sin(t * 0.2) * 0.25;
    //     ref.current.rotation.y = Math.cos(t * 0.3) * 0.25;
    // });

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.15;
    });

    return (
        <Text3D
            position={position}
            size={fontSize}
            curveSegments={125}
            brevelSegments={10}
            rotation={[0, THREE.MathUtils.degToRad(90), 0]}
            bevelEnabled
            bevelSize={0.02}
            bevelThickness={0.01}
            height={0.1}
            lineHeight={1}
            letterSpacing={0.01}
            font={'/fonts/Montserrat_Regular.json'}
            castShadow
            ref={ref}
        >
            {text}
            <meshStandardMaterial color={randomColor} />
        </Text3D>
    );
}

function Stage() {
    const ref = useRef()
    const stage = useControls({
        stage: folder({
            color: '#ccc',
            axisX: { value: 0, min: -10, max: 10, step: 0.5 },
            axisY: { value: -1, min: -10, max: 10, step: 0.5 },
            axisZ: { value: 0, min: -10, max: 10, step: 0.5 },
        })
    })
    const { axisX, axisY, axisZ, color } = stage

    return (
        <mesh ref={ref} position={[axisX, axisY, axisZ]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow  >
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial transparent={true} opacity={1} color={color} side={THREE.DoubleSide} />
        </mesh>
    );
}

const SpotLightWithHelper = () => {
    const ref = useRef(null);
    const light = useControls({
        SpotLight: folder({
            color: '#b0cc41',
            intensity: { value: 3.08, min: 0, max: 10, step: .01 },
            angle: { value: 0.2, min: 0, max: 1, step: .01 },
            penumbra: { value: 1, min: 0, max: 1, step: .01 },
            axisX: { value: 0, min: -100, max: 100, step: 1 },
            axisY: { value: 10, min: -100, max: 100, step: 1 },
            axisZ: { value: -16, min: -100, max: 100, step: 1 },
        }, { collapsed: true })
    })
    const { axisX, axisY, axisZ, color, intensity, angle, penumbra } = light

    // useFrame((state) => {
    //     const t = state.clock.elapsedTime;
    //     ref.current.position.y = axisY + Math.sin(t) * 10;
    //     ref.current.position.x = axisX + Math.sin(t) * 10;
    //     ref.current.position.z = axisZ + Math.sin(t) * 10;
    // });

    // Attach the DirectionalLightHelper to the directionalLight
    // Arguments: ref, HelperClass, [size], [color]
    useHelper(ref, THREE.SpotLightHelper, 1, '#ffffff');

    return (
        <>
            <spotLight ref={ref} position={[axisX, axisY, axisZ]} color={color} castShadow intensity={intensity * 1000} angle={angle} penumbra={penumbra} />
        </>
    )
}



export default SkillsCanvas;