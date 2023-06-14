import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useContext, useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { app } from '../../firebase/firebase.config';
import { AuthContext } from '../AuthProviders';
import Swal from 'sweetalert2';

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { signIn, setUserAndName, setUserAndPhoto } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();



    const from = location.state?.from || { pathname: '/' };


    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();



    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        // Handle login logic here
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const loggedUser = result.user;
                const name = loggedUser.displayName;
                const photoURL = loggedUser.photoURL;
                setUserAndName(loggedUser, name, photoURL);
                setErrorMessage('');
                navigate(from, { replace: true })
            })
            .catch((error) => {
                setErrorMessage('Invalid email or password');
                console.log(error);
            });
    };
    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
          .then((result) => {
            const user = result.user;
            setUserAndName(user, user.displayName);
            
            // Check if the user has a photoURL and update the user's photo
            if (user.photoURL) {
              setUserAndPhoto(user, user.photoURL);
            }
            
            setErrorMessage('');
            
            fetch('http://localhost:5000/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name: user.displayName, email: user.email, photo: user.photoURL }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.error) {
                  setErrorMessage(data.error);
                } else {
                  setErrorMessage('');
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Login Successful',
                    showConfirmButton: false,
                    timer: 1500,
                  }).then(() => {
                    navigate(from, { replace: true });
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

                            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Enter email" required />
                            </Form.Group>


                            <Form.Group controlId="password">
                                <Form.Label>Password:</Form.Label>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Form.Control type="password" name="password" placeholder="Password" required />
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
                            <Button variant="outline-success" onClick={handleGoogleLogin}>
                                Sign in with Google  <FaGoogle />
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;
