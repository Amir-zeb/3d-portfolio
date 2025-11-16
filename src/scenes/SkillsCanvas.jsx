import { GradientTexture, OrbitControls, Text, Text3D, useTexture } from "@react-three/drei";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { skills } from "../data/data";
import { TextGeometry } from "three/examples/jsm/Addons.js";
extend({ TextGeometry });

const SkillsCanvas = () => {
    return (
        <div className="canvas_container">
            <Canvas camera={{ position: [0, 0, 3] }} >
                <OrbitControls enableZoom={false} />
                {/* {skills.map((skill, i) => (
                    <MyText
                        key={i}
                        text={skill.title}
                        position={[i * 2 - 4, i * -0.5, 0]}
                        color="white"
                        fontSize={0.4}
                        timeout={0}
                    />
                ))} */}
                <MyText
                    text={skills[0].title}
                    position={[0, 0, 0]}
                    color="white"
                    fontSize={0.4}
                    timeout={0}
                />
                <MyText
                    text={skills[1].title}
                    position={[1, 0, 0]}
                    color="white"
                    fontSize={0.4}
                    timeout={0}
                />
                {/* <Text>
                    Html
                    <meshStandardMaterial color={'red'}/>
                    <meshBasicMaterial color={'red'}/>
                </Text> */}
                {/* <Text3D></Text3D> */}
                <ambientLight intensity={1} color="#ffffff" />
            </Canvas>
        </div>
    );
}

function SkillCard({ title, position }) {
    const ref = useRef();

    useFrame((state) => {
        ref.current.rotation.y += 0.01;
    });

    return (
        <mesh ref={ref} position={position}>
            <boxGeometry args={[1.4, 0.6, 0.2]} />
            {/* <meshStandardMaterial color="#fff" /> */}
            <meshBasicMaterial color="#fff" />
            <textGeometry args={[title, { size: 0.2, height: 0.02 }]} />
        </mesh>
    );
}

const MyText = ({ text, position, timeout = 0, fontSize, ...props }) => {

    return (
        <Text3D
            position={position}
            size={fontSize}
            curveSegments={24}
            brevelSegments={1}
            bevelEnabled
            bevelSize={0.03}
            bevelThickness={0.01}
            height={.1}
            lineHeight={0.9}
            letterSpacing={0.1}
            font={'/fonts/Montserrat_Regular.json'}
        >
            {text}
            <meshStandardMaterial
                roughness={0.2}
            >
                <GradientTexture
                    stops={[0, 1]} // As many stops as you want
                    // colors={['white', 'hotpink']} // Colors need to match the number of stops
                    colors={['#64ffda', '#0a192f']} // Colors need to match the number of stops
                // size={1024} // Size is optional, default = 1024
                />
            </meshStandardMaterial>
        </Text3D>
    );
}

export default SkillsCanvas;