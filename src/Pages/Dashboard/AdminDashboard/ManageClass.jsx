import { useEffect, useState } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import '../../Shared/Style.css';


const ManageClass = () => {
  const [classes, setClasses] = useState([]);
  const [showAll, setShowAll] = useState(false);

 
  useEffect(() => {
    // Fetch class data from MongoDB
    const fetchClasses = async () => {
      try {
        const response = await fetch('http://localhost:5000/manageClasses'); // Replace with your MongoDB API endpoint
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);


  const displayedAllClasses = showAll ? classes : classes.slice(0, 6);

  const handleSeeMore = () => {
    setShowAll(true);
  };

  const handleSeeLess = () => {
    setShowAll(false);
  };

  return (
    <div className="style" style={{ marginBottom: '-48px', paddingBottom: '200px' }}>
      <h1 className="text-center fw-semibold text-white" style={{ paddingTop: '130px', paddingBottom: '50px' }}>
        MANAGE CLASSES
      </h1>
      <Container>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {displayedAllClasses.map((classData) => (
            <div key={classData._id} className="col">
              <div className="card h-100 border-0">
                <img src={classData.classImage} className="card-img-top" alt={classData.name} />
                <div className="card-body text-white text-center" style={{ backgroundColor: '#13182a' }}>
                  <h5 className="card-title">{classData.className}</h5>
                  <h5 className="card-title">Instructor: {classData.instructorName}</h5>
                  <p className="card-text text-danger">Time: {classData.classTimePeriod}</p>
                  <h5 className="card-title">Available Seats: {classData.availableSeats}</h5>
                  <h5 className="card-title">Price: {classData.price}</h5>

                  <div className="d-flex justify-content-center">
                    <Button variant="outline-success my-3 text-white border-0 border-bottom" className="mx-2">Approve</Button>
                    <Button variant="outline-danger my-3 text-white border-0 border-bottom" className="mx-2">Deny</Button>
                    <Button variant="outline-primary my-3 text-white border-0 border-bottom" className="mx-2">Send Feedback</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


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

export default ManageClass;
