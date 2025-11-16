import { GradientTexture, Text3D } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";

const IntroText = () => {

    return (
        <group position={[-6, 1.5, 0]}>
            {/* Small text */}
            <MyText
                position={[0, 0, 0]}
                color="white"
                text='Hi, I am'
                fontSize={0.4}
                timeout={0}
            />

            {/* Large Name */}
            <MyText
                position={[0, -1, 0]}
                fontSize={0.6}
                color="#ff80cc"
                text='Amir Zeb'
                timeout={1000}
            />

            {/* Medium text */}
            <MyText
                position={[0, -1.5, 0]}
                fontSize={0.3}
                color="white"
                text='Full Stack Developer'
                timeout={2000}
            />
        </group>
    );
}

const MyText = ({ text, position, timeout = 0, fontSize, ...props }) => {
    const [display, setDisplay] = useState("");

    useEffect(() => {
        setTimeout(() => {
            let i = 0;
            const interval = setInterval(() => {
                setDisplay(text.slice(0, i) + '|');
                i++;
                if (i > text.length) {
                    setDisplay(text)
                    clearInterval(interval)
                };
            }, 80);
        }, timeout);
    }, []);

    return (
        <Text3D
            position={position}
            size={fontSize}
            curveSegments={24}
            brevelSegments={1}
            bevelEnabled
            bevelSize={0.03}
            bevelThickness={0.01}
            height={.1}
            lineHeight={0.9}
            letterSpacing={0.1}
            font={'/fonts/Montserrat_Regular.json'}
        >
            {display}
            <meshStandardMaterial
                roughness={0.2}
            >
                <GradientTexture
                    stops={[0, 1]} // As many stops as you want
                    // colors={['white', 'hotpink']} // Colors need to match the number of stops
                    colors={['#64ffda', '#0a192f']} // Colors need to match the number of stops
                // size={1024} // Size is optional, default = 1024
                />
            </meshStandardMaterial>
        </Text3D>
    );
}

export default IntroText;