import { OrbitControls, useHelper } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { folder, Leva, useControls } from "leva";
import { useRef } from "react";
import { DirectionalLightHelper } from "three";
import { DoubleSide } from "three";

const HeroCanvas = () => {
    return (
        <div className="canvas_container">
            <Canvas camera={{ position: [0, 0, 13] }} >
                {/* <Canvas camera={{ position: [0, 0, 20], fov: 45, near: 0.1, far: 200 }} > */}
                {/* <OrbitControls /> */}
                <TorusShape position={[0, 0, 0]} />
                <ambientLight intensity={0.1} color="#ffffff" />
                <DirLightWithHelper />
            </Canvas>
        </div>
    );
}

export default HeroCanvas;

const DirLightWithHelper = () => {
    const dirLightRef = useRef(null);
    const light = useControls({
        directionalLight: folder({
            color: '#ffffff',
            // color: '#0a192f',
            // color: '#64ffda',
            intensity: { value: 3.08, min: 0, max: 10, step: .01 },
            axisX: { value: -38, min: -100, max: 100, step: 1 },
            axisY: { value: 36, min: -100, max: 100, step: 1 },
            axisZ: { value: 23, min: -100, max: 100, step: 1 },
            speed: { value: 0.01, min: 0, max: 1, step: 0.1 }
        }, { collapsed: true })
    })
    const { axisX, axisY, axisZ, color, intensity, speed } = light

    // useFrame((state) => {
    //     const t = state.clock.elapsedTime
    //     // Base Y position + oscillation
    //     // dirLightRef.current.position.y = axisY + Math.sin(t * speed)
    //     dirLightRef.current.position.y = Math.sin(t * speed)
    // })

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        dirLightRef.current.position.y = axisY + Math.sin(t) * 10;
        dirLightRef.current.position.x = axisX + Math.sin(t) * 10;
        dirLightRef.current.position.z = axisZ + Math.sin(t) * 10;
    });

    // Attach the DirectionalLightHelper to the directionalLight
    // Arguments: ref, HelperClass, [size], [color]
    // useHelper(dirLightRef, DirectionalLightHelper, 1, '#ffffff');

    return (
        <>
            <directionalLight ref={dirLightRef} position={[axisX, axisY, axisZ]} color={color} castShadow intensity={intensity} />
        </>
    )
}

const TorusShape = ({folderName='Torus', position = [0, 0, 0] }) => {
    const ref = useRef()
    const shape = useControls({
        [`${folderName}`]: folder({
            color: '#fc4141',
            // color: '#404cf1ff',
            // color: '#0a192f',
            // color: '#64ffda',
            wireframe: false,
            metalness: { value: 0.0, min: 0, max: 1, step: 0.01 },
            roughness: { value: 0.18, min: 0, max: 1, step: 0.01 },
            radius: { value: 18, min: 1, max: 20, step: 1 },
            tube: { value: 2, min: 1, max: 10, step: 1 },
            tubularSegments: { value: 300, min: 3, max: 300, step: 1 },
            radialSegments: { value: 20, min: 3, max: 20, step: 1 },
            p: { value: 5, min: 1, max: 20, step: 1 },
            q: { value: 2, min: 1, max: 20, step: 1 },
            axisX: { value: position[0], min: -100, max: 100, step: 1 },
            axisY: { value: position[1], min: -100, max: 100, step: 1 },
            axisZ: { value: position[2], min: -100, max: 100, step: 1 },
            rotationX: { value: -0.6, min: -Math.PI, max: Math.PI, step: 0.01 },
            rotationY: { value: 0.7, min: -Math.PI, max: Math.PI, step: 0.01 },
            rotationZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
        }, { collapsed: true })
    })
    const { color, wireframe, radius, tube, tubularSegments, radialSegments, p, q, metalness, roughness, axisX, axisY, axisZ, rotationX, rotationY, rotationZ, } = shape

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        ref.current.position.y = axisY + Math.sin(t) * 1;
        // ref.current.position.x = axisX + Math.sin(t) * 1;
        // ref.current.position.z = axisZ + Math.sin(t) * 1;
    });

    return (
        <mesh ref={ref} position={[axisX, axisY, axisZ]} rotation={[rotationX, rotationY, rotationZ]} castShadow>
            <torusKnotGeometry args={[radius, tube, tubularSegments, radialSegments, p, q]} />
            <meshToonMaterial
                color={color}
                wireframe={wireframe}
                // metalness={metalness}
                // roughness={roughness}
                side={DoubleSide}
            />
            {/* <meshStandardMaterial
                color={color}
                wireframe={wireframe}
                metalness={metalness}
                roughness={roughness}
                side={DoubleSide}
            /> */}
        </mesh>
    )
}