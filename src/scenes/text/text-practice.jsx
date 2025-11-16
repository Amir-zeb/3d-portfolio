import { MeshTransmissionMaterial, Text, Text3D } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";


const PracticeText = () => {

    return (
        <Canvas>
            <group position={[-6, 1.5, 0]}>
                {/* Small text */}
                <MyText
                    text='Hi, I am'
                />
            </group>
        </Canvas>
    );
}

const MyText = () => {

    return (
        <Text3D
            smooth={1} lineHeight={0.5} letterSpacing={-0.025}
            font={'/fonts/Montserrat_Regular.json'}
        >
            {`hello`}
            {/* {display} */}
            <meshStandardMaterial />
        </Text3D>
    );
}

export default PracticeText;