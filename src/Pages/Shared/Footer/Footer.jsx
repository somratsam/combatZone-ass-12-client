
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
        <footer className="mt-5  text-white" style={{...styles,  marginBottom: '-30px'}}>
            <Container className='mx-auto w-100'>
                <Row className='pt-4'>
                    <Col md={4} sm={6}>
                       
                        <h2 className="fw-bold text-danger mb-4" >
                            COMBAT ZONE
                        </h2>
                        <p className='text-start'>
                            Fight School has specialized in martial arts since 1986 and has one of the most innovative programs in the nation.
                        </p>
                    </Col>
                    <Col md={4} sm={6}>
                    <h2 className='fw-bold mb-4'>Recent posts</h2>
                    <div style={{ lineHeight: '.5' }}>
                    <p>Iain Aber Karate Seminar in Los Angeles</p>
                    <strong className='text-danger '>MAY 11, 2023</strong>
                    </div>
                   <div className='my-4' style={{ lineHeight: '.5' }}>
                   <p>Knee Pain in Martial Arts: Causes and Remedies</p>
                    <strong className='text-danger'>JUNE 7, 2023</strong>
                   </div>
                       <div style={{ lineHeight: '.5' }}>
                       <p>somratsam2@gmail.com</p>
                       <p>+968 93876228</p>
                       <p> 23 Main Street, California, USA</p>
                       </div>
                        

                    </Col>
                    <Col md={4} sm={12}>
                        <h2 className='text-danger fw-bold'>Follow Us</h2>
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
                                <h3>Subscribe Now</h3>
                                <Row>
                                    <Col xs={8}>
                                        <Form.Control  type="email" placeholder="Enter your email" />
                                    </Col>
                                    <Col xs={4}>
                                        <Button variant="outline-danger text-white border-0 border-bottom mx-2"
                                            type="submit">Subscribe</Button>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Form>
                        <p className='py-3'>Terms Of Service | Privacy Policy | Refund Policy | Accessibility Policy</p>
                    </Col>
                </Row>
                <p className="text-center py-4">
                    Copyright &copy; 2023 Combat Zone. All rights reserved.
                </p>
            </Container>
        </footer>
    );
};

export default Footer;
