import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';



const PopularInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await fetch('https://pixel-perfact-server.vercel.app/instructors');
        const data = await response.json();
        setInstructors(data);
      } catch (error) {
        console.error('Error fetching instructors:', error);
      }
    };

    fetchInstructors();
  }, []);

  const styles = {
    background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://i.ibb.co/hfKLdX4/pexels-cottonbro-studio-7792245.jpg")',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const displayedInstructors = showAll ? instructors : instructors.slice(0, 3);

  const handleSeeMore = () => {
    setShowAll(true);
  };

  const handleSeeLess = () => {
    setShowAll(false);
  };

  return (
    <div style={{ ...styles, marginBottom: '-48px', paddingBottom: '70px' }}>
      <h1 className='text-center fw-semibold text-white ' style={{ paddingTop: '130px', paddingBottom: '50px' }}>POPULAR INSTRUCTORS</h1>
      <Container>
        <Row className="row-cols-1 row-cols-md-3 g-4">
          {displayedInstructors.map((instructor) => (
            <Col key={instructor._id}>
              <Card className='border-0'>
                <Card.Img variant="top" src={instructor.image} alt={instructor.name} />
                <Card.Body className='text-center text-white' style={{ backgroundColor: '#13182a' }}>
                  <Card.Title>{instructor.name}</Card.Title>
                  <Card.Text>Number of Students: {instructor.enrollmentCount}</Card.Text>
                  <Card.Text className='text-danger text-uppercase'>{instructor.martialArts} Instructor</Card.Text>
                  <Card.Text>{instructor.email}</Card.Text>
                 
                  <div className=''>
                    <Card.Link href={instructor.socialLinks.facebook} target="_blank" className='text-white opacity-75'>
                      <FaFacebookF></FaFacebookF>
                    </Card.Link>
                    <Card.Link href={instructor.socialLinks.twitter} target="_blank" className='text-white opacity-75'>
                      <FaTwitter></FaTwitter>
                    </Card.Link>
                    <Card.Link href={instructor.socialLinks.instagram} target="_blank" className='text-white opacity-75'>
                      <FaInstagram></FaInstagram>
                    </Card.Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {showAll ? (
          <Row className="mt-4">
            <Col className="text-center">
              <Button variant="outline-danger my-3 text-white border-0 border-bottom" onClick={handleSeeLess}>See Less</Button>
            </Col>
          </Row>
        ) : (
          <Row className="mt-4">
            <Col className="text-center">
              <Button variant="outline-danger my-3 text-white border-0 border-bottom" onClick={handleSeeMore}>See More</Button>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default PopularInstructors;