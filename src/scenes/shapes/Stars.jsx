import { OrbitControls, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";


const Stars = ({ size = 0.5, color = "#f5e664", count = 500 }) => {
    const ref = useRef();

    const texture = useTexture("public/star.png");

    // --------------------------
    // Generate positions & offsets
    // --------------------------
    const { positions, velocities } = useMemo(() => {
        const posArray = new Float32Array(count * 3);
        const velArray = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            posArray[i * 3 + 0] = (Math.random() - 0.5) * 30; // x
            posArray[i * 3 + 1] = (Math.random() - 0.5) * 10; // y
            posArray[i * 3 + 2] = (Math.random() - 0.5) * 10; // z

            velArray[i * 3 + 0] = (Math.random() - 0.5) * 0.002; // velocity x
            velArray[i * 3 + 1] = (Math.random() - 0.5) * 0.002; // velocity y
            velArray[i * 3 + 2] = (Math.random() - 0.5) * 0.002; // velocity z
        }

        return { positions: posArray, velocities: velArray };
    }, [count]);

    // --------------------------
    // Create geometry
    // --------------------------
    const pointsGeo = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        return geo;
    }, [positions]);

    // --------------------------
    // Animate points
    // --------------------------
    useFrame(() => {
        const posAttr = ref.current.geometry.attributes.position;
        for (let i = 0; i < count; i++) {
            // Add tiny velocity for smooth floating
            posAttr.array[i * 3 + 0] += velocities[i * 3 + 0];
            posAttr.array[i * 3 + 1] += velocities[i * 3 + 1];
            posAttr.array[i * 3 + 2] += velocities[i * 3 + 2];

            // Optional: bounce back when exceeding bounds
            for (let axis = 0; axis < 3; axis++) {
                if (Math.abs(posAttr.array[i * 3 + axis]) > 5) {
                    velocities[i * 3 + axis] *= -1;
                }
            }
        }
        posAttr.needsUpdate = true;

        // Optional: slow rotation of entire cloud
        ref.current.rotation.y += 0.001 * 0.001;
    });

    return (
        <points ref={ref} geometry={pointsGeo}>
            <pointsMaterial
                transparent
                color={color}
                size={size}
                map={texture}
            // sizeAttenuation
            />
        </points>
    );
}

export default Stars