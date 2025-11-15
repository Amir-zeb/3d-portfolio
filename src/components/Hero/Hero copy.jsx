import { Col, Container, Row } from "react-bootstrap";
import '../../styles/hero.scss';
import { HeroCanvas } from "../../scenes";

const Hero = () => {
    return (
        <section className="hero">
            <Container>
                <Row>
                    <Col>
                        <HeroCanvas />
                        <div className="hero_caption">
                            <p className="p-0 m-0">Hi, I am</p>
                            <h2>Amir Zeb</h2>
                            <h3>Full Stack Developer</h3>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Hero;