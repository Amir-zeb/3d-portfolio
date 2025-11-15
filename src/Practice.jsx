import { OrbitControls, useAnimations, useGLTF, useHelper, useTexture, useCubeTexture } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber"
import { folder, useControls } from "leva";
import { useEffect, useRef } from "react";
import { AxesHelper, DirectionalLightHelper } from "three";
import * as THREE from "three";
import { GLTFLoader, SkyGeometry } from "three/examples/jsm/Addons.js";

function Practice() {
  return (
    <>
      <div className="canvas_container">
        <Canvas camera={{ position: [0, 3, 10] }} shadows >
          <OrbitControls />
          <axesHelper args={[5]} />
          {/* <gridHelper args={[40, 40, '#c113b0', '#18c3e2']} position={[0, -1, 0]} /> */}
          <AnimatedBox />
          <AnimatedSphere />
          <TorusShape />
          {/* <TankModel /> */}
          <DancingGirl />
          <Stage />
          <ambientLight intensity={0.1} color="#ffffff" />
          <DirLightWithHelper />
          <UpdateSceneBackground />
        </Canvas>
      </div>
    </>
  )
}

function DirLightWithHelper() {
  const dirLightRef = useRef(null);
  const light = useControls({
    directionalLight: folder({
      color: '#ffffff',
      intensity: { value: 10, min: 0, max: 10, step: .01 },
      axisX: { value: 100, min: -100, max: 100, step: 1 },
      axisY: { value: 25, min: -100, max: 100, step: 1 },
      axisZ: { value: 100, min: -100, max: 100, step: 1 },
    })
  })
  const { axisX, axisY, axisZ, color, intensity } = light

  // Attach the DirectionalLightHelper to the directionalLight
  // Arguments: ref, HelperClass, [size], [color]
  useHelper(dirLightRef, DirectionalLightHelper, 1, '#ffffff');

  return (
    <>
      <directionalLight ref={dirLightRef} position={[axisX, axisY, axisZ]} color={color} castShadow intensity={intensity} />
    </>
  )
}

function AnimatedBox() {
  const ref = useRef()
  const cube = useControls({
    cube: folder({
      color: 'red',
      speed: {
        value: 0.01,
        min: 0,
        max: 1,
        step: 0.1
      }
    })
  })
  const { speed, color } = cube
  useFrame(() => {
    ref.current.rotation.x += speed
    ref.current.rotation.y += speed
    // This function runs at the native refresh rate inside of a shared render-loop
  })

  return (
    <mesh ref={ref} position={[3, 0, 0]} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function AnimatedSphere() {
  const ref = useRef()
  const sphere = useControls({
    sphere: folder({
      color: 'red',
      wireframe: false,
      speed: { value: 2, min: 0, max: 10, step: 0.1 },
      axisY: { value: 0.5, min: -10, max: 10, step: 1 },
      amplitude: { value: 0.5, min: 0, max: 5, step: 0.1 },
      segments: { value: 5, min: 1, max: 50, step: 1 },
    })
  })
  const { speed, color, wireframe, amplitude, axisY, segments } = sphere

  useFrame((state) => {
    const t = state.clock.elapsedTime
    // Base Y position + oscillation
    ref.current.position.y = axisY + Math.sin(t * speed) * amplitude
  })
  return (
    <mesh ref={ref} position={[-3, axisY, 0]} castShadow>
      <icosahedronGeometry args={[1, segments]} />
      <meshToonMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
}

function TankModel(props) {
  const { scene } = useLoader(GLTFLoader, 'src/assets/3d-models/Tank.glb')

  // Ensure all meshes inside the model can cast/receive shadows
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [scene])

  return (
    <primitive
      object={scene}
      position={[17, -1, -15]}
      rotation={[0, Math.PI / 2, 0]}
      scale={0.5}
      castShadow
      {...props}
    />
  )
}

function DancingGirl(props) {
  const group = useRef()
  const { scene, animations } = useGLTF('src/assets/dancing-gltf/dancer_girl/scene.gltf')
  const { actions } = useAnimations(animations, group)
  const model = useControls({
    dancingGirl: folder({
      scale: { value: 0.01, min: 0, max: 1, step: .01 },
      axisX: { value: 0, min: -100, max: 100, step: 1 },
      axisY: { value: -1, min: -100, max: 100, step: 1 },
      axisZ: { value: 0, min: -100, max: 100, step: 1 },
    })
  })
  const { scale, axisX, axisY, axisZ } = model

  useEffect(() => {
    // Play a specific animation if you know its name
    // actions['TankAction']?.play()

    // Or play the first animation found
    const first = Object.keys(actions)[0]
    if (first) actions[first].play()
  }, [actions])

  // Ensure all meshes inside the model can cast/receive shadows
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [scene])

  return (
    <primitive
      ref={group}
      object={scene}
      position={[axisX, axisY, axisZ]}
      scale={scale}
      {...props}
    />
  )
}

function TorusShape() {
  const ref = useRef()
  const shape = useControls({
    Torus: folder({
      color: '#404cf1ff',
      wireframe: false,
      metalness: { value: 0.71, min: 0, max: 1, step: 0.01 },
      roughness: { value: 0.19, min: 0, max: 1, step: 0.01 },
      radius: { value: 18, min: 1, max: 20, step: 1 },
      tube: { value: 1, min: 1, max: 10, step: 1 },
      tubularSegments: { value: 16, min: 3, max: 300, step: 1 },
      radialSegments: { value: 10, min: 3, max: 20, step: 1 },
      p: { value: 13, min: 1, max: 20, step: 1 },
      q: { value: 1, min: 1, max: 20, step: 1 },
    })
  })
  const { color, wireframe, radius, tube, tubularSegments, radialSegments, p, q, metalness, roughness } = shape

  return (
    <mesh ref={ref} position={[0, 0, -3]} castShadow>
      <torusKnotGeometry args={[radius, tube, tubularSegments, radialSegments, p, q]} />
      <meshStandardMaterial
        color={color}
        wireframe={wireframe}
        metalness={metalness}
        roughness={roughness}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function Stage() {
  const ref = useRef()
  const texture = useTexture('src/assets/textures-and-normal-maps/liquid-marbling-paint-texture-background-fluid-painting-abstract-texture-intensive-color-mix-wallpaper.jpg')
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
      <meshStandardMaterial color={color} side={THREE.DoubleSide} map={texture} />
    </mesh>
  );
}

function UpdateSceneBackground() {
  const { scene } = useThree()
  // to change color of background
  // scene.background = new THREE.Color('deepskyblue')

  // to apply single texture
  // const texture = useTexture('src/assets/img/sp2.jpg')
  // scene.background = texture
  // texture.colorSpace = THREE.SRGBColorSpace

  // to apply texture for all faces
  const [texture] = useLoader(THREE.CubeTextureLoader, [[
    'sp2.jpg',
    'sp2.jpg',
    'sp2.jpg',
    'sp2.jpg',
    'sp2.jpg',
    'sp2.jpg',
    // 'src/assets/img/sp2.jpg',
    // 'src/assets/img/sp2.jpg',
    // 'src/assets/img/sp2.jpg',
    // 'src/assets/img/sp2.jpg',
    // 'src/assets/img/sp2.jpg',
    // 'src/assets/img/sp2.jpg',
    //  'https://www.cnd.com/cdn/shop/files/CND22_SUMMER_LIMONCELLO_VX_1200x1200_6f7d641c-91ce-4826-a673-6b17b8717ba3.webp',
    // 'https://www.cnd.com/cdn/shop/files/CND22_SUMMER_LIMONCELLO_VX_1200x1200_6f7d641c-91ce-4826-a673-6b17b8717ba3.webp',
    // 'https://www.cnd.com/cdn/shop/files/CND22_SUMMER_LIMONCELLO_VX_1200x1200_6f7d641c-91ce-4826-a673-6b17b8717ba3.webp',
    // 'https://www.cnd.com/cdn/shop/files/CND22_SUMMER_LIMONCELLO_VX_1200x1200_6f7d641c-91ce-4826-a673-6b17b8717ba3.webp',
    // 'https://www.cnd.com/cdn/shop/files/CND22_SUMMER_LIMONCELLO_VX_1200x1200_6f7d641c-91ce-4826-a673-6b17b8717ba3.webp',
    // 'https://www.cnd.com/cdn/shop/files/CND22_SUMMER_LIMONCELLO_VX_1200x1200_6f7d641c-91ce-4826-a673-6b17b8717ba3.webp',
  ]])
  scene.background = texture

  // to apply texture for all faces
  // const texture = useCubeTexture([
  //   'sp2.jpg',
  //   'sp2.jpg',
  //   'sp2.jpg',
  //   'sp2.jpg',
  //   'sp2.jpg',
  //   'sp2.jpg'
  // ],
  //   { path: 'src/assets/img/' })
  // scene.background = texture

  return null;
}

export default Practice
