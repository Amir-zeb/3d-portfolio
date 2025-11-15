import { useFrame } from "@react-three/fiber";
import { folder, useControls } from "leva";
import { useRef } from "react";

const SphereShape = ({ args, position, rotation = [0, 0, 0], color: _color, folderName = 'cube', ...props }) => {
    const ref = useRef()
    const cube = useControls({
        [`${folderName}`]: folder({
            color: _color,
            wireframe: false
        })
    })
    const { color, wireframe } = cube

    // --------------------------
    // Continuous rotation
    // --------------------------
    useFrame((state) => {
        if (!ref.current) return;
        const t = state.clock.elapsedTime;

        const offset = Math.sin(t) * 0.1;

        ref.current.position.x = position[0] + offset;  // rotate around X
        ref.current.position.y = position[1] + offset;  // rotate around Y
    });

    return (
        <mesh ref={ref} position={position} rotation={rotation} castShadow >
            <sphereGeometry args={args} />
            <meshStandardMaterial color={color} wireframe={wireframe}
                emissive={color}
                emissiveIntensity={0.05}
                {...props}
            />
        </mesh>
    );
}

export default SphereShape