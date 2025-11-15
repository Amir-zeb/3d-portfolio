import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

const IntroText = () => {

    return (
        <group position={[-6, 1.5, 0]}>
            {/* Small text */}
            <TypewriterText
                fontSize={0.2}
                color="white"
                anchorX="left"
                anchorY="middle"
                billboard
                castShadow receiveShadow
                text='Hi, I am'
                timeout={0}
                />

            {/* Large Name */}
            <TypewriterText
                position={[0, -0.5, 0]}
                fontSize={1}
                color="#ff80cc"
                anchorX="left"
                anchorY="middle"
                billboard
                castShadow receiveShadow
                text='Amir Zeb'
                timeout={1000}
                // font="/fonts/Inter-Bold.woff"   // optional custom font
                />

            {/* Medium text */}
            <TypewriterText
                position={[0, -1.5, 0]}
                fontSize={0.6}
                color="white"
                anchorX="left"
                anchorY="middle"
                billboard
                castShadow receiveShadow
                text='Full Stack Developer'
                timeout={2000}
            />
        </group>
    );
}

const TypewriterText = ({ text, timeout,...props }) => {
    const [display, setDisplay] = useState("");

    useEffect(() => {
        setTimeout(() => {
            let i = 0;
            const interval = setInterval(() => {
                setDisplay(text.slice(0, i));
                i++;
                if (i > text.length) clearInterval(interval);
            }, 80);
        }, timeout);
    }, []);

    return (
        <Text {...props}>
            {display}
        </Text>
    );
}

export default IntroText;