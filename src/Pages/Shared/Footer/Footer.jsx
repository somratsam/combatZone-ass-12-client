
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {

    const styles = {
        background: 'linear-gradient(rgba(19, 24, 42, 0.9), rgba(19, 24, 42, 0.9)), url("https://i.ibb.co/MMB4Qgj/man-5612736-1280.jpg")',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      };
      
      

    return (
        <footer className="mt-5  text-white" style={styles}>
            <Container className='mx-auto w-100'>
                <Row className='pt-4'>
                    <Col md={4} sm={6}>
                        <img src="https://i.ibb.co/xhM0hzM/0-0-removebg-preview.png" alt="" style={{ height: '40px', width: '40px' }} />
                        <span className="fw-bold" style={{ color: '#FF5722' }}>
                            Wonder Toy
                        </span>
                        <p className='text-start'>
                            <small>Action Figures: Immerse yourself in a world of adventure with our extensive collection of action figures. These highly detailed and poseable toys bring your favorite characters from movies, TV shows, comics, and video games to life</small>
                        </p>
                    </Col>
                    <Col md={4} sm={6}>
                        <h3>Contact Us</h3>
                        <p>
                            <strong>Email:</strong> <small>somratsam2@gmail.com</small> <br />
                            <strong>Phone:</strong> <small>+968 93876228</small> <br />
                            <strong>Address:</strong> <small>23 Main Street, California, USA</small>
                        </p>

                    </Col>
                    <Col md={4} sm={12}>
                        <h3>Follow Us</h3>
                        <ul className="social-icons d-flex  gap-3 list-unstyled">
                            <li>
                                <a className='text-decoration-none' href="https://www.facebook.com/profile.php?id=100004894309114" target="_blank" rel="noopener noreferrer">
                                    <FaFacebookF />
                                </a>
                            </li>
                            <li>
                                <a className='text-decoration-none' href="https://twitter.com/AbdulAz78635266">
                                    <FaTwitter />
                                </a>
                            </li>
                            <li>
                                <a className='text-decoration-none' href="https://www.instagram.com/sanjusomrat/">
                                    <FaInstagram />
                                </a>
                            </li>
                        </ul>
                        <Form>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Let&#39;s Stay Connected</Form.Label>
                                <Row>
                                    <Col xs={8}>
                                        <Form.Control type="email" placeholder="Enter your email" />
                                    </Col>
                                    <Col xs={4}>
                                        <Button variant="outline-info"
                                            className="rounded-5 text-light border-0"
                                            type="submit">Subscribe</Button>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Form>
                        <p className='py-3'>Terms Of Service | Privacy Policy | Refund Policy | Accessibility Policy</p>
                    </Col>
                </Row>
                <p className="text-center py-4">
                    Copyright &copy; 2023 Wonder Toy. All rights reserved.
                </p>
            </Container>
        </footer>
    );
};

export default Footer;
