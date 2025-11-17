import { Col, Container, Row } from "react-bootstrap";
import { about } from "../../data/data";
import { sectionIds } from "../../constants";
import '../../styles/about.scss';

const About = () => {
    return (
        <>
            <div id={sectionIds.about} className="visually-hidden"></div>
            <section className="about sec_pd">
                <Container>
                    <Row>
                        <Col xs={12}>
                            <h2 className="text-center mb-5">About Me</h2>
                        </Col>
                        <Col>
                            <p className="">{about.para[0]}</p>
                            <p className="">{about.para[1]}</p>
                            <p className="">{about.para[2]}</p>
                            <p className="">{about.para[4]}</p>
                            <ul>
                                {about.recentTechnologies.map((x, i) => {
                                    return <li class="text-white" key={i}>{x}</li>
                                })}
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default About;