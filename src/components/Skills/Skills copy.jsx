import { Col, Container, Row } from "react-bootstrap";
import '../../styles/skills.scss';
import { sectionIds } from "../../constants";
import SkillsCanvas from "../../scenes/SkillsCanvas";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

const Skills = () => {
    const container = useRef();
    const [size, setSize] = useState({ cols: 0, rows: 0 });

    function parametric(progress) {
        const sqt = progress * progress
        return sqt / (2 * (sqt - progress) + 1)
    }

    useEffect(() => {
        function calcGrid() {
            const rect = container.current.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;

            const boxSize = 50;

            const cols = Math.ceil(w / boxSize);
            const rows = Math.ceil(h / boxSize);

            setSize({
                cols,
                rows
            });

            // Set CSS variables for grid
            document.documentElement.style.setProperty('--grid-cols', cols);
            document.documentElement.style.setProperty('--grid-rows', rows);
        }

        calcGrid();
        window.addEventListener("resize", calcGrid);

        return () => window.removeEventListener("resize", calcGrid);
    }, []);

    // GSAP animation
    useGSAP(() => {
        gsap.from('.box_container .item', {
            y: 40,
            repeat: Infinity,
            duration: 2,
            ease: parametric,
            opacity: 0.1,
            scale: 0.5,
            stagger: {
                amount: 4,
                grid: [size.cols, size.rows],
                yoyo: true,
                repeat: -1,
                from: "center"
            },
        });
    }, { scope: container });

    return (
        <>
            <div id={sectionIds.skills} className="visually-hidden" />
            <section className="skills sec_pd" ref={container}>
                <Container>
                    <Row>
                        <Col xs={12}>
                            <h2 className="text-center text_secondarys mb-5">Skills</h2>
                        </Col>
                        <Col className="position-relative">

                        </Col>
                    </Row>
                </Container>
                {/* <div className="box_container">
                    {Array(size.cols * size.rows).fill('').map(x => <div className="item" />)}
                </div> */}
                {/* <SkillsCanvas /> */}
            </section>
        </>
    );
}

const Skillsold = () => {
    const container = useRef();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    function parametric(progress) {
        const sqt = progress * progress
        return sqt / (2 * (sqt - progress) + 1)
    }

    useGSAP(() => {
        // gsap code here...
        gsap.from('.box_container .item', {
            y: 40,
            repeat: Infinity,
            duration: 2,
            ease: parametric,
            opacity: 0.1,
            scale: 0.5,
            stagger: {
                amount: 4,
                grid: [10, 10],
                yoyo: true,
                repeat: -1,
                // from: 'random',
                from: 'center'
            }
        });
    }, { scope: container });
    return (
        <>
            <div id={sectionIds.skills} className="visually-hidden" />
            <section className="skills sec_pd" ref={container}>
                <Container>
                    <Row>
                        <Col xs={12}>
                            <h2 className="text-center mb-5">Skills</h2>
                        </Col>
                        <Col className="position-relative">
                            <div className="box_container">
                                {Array(100).fill('').map(x => <div className="item" />)}
                            </div>
                        </Col>
                    </Row>
                </Container>
                {/* <SkillsCanvas /> */}
            </section>
        </>
    );
}

export default Skills;