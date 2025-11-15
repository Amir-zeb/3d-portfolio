import { useFrame } from "@react-three/fiber";
import { folder, useControls } from "leva";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const ConeShape = ({ position = [0, 0, 0], rotation = [0, 0, 0], folderName = '', axis = "x", negative = false, isNear }) => {
    const ref = useRef();
    const offset = useRef(0);
    const rotOffset = useRef(0);
    const rotationSpeed = useRef(0);

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
        if (!ref.current) return;
        // Get elapsed time in seconds
        const time = state.clock.getElapsedTime();

        // -------------------------------
        // Smooth Near ↔ Far Transition
        // -------------------------------
        const target = isNear ? 0 : 0.5;
        offset.current = THREE.MathUtils.lerp(
            offset.current,
            target,
            delta * 10 // smooth, frame-rate independent
        );
        // Clamp to avoid floating tail
        offset.current = THREE.MathUtils.clamp(offset.current, 0, 0.5);
        const isTransitioning = Math.abs(offset.current - target) > 0.0005;

        // Base position: near = original, far = offset by 1 unit
        const baseOffset = offset.current * sign;

        // compute base position for the selected axis
        let posX = position[0];
        let posY = position[1];
        let posZ = position[2];

        if (axis === "x") posX = position[0] + baseOffset;
        if (axis === "y") posY = position[1] + baseOffset;
        if (axis === "z") posZ = position[2] + baseOffset;

        // OUTWARD → RETURN (0 → 1 → 0)
        const bounce = Math.abs(Math.sin(time * 0.5)) * 0.3 * sign;

        // now add bounce around the base position
        if (axis === "x") ref.current.position.x = posX + bounce;
        if (axis === "y") ref.current.position.y = posY + bounce;
        if (axis === "z") ref.current.position.z = posZ + bounce;

        // -------------------------------
        // Rotation ONLY DURING TRANSITION
        // -------------------------------
        if (isTransitioning) {

            // Near → Far = clockwise  
            // Far → Near = anticlockwise
            const targetRotSpeed = isNear ? 1 : -1;

            // Smooth rotation speed
            rotationSpeed.current = THREE.MathUtils.lerp(
                rotationSpeed.current,
                targetRotSpeed,
                delta * 4 // smoothness
            );

            // rotation offset accumulates
            rotOffset.current += rotationSpeed.current * delta * 4; // speed factor
            // Apply rotation based on axis
            if (axis === "x")
                ref.current.rotation.x += rotationSpeed.current * delta * 10;
            if (axis === "y")
                ref.current.rotation.y += rotationSpeed.current * delta * 10;
            if (axis === "z")
                ref.current.rotation.y += rotationSpeed.current * delta * 10;
        } else {
            // stop rotation when stable
            rotationSpeed.current = 0;
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