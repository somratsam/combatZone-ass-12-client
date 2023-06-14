import React, { useContext, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { app } from '../../firebase/firebase.config';
import {  createUserWithEmailAndPassword, getAuth,  updateProfile } from 'firebase/auth';
import { AuthContext } from '../AuthProviders';

const Registration = () => {
    const [confirmPassword, setConfirmPassword] = useState('');
    const { setUserAndName, setUserAndPhoto } = useContext(AuthContext);
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const location = useLocation();
    const { signInWithGoogle } = useContext(AuthContext)






    const from = location.state?.from || { pathname: '/' };


    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
          .then((result) => {
            const user = result.user;
            setUserAndName(user, user.displayName);
            
            // Check if the user has a photoURL and update the user's photo
            if (user.photoURL) {
              setUserAndPhoto(user, user.photoURL);
            }
            
            navigate(from, { replace: true });
          })
          .catch((error) => {
            console.log(error);
          });
      };
      


    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

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

        const auth = getAuth(app);

        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const createdUser = result.user;
                updateProfile(createdUser, { displayName: name, photoURL: photo })
                    .then(() => {
                        fetch('http://localhost:5000/users', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ name, email, photo }),
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                if (data.insertedId) {
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Registration Successful',
                                        showConfirmButton: false,
                                        timer: 1500,
                                    }).then(() => {
                                        navigate(from, { replace: true })
                                    });
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
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
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="name" name="name" placeholder="Your name" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Enter email" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Password" required />
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

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Photo URL</Form.Label>
                                <Form.Control type="text" name="photo" placeholder="photo url" required />
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
                                <Button variant="outline-success" onClick={handleGoogleSignIn}>
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
