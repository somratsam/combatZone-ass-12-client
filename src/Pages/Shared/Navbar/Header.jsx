import React, { useContext, useState, useEffect } from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProviders';
import { FaUserCircle } from 'react-icons/fa';

import './Header.css'; // Import the CSS file for styling

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleLogout = () => {
    logout()
      .then()
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
      
        setVisible(
          (prevScrollPos > currentScrollPos && currentScrollPos > 70) ||
          currentScrollPos < 10
        );
      
        setPrevScrollPos(currentScrollPos);
      };
      
      

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <Navbar
      expand="lg"
      className={`navbar-sticky ${visible ? '' : 'navbar-hidden'}`}
      variant="dark bg-opacity-25 text-white"
      bg="dark"
      style={{ zIndex: 10, width: '100%' }}
    >
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
            {user && (
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link text-light">
                  Dashboard
                </Link>
              </li>
            )}
            <li className="nav-item">
              {user && user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  style={{
                    height: '2rem',
                    width: '2rem',
                    borderRadius: '50%',
                  }}
                />
              ) : (
                <FaUserCircle
                  style={{
                    fontSize: '1.5rem',
                    paddingLeft: '5px',
                    cursor: 'pointer',
                    color: 'white',
                  }}
                />
              )}

              {user ? (
                <Button variant="border-0 text-light" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Link to="/login">
                  <Button variant="border-0 text-light pr-4">Login</Button>
                </Link>
              )}
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
