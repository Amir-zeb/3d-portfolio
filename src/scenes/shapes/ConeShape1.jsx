import { useFrame } from "@react-three/fiber";
import { folder, useControls } from "leva";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const ConeShape = ({ position = [0, 0, 0], rotation = [0, 0, 0], folderName = '', axis = "x", negative = false, isAnimating, setIsAnimating }) => {
    const ref = useRef();
    const animTime = useRef(0); // local clock for this animation
    const amplitude = 1;     // how far it moves
    const duration = 2;         // duration of one full animation cycle in seconds

    const sign = negative ? -1 : 1;

    // Leva controls
    const ConeShape = useControls({
        roughness: { value: 0, min: 0, max: 1, step: 0.25 },
        metalness: { value: 0, min: 0, max: 1, step: 0.25 },
        [`${folderName}`]: folder({
            color1: '#3aad8f',
            color2: '#FF69B4',
            color3: '#7a4d9f',
            color4: '#00BFFF',
            // color1: '#00BFFF',
            // color2: '#FF69B4',
            // color3: '#7FFF00',
            // color4: '#9400D3',
            // color1: '#33335f',
            // color2: '#7a4d9f',
            // color3: '#eb68a0',
            // color4: '#a8dacd',
            wireframe: false,
            radius: { value: 1, min: 1, max: 10, step: 0.1 },
            height: { value: 1.5, min: 1, max: 10, step: 0.1 },
        }, { collapsed: true })
    });

    const { color1, color2, color3, color4, wireframe, radius, height, metalness, roughness } = ConeShape;

    // ==============================
    // Geometry (memoized)
    // ==============================
    const geometry = useMemo(() => {
        const g = new THREE.ConeGeometry(radius, height, 4);
        for (let i = 0; i < 4; i++) {
            g.addGroup(i * 3, 3, i); // 4 faces → 4 materials
        }
        return g;
    }, [radius, height]);


    // ==============================
    // Materials (stable)
    // ==============================
    const materials = useMemo(() => [
        new THREE.MeshStandardMaterial({ transparent: true, opacity: 1, side: THREE.DoubleSide, roughness: roughness, metalness: metalness }),
        new THREE.MeshStandardMaterial({ transparent: true, opacity: 1, side: THREE.DoubleSide, roughness: roughness, metalness: metalness }),
        new THREE.MeshStandardMaterial({ transparent: true, opacity: 1, side: THREE.DoubleSide, roughness: roughness, metalness: metalness }),
        new THREE.MeshStandardMaterial({ transparent: true, opacity: 1, side: THREE.DoubleSide, roughness: roughness, metalness: metalness }),
    ], []);

    // update materials on leva change
    useEffect(() => {
        materials[0].color.set(color1);
        materials[1].color.set(color2);
        materials[2].color.set(color3);
        materials[3].color.set(color4);
        materials.forEach(m => (m.wireframe = wireframe));
        materials.forEach(m => (m.metalness = metalness));
        materials.forEach(m => (m.roughness = roughness));
    }, [color1, color2, color3, color4, wireframe, materials, metalness, roughness]);

    // ==============================
    // Animation
    // ==============================
    useFrame((state, delta) => {
        if (!ref.current || !isAnimating) return;

        // increment animation time
        animTime.current += delta;

        // normalized time [0, 1]
        const tNorm = Math.min(animTime.current / duration, 1);

        // sin curve for smooth to-and-fro motion
        const offset = Math.sin(tNorm * Math.PI) * amplitude * sign;
        const round = THREE.MathUtils.degToRad(45) * tNorm * 8;

        // const elapsed = state.clock.getElapsedTime();
        // // Sin oscillation: -1 → 1
        // const sinVal = Math.sin((elapsed / 2) * Math.PI); // period = 2 seconds

        // // Map to 0 → 1
        // const opacity = (sinVal + 1) / 2;

        // // If multiple materials
        // if (Array.isArray(ref.current.material)) {
        //     ref.current.material.forEach((mat) => {
        //         mat.opacity = opacity;
        //     });
        // }

        if (axis === "x") {
            ref.current.position.x = position[0] + offset;
            ref.current.rotation.x = rotation[0] + round;
        }
        if (axis === "y") {
            ref.current.position.y = position[1] + offset;
            ref.current.rotation.y = rotation[1] + round;
            // ref.current.rotation.y = THREE.MathUtils.degToRad(rotation[1] + 45) * tNorm * 5;
        }
        if (axis === "z") {
            ref.current.position.z = position[2] + offset;
            ref.current.rotation.y = rotation[1] + round;
            // ref.current.rotation.y = THREE.MathUtils.degToRad(rotation[2] + 45) * tNorm * 5;
        }

        // stop animation after one cycle
        if (tNorm >= 1) {
            setIsAnimating(false);
            animTime.current = 0;
            // restore original position and rotation
            ref.current.position.set(...position);
            ref.current.rotation.set(...rotation);
        }
    });

    return (
        <mesh
            ref={ref}
            geometry={geometry}
            material={materials}
            position={position}
            rotation={rotation}
            castShadow
        />
    );
}

export default ConeShape