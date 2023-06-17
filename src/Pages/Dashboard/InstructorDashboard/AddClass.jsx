import { useContext, useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../../AuthProviders';

const AddClass = () => {
  const [className, setClassName] = useState('');
  const [classImage, setClassImage] = useState('');
  const [availableSeats, setAvailableSeats] = useState('');
  const [price, setPrice] = useState('');
  const { user } = useContext(AuthContext);

  
  const instructor = {
    displayName: user?.displayName || '',
    email: user?.email || ''
  };

  useEffect(() => {
    setClassName('');
    setClassImage('');
    setAvailableSeats('');
    setPrice('');
  }, [user]);

  const handleAddClass = async (e) => {
    e.preventDefault();
  
    const classData = {
      className,
      classImage,
      availableSeats: parseFloat(availableSeats),
      price: parseFloat(price),
      status: 'pending',
      instructorName: instructor.displayName,
      instructorEmail: instructor.email
      
    };
  
    try {
     
      const response = await axios.post('http://localhost:5000/classes', classData);
  
      
      console.log('Class added successfully:', response.data);
      
      setClassName('');
      setClassImage('');
      setAvailableSeats('');
      setPrice('');
    } catch (error) {
      // Handle the error 
    }
  };
  

  return (
    <div className="container" style={{paddingTop: '100px', paddingBottom: '30px'}}>
      <h2>Add Class</h2>
      <Form onSubmit={handleAddClass}>
        <Form.Group controlId="instructorName">
          <Form.Label>Instructor Name:</Form.Label>
          <Form.Control type="text" value={instructor.displayName} readOnly />
        </Form.Group>

        <Form.Group controlId="instructorEmail">
          <Form.Label>Instructor Email:</Form.Label>
          <Form.Control type="email" value={instructor.email} readOnly />
        </Form.Group>

        <Form.Group controlId="className">
          <Form.Label>Class Name:</Form.Label>
          <Form.Control
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="classImage">
          <Form.Label>Class Image:</Form.Label>
          <Form.Control
            type="text"
            value={classImage}
            onChange={(e) => setClassImage(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="availableSeats">
          <Form.Label>Available Seats:</Form.Label>
          <Form.Control
            type="number"
            value={availableSeats}
            onChange={(e) => setAvailableSeats(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price:</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default AddClass;
