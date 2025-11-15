import { Container } from 'react-bootstrap';
import '../../styles/header.scss';
import { sectionIds } from '../../constants';
import { useEffect, useState } from 'react';

const Header = () => {
    const [active, setActive] = useState('top');

    const activeSection = (name) => {
        setActive(name)
    }

    return (
        <header className='py-2'>
            <div id={sectionIds.top} className='visually-hidden'></div>
            <Container>
                <div className='__inner d-flex align-items-center justify-content-between'>
                    <a className='brand target_anchor' href={`#${sectionIds.top}`} onClick={() => activeSection(sectionIds.top)}>
                        <div className='__wrapper'>
                            <h2>Amir</h2>
                        </div>
                    </a>
                    <Nav active={active} activeSection={activeSection} />
                </div>
            </Container>
        </header>
    );
}

const Nav = ({ active, activeSection = () => { } }) => {
    return (
        <nav>
            <ul className='d-flex gap-2 list-unstyled m-0 p-0'>
                <li>
                    <NavButton isActive={active === sectionIds.about} title='About' id={sectionIds.about} activeSection={() => activeSection(sectionIds.about)}
                    />
                </li>
                <li>
                    <NavButton isActive={active === sectionIds.experience} title='Experience' id={sectionIds.experience}
                        activeSection={() => activeSection(sectionIds.experience)}
                    />
                </li>
                <li>
                    <NavButton isActive={active === sectionIds.skills} title='Skills' id={sectionIds.skills}
                        activeSection={() => activeSection(sectionIds.skills)}
                    />
                </li>
                <li>
                    <NavButton isActive={active === sectionIds.projects} title='Projects' id={sectionIds.projects}
                        activeSection={() => activeSection(sectionIds.projects)}
                    />
                </li>
                <li>
                    <NavButton isActive={active === sectionIds.contact} title='Contact' id={sectionIds.contact}
                        activeSection={() => activeSection(sectionIds.contact)}
                    />
                </li>
            </ul>
        </nav>
    )
}

const NavButton = ({ title = '', id, isActive = false, activeSection = () => { }, ...props }) => {
    return (
        <a className={`__nav_link ${isActive ? 'active' : ''}`} onClick={activeSection} href={`#${id}`} {...props}>{title}</a>
    )
}

export default Header;