import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Handle login logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    const styles = {
        background: 'linear-gradient(rgba(19, 24, 42, 0.9), rgba(19, 24, 42, 0.9)), url("https://i.ibb.co/MMB4Qgj/man-5612736-1280.jpg")',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    return (
        <div style={{ ...styles, marginBottom: '-48px', paddingBottom: '100px', paddingTop: '100px' }}>
            <Container>
                <Row style={{ justifyContent: 'center' }}>
                    <Col className='border p-4 card text-white shadow' style={{ backgroundColor: '#13182a' }} md={6} sm={8}>
                        <h2>Login</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="email">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password:</Form.Label>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Form.Control
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                    <span
                                        style={{
                                            cursor: 'pointer',
                                            marginLeft: '-25px',
                                            zIndex: '1',
                                            position: 'relative',
                                            color: 'black',
                                            padding: '5px',
                                        }}
                                        onClick={handlePasswordVisibility}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </Form.Group>


                            <Button variant="success my-3" type="submit">
                                Login
                            </Button>
                        </Form>

                        <p style={{ textAlign: 'center' }}>
                            Do not have an account? <Link to='/register'>Registration</Link>
                        </p>

                        <div className='text-center'>
                            <Button variant="outline-success">
                                Sign in with Google <FaGoogle />
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;
