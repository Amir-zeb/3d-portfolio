import { Col, Container, Row } from "react-bootstrap";
import '../../styles/skills.scss';
import { sectionIds } from "../../constants";
import SkillsCanvas from "../../scenes/SkillsCanvas";
import { useEffect, useRef, useState } from "react";
import { skills } from "../../data/data";


const Skills = () => {
    return (
        <>
            <div id={sectionIds.skills} className="visually-hidden" />
            <section className="skills sec_pd">
                <Container>
                    <Row>
                        <Col xs={12}>
                            <h2 className="text-center text_secondarys mb-5">Skills</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="flex_container">
                                {skills.map((x, i) => {
                                    return <h4 key={i}>{x.title}</h4>
                                })}
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