import { sectionIds } from "../../constants";
import GlobeCanvas from "../../scenes/GlobeCanvas";
import '../../styles/contact.scss';
import { Col, Container, Row, Button } from "react-bootstrap";

const Contact = () => {
    return (
        <>
            <div id={sectionIds.contact} className="visually-hidden" />
            <section className="contact sec_pd">
                <div className="position-absolute top-50 start-50 translate-middle-x z-1">
                    <Container>
                        <Row>
                            <Col>
                                <h3>Get In Touch</h3>
                                <p>I’m currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I’ll try my best to get back to you!</p>
                                <Button type='button'>Say Hello</Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <GlobeCanvas />
            </section>
        </>
    );
}

export default Contact;