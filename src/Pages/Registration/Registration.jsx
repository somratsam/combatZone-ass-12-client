import  { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handlePhotoURLChange = (event) => {
    setPhotoURL(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Password validation
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setPasswordError('Password must contain at least one capital letter.');
      return;
    }

    if (!/[!@#$%^&*]/.test(password)) {
      setPasswordError('Password must contain at least one special character.');
      return;
    }

    // Passwords match validation
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    // Clear password error if validation passes
    setPasswordError('');

    // Handle registration logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
    console.log('Photo URL:', photoURL);

    // Display sweet alert after successful registration
    Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        showConfirmButton: false,
        timer: 1500
    });
  };

  const styles = {
    background:
      'linear-gradient(rgba(19, 24, 42, 0.9), rgba(19, 24, 42, 0.9)), url("https://i.ibb.co/MMB4Qgj/man-5612736-1280.jpg")',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div
      style={{
        ...styles,
        marginBottom: '-48px',
        paddingBottom: '100px',
        paddingTop: '100px',
        color: 'white',
      }}
    >
      <Container>
        <Row style={{ justifyContent: 'center' }}>
          <Col
            className="border p-4 card text-white shadow"
            style={{ backgroundColor: '#13182a' }}
            md={6}
            sm={8}
          >
            <h2>Registration</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
              </Form.Group>

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
                <Form.Control
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="photoURL">
                <Form.Label>Photo URL:</Form.Label>
                <Form.Control
                  type="text"
                  value={photoURL}
                  onChange={handlePhotoURLChange}
                  required
                />
              </Form.Group>

              {passwordError && (
                <p style={{ color: 'red', marginBottom: '10px' }}>
                  {passwordError}
                </p>
              )}

              <Button variant="success my-3" type="submit">
                Register
              </Button>

              <p style={{ textAlign: 'center' }}>
                Already have an account? <Link to="/login">Login</Link>
              </p>

              <div className="text-center">
                <Button variant="outline-success">
                  Sign in with Google <FaGoogle />
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Registration;
