import { Col, Container, Row } from "react-bootstrap";
import { sectionIds } from "../../constants";
import '../../styles/projects.scss';
import { projects } from "../../data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import StarsCanvas from "../../scenes/StarsCanvas";

const Projects = () => {
    return (
        <>
            <div id={sectionIds.projects} className="visually-hidden"></div>
            <section className="projects sec_pd">
                <Container>
                    <Row>
                        <Col xs={12}>
                            <h2 className="text-center mb-5">Projects</h2>
                        </Col>
                        <Col>
                            <div className="projects_list_container">
                                {
                                    projects.map((item, index) => <Card v={item} key={index} />)
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default Projects;


const Card = ({ v }) => {
    return (
        <div className="project_card">
            <div className="inner">
                <div className="img_transition">
                    <div className="wrapper">
                        <img src={v.image} className="img-fluid" alt="image.png" />
                    </div>
                </div>
                <div className='caps'>
                    <h5 className="title">
                        <span>{v.project}</span>
                        {v.title}
                    </h5>
                    <p className='des'>{v.des}</p>
                    <ul>
                        {v.tags.map((v, i) => {
                            return <li key={i}><small>{v}</small></li>
                        })}
                    </ul>
                    {v.link && <a href={v.link} target='_blank' rel='noreferrer'>
                        <FontAwesomeIcon icon={faEye} />
                    </a>}
                </div>
            </div>
        </div>
    );
}