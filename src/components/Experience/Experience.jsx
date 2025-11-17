import { Col, Container, Row } from "react-bootstrap";
import '../../styles/experience.scss';
import { experience } from "../../data/data";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VerticalTimeline, VerticalTimelineElement } from "../VerticalTimeline/VerticalTimeline";
import { sectionIds } from "../../constants";

const Experience = () => {
    return (
        <>
            <div className="visually-hidden" id={sectionIds.experience}></div>
            <section className="experience sec_pd">
                <Container>
                    <Row>
                        <Col xs={12}>
                            <h2 className="text-center mb-5">Experience</h2>
                        </Col>
                        <Col>
                            <VerticalTimeline>
                                {experience.map((item, index) => {
                                    return <VerticalTimelineElement key={index} item={item} />
                                })}
                            </VerticalTimeline>
                        </Col>
                    </Row>
                </Container>
            </section >
        </>
    );
}

export default Experience;

