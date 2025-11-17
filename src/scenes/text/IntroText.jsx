import { Environment, GradientTexture, Text3D } from "@react-three/drei";
import { useEffect, useState } from "react";

const IntroText = () => {

    return (
        <group position={[-6.5, 1.5, 3]}>
            {/* Small text */}
            <MyText
                position={[0, 0, 0]}
                color='#0a192f'
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
                color="#64ffda"
                text='Full Stack Developer'
                timeout={2000}
            />
        </group>
    );
}

const MyText = ({ text, position, timeout = 0, fontSize, color }) => {
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
            curveSegments={125}
            brevelSegments={10}
            bevelEnabled
            bevelSize={0.02}
            bevelThickness={0.01}
            height={.1}
            lineHeight={1}
            letterSpacing={0.1}
            font={'/fonts/Montserrat_Regular.json'}
        >
            {display}
            <meshStandardMaterial
                // color={color}
                // metalness={0.5}
                // roughness={0.2}
                // transmission={1}
                // ior={2.33}
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