import { faTheRedYeti } from "@fortawesome/free-brands-svg-icons";
import { MeshTransmissionMaterial, Environment, OrbitControls, useTexture, Torus } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { folder, Leva, useControls } from "leva";
import { useRef } from "react";
import { AxesHelper, Color, DirectionalLightHelper } from "three";
import { DoubleSide, MathUtils } from "three";
import Stars from "./shapes/Stars";

const GlobeCanvas = () => {

    return (
        <div className="canvas_container">
            <Canvas orthographic
                camera={{
                    zoom: 100,
                    position: [0, 0, 20],
                    fov: 75,
                    near: 0.1,
                    far: 1000
                }}>
                <OrbitControls enableZoom={false} enablePan={true} />
                {/* <group position={[0, 0, -5]}>
                    <Stars size={10} />
                </group> */}
                <Stars count={20} size={20} />
                {/* <axesHelper args={[5]} /> */}
                <Planet position={[0, -4, 0]} args={[4, 20, 20]} />
                <SmallPlanet position={[-2, 0, 2]} args={[0.4, 20, 20]} />
                <SmallPlanet position={[3, 0, -2]} args={[0.2, 20, 20]} />
                <SmallPlanet position={[-4, 1, -2]} args={[0.2, 20, 20]} />

                {/* <mesh position={[0, 0, 0]} rotation={[MathUtils.degToRad(90),0,0]}>
                    <planeGeometry args={[10, 10]} />
                    <MeshTransmissionMaterial
                        samples={32}
                        resolution={1024}
                        transmission={1}
                        thickness={0.6}
                        ior={1.52}
                        chromaticAberration={0.05}
                        roughness={0}
                        anisotropy={0.1}
                        distortion={0.05}
                        distortionScale={0.3}
                        temporalDistortion={0.1}
                        side={DoubleSide}
                    />
                </mesh> */}
                <pointLight position={[0, 7, -5]} intensity={100} color='#fff' />
                <pointLight position={[0, 3, -2]} intensity={100} color='#fff' />
                <ambientLight intensity={1} color="#ffffff" />
            </Canvas>
        </div>
    );
}

export default GlobeCanvas;

const Planet = ({ position, args }) => {
    const ref = useRef()
    const texture = useTexture("public/textures/2k_earth_nightmap.jpg");
    const normal = useTexture("public/textures/2k_earth_nightmap_normal.png");
    const displacement = useTexture("public/textures/2k_earth_nightmap_specular.png");

    useFrame(() => {
        ref.current.rotation.x += 0.001
        ref.current.rotation.y += 0.001
        ref.current.rotation.z += 0.001
    })

    return (
        <mesh ref={ref} position={position}>
            <icosahedronGeometry args={args} />
            <meshStandardMaterial map={texture}
            // normalMap={normal}
            // displacementMap={displacement} displacementScale={0.01}
            />
        </mesh>
    )
}

const SmallPlanet = ({ position, args }) => {
    const ref = useRef()

    // useFrame((state, delta) => {
    //     const t = state.clock.elapsedTime
    //     ref.current.position.x = position[0] + Math.cos(t) * 4;
    //     ref.current.position.z = position[2] + Math.sin(t) * 4;
    // })

    return (
        <mesh ref={ref} position={position}>
            <icosahedronGeometry args={args} />
            <meshStandardMaterial color='#333' />
        </mesh>
    )
}

function randomColor() {
    return new Color(Math.random(), Math.random(), Math.random());
}
