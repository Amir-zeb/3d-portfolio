import { Canvas } from "@react-three/fiber";
import { CurveModifier, OrbitControls, Text3D } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { skills } from "../data/data";

// --------------------- MAIN CANVAS ---------------------
export default function SkillsCanvas() {


    return (
        <div className="canvas_container">
            <Canvas camera={{ position: [0, 3, 10] }}>
                <OrbitControls enableZoom={false} enablePan />
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                {/* <SkillSphereGroup skills={skills.map(x => x.title)} radius={5} /> */}
                <group position={[0,1,0]}>
                    <CurvedText y={2} text={'HTML CSS SCSS'} r={1.4} />
                </group>
                <CurvedText y={1} text={'Javascript   Typescript   jQuery'} r={2.8} />
                <CurvedText y={0} text={'Bootstrap  MUI  Tailwind Css  AntD  Paper UI'} r={4} />
                <CurvedText y={-1} text={'React.js Next.js Vue.js React Native Node js Express Js Nest Js'} r={6} />
                {/* <Sun /> */}
                {/* 🌍 Multiple Orbits */}
                {/* <Orbit
                    radius={3}
                    y={2}
                    speed={0.4}
                    text="HTML CSS SCSS JavaScript"
                />
                <Orbit
                    radius={5}
                    y={1}
                    speed={0.25}
                    text="React Redux TypeScript Next.js"
                />
                <Orbit
                    radius={7}
                    y={0}
                    speed={0.15}
                    text="Node.js Express MongoDB PostgreSQL"
                /> */}
            </Canvas>
        </div>
    );
}

// --------------------- SUN ---------------------

const CurvedText = ({ text, r = 1.5, y }) => {

    const curvedPoints = [
        new THREE.Vector3(-r, 0, r), // Example points
        new THREE.Vector3(-r, 0, -r),
        new THREE.Vector3(r, 0, -r),
        new THREE.Vector3(r, 0, r),
    ];

    const curve = useMemo(() => new THREE.CatmullRomCurve3(curvedPoints, true, 'centripetal'), [curvedPoints]);

    return (
        <CurveModifier curve={curve}>
            <Text3D font="/fonts/Montserrat_Regular.json" position={[0, y, 0]} >
                {text}
                <meshNormalMaterial />
            </Text3D>
        </CurveModifier>
    )
}

const Sun = () => {
    return (
        <group>
            <mesh>
                <sphereGeometry args={[1.2, 32, 32]} />
                <meshStandardMaterial
                    color="#ffea00"
                    emissive="#ffea00"
                    emissiveIntensity={1.5}
                />
            </mesh>

            {/* ☀️ Light emanating from sun */}
            <pointLight
                position={[0, 0, 6]}
                intensity={100}
                distance={40}
                color="#fff7a5"
                castShadow
            />
        </group>
    );
};

// --------------------- ORBIT COMPONENT ---------------------

const Orbit = ({ radius, speed, text, y }) => {
    const ref = useRef();

    useFrame((state, delta) => {
        ref.current.rotation.y += delta * speed;
    });

    const characters = text.split("").reverse();

    return (
        <group ref={ref}>

            {/* 🔵 Orbit Line */}
            <mesh position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[radius - 0.02, radius + 0.02, 256]} />
                <meshBasicMaterial color="#aaaaaa" side={THREE.DoubleSide} />
            </mesh>

            {/* 🔤 Curved Text */}
            {characters.map((char, i) => {
                const angle = (i / characters.length) * Math.PI * 2;
                console.log("🚀 ~ Orbit ~ angle:", angle)

                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;

                // Tangent direction along the orbit
                const rotationY = -angle + Math.PI / 2;

                return (
                    <Text3D
                        key={i}
                        position={[x, y, z]}
                        rotation={[0, rotationY, 0]}
                        size={0.4}
                        height={0.05}
                        font="/fonts/Montserrat_Regular.json"
                        bevelEnabled
                        bevelSize={0.01}
                        bevelThickness={0.01}
                        receiveShadow
                    >
                        {char}
                        <meshStandardMaterial color={randomColor()} />
                    </Text3D>
                );
            })}
        </group>
    );
};

function SkillSphereGroup({ skills, radius }) {
    const groupRef = useRef();

    // Rotate whole sphere
    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.3;
            groupRef.current.rotation.x += delta * 0.15;
        }
    });

    // Generate evenly distributed spherical coordinates
    const points = useMemo(() => {
        const output = [];
        const count = skills.length;

        for (let i = 0; i < count; i++) {
            const phi = Math.acos(-1 + (2 * i) / count); // vertical
            const theta = Math.sqrt(count * Math.PI) * phi; // horizontal

            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);

            output.push([x, y, z]);
        }

        return output;
    }, [skills, radius]);

    return (
        <group ref={groupRef}>
            {skills.map((skill, i) => {
                const [x, y, z] = points[i];

                // Face text outward
                const lookAt = new THREE.Vector3(x, y, z).normalize();

                return (
                    <Text3D
                        key={i}
                        position={[x, y, z]}
                        size={0.5}
                        height={0.05}
                        font="/fonts/Montserrat_Regular.json"
                        bevelEnabled
                        bevelSize={0.01}
                        bevelThickness={0.01}
                        rotation={[
                            Math.atan2(lookAt.y, lookAt.z),
                            Math.atan2(lookAt.x, lookAt.z),
                            0
                        ]}
                    >
                        {skill}
                        <meshStandardMaterial color={randomColor()} />
                    </Text3D>
                );
            })}
        </group>
    );
}


// --------------------- RANDOM COLOR ---------------------

function randomColor() {
    return new THREE.Color(Math.random(), Math.random(), Math.random());
}
