import { Col, Container, Row } from "react-bootstrap";
import '../../styles/hero.scss';
import { HeroCanvas } from "../../scenes";

const Hero = () => {
    return (
        <section className="hero">
            <HeroCanvas />
        </section>
    );
}

export default Hero;