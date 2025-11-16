import { OrbitControls, Stars, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { folder, Leva, useControls } from "leva";
import { Suspense, useRef, useState } from "react";
import { DirectionalLightHelper } from "three";
import * as THREE from "three";
import ConeShape from "./shapes/ConeShape";
import SphereShape from "./shapes/SphereShape";
import IntroText from "./text/IntroText";

const HeroCanvas = () => {
    const [isNear, setIsNear] = useState(true);

    return (
        <div className="canvas_container" onClick={() => { setIsNear(!isNear); }} >
            <Canvas
                orthographic
                camera={{
                    zoom: 100,
                    position: [0, 0, 5],
                    fov: 75,
                    near: 0.1,
                    far: 1000
                }} >
                {/* <OrbitControls /> */}
                <SphereWithCones isNear={isNear} />
                <SpheresGroup />
                <Suspense fallback={"Loading"}>
                    {/* <Stars
                        radius={100}
                        depth={100}
                        count={4000}
                        factor={4}
                        saturation={0}
                        fade
                        speed={0.2}
                    /> */}
                    {/* <Stars radius={0} depth={100} count={100} factor={1} saturation={0} fade speed={1} /> */}

                </Suspense>
                <IntroText />
                <DirLightWithHelper />
                <ambientLight intensity={1} color="#ffffff" />
            </Canvas>
        </div>
    );
}

const SpheresGroup = () => {
    const texture = useTexture('public/sp2.jpg')

    return (
        <group position={[3, 0, 0]}>
            <SphereShape args={[0.2, 20]} position={[3, 2, -2]} color="#d751de" folderName='cube1' map={texture} rotation={[0, THREE.MathUtils.degToRad(-50), 0]} />
            <SphereShape args={[0.1, 20]} position={[-2, 2, 2]} color="#78f5a5" folderName='cube2' map={texture} rotation={[0, THREE.MathUtils.degToRad(-50), 0]} />
            <SphereShape args={[0.3, 20]} position={[-2, -3, -2]} color="#5871d1" folderName='cube3' map={texture} rotation={[0, THREE.MathUtils.degToRad(-50), 0]} />
            <SphereShape args={[0.3, 20]} position={[2, -2, 2]} color="#cb9292" folderName='cube4' map={texture} rotation={[0, THREE.MathUtils.degToRad(-50), 0]} />
        </group>
    )
}

const SphereWithCones = ({ isNear }) => {
    const ref = useRef()
    const texture = useTexture('/liquid-marbling-texture.jpg')
    const normalMap = useTexture('/liquid-marbling-texture_displacement.png')
    const displacementMap = useTexture('/liquid-marbling-texture_normal.png')

    const controls = useControls({
        radius: { value: 1, min: 0, max: 10, step: .1 },
        gap: { value: 0.45, min: 0, max: 10, step: .1 },
    }, { collapsed: true })
    const { radius, gap } = controls

    // --------------------------
    // Continuous rotation
    // --------------------------
    useFrame(() => {
        if (!ref.current) return;

        ref.current.rotation.x += 0.0009;  // rotate around X
        ref.current.rotation.y += 0.0009;  // rotate around Y
        ref.current.rotation.z += 0.0005; // optional: rotate around Z slower
    });

    return (
        <group ref={ref} position={[3, 0, 0]} >
            {/* Cube */}
            <SphereShape color='#ff80cc' position={[0, 0, 0]} args={[0.7, 200, 200]}
                map={texture}
            // normalMap={normalMap}
            // displacementMap={displacementMap}
            // displacementScale={0.02}
            />

            {/* +X Face */}
            <ConeShape
                position={[radius + gap, 0, 0]}
                rotation={[Math.PI / 4, 0, -Math.PI / 2]}
                axis='x'
                folderName='+X Face'
                isNear={isNear}
            />

            {/* -X Face */}
            <ConeShape
                position={[-radius - gap, 0, 0]}
                rotation={[Math.PI / 4, 0, Math.PI / 2]}
                axis='x'
                negative
                folderName='-X Face'
                isNear={isNear}
            />

            {/* +Y Face */}
            <ConeShape
                position={[0, radius + gap, 0]}
                // rotation={[0, Math.PI/4, 0]}
                rotation={[0, THREE.MathUtils.degToRad(135), 0]}
                axis='y'
                folderName='+Y Face'
                isNear={isNear}
            />

            {/* -Y Face */}
            <ConeShape
                position={[0, -radius - gap, 0]}
                rotation={[Math.PI / 1, Math.PI / 4, 0]}
                axis='y'
                negative
                folderName='-Y Face'
                isNear={isNear}
            />

            {/* +Z Face */}
            <ConeShape
                position={[0, 0, radius + gap]}
                rotation={[Math.PI / 2, Math.PI / 4, 0]}
                axis='z'
                folderName='+Z Face'
                isNear={isNear}
            />

            {/* -Z Face */}
            <ConeShape
                position={[0, 0, -radius - gap]}
                rotation={[-Math.PI / 2, Math.PI / 4, 0]}
                axis='z'
                negative
                folderName='-Z Face'
                isNear={isNear}
            />
        </group>
    );
}

const DirLightWithHelper = () => {
    const dirLightRef = useRef(null);
    const light = useControls({
        directionalLight: folder({
            color: '#b0cc41',
            intensity: { value: 3.08, min: 0, max: 10, step: .01 },
            axisX: { value: 1, min: -100, max: 100, step: 1 },
            axisY: { value: 2, min: -100, max: 100, step: 1 },
            axisZ: { value: 1, min: -100, max: 100, step: 1 },
            speed: { value: 0.01, min: 0, max: 1, step: 0.1 }
        }, { collapsed: true })
    })
    const { axisX, axisY, axisZ, color, intensity, speed } = light

    // useFrame((state) => {
    //     const t = state.clock.elapsedTime;
    //     dirLightRef.current.position.y = axisY + Math.sin(t) * 10;
    //     dirLightRef.current.position.x = axisX + Math.sin(t) * 10;
    //     dirLightRef.current.position.z = axisZ + Math.sin(t) * 10;
    // });

    // Attach the DirectionalLightHelper to the directionalLight
    // Arguments: ref, HelperClass, [size], [color]
    // useHelper(dirLightRef, DirectionalLightHelper, 1, '#ffffff');

    return (
        <>
            <directionalLight ref={dirLightRef} position={[axisX, axisY, axisZ]} color={color} castShadow intensity={intensity} />
        </>
    )
}

export default HeroCanvas;