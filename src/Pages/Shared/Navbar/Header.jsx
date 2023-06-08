import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Navbar expand="lg" className=" bg-dark bg-opacity-10" style={{position: 'fixed', zIndex: 10, width: '100%'}}>
            <Container>
                <Navbar.Brand className="text-light">
                    <Link to="/" className="navbar-brand text-light">
                        PIXEL PERFECT
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav">
                    <ul className="navbar-nav mx-auto justify-content-center">
                        <li className="nav-item">
                            <Link to="/" className="nav-link text-light">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/instructors" className="nav-link text-light">
                                Instructors
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/classes" className="nav-link text-light">
                                Classes
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-link text-light">
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                    
                    <Link to="/get-started" className="btn btn-primary">
                        Get Started
                    </Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
