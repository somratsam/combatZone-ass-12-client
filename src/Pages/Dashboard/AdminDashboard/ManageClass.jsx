import { useEffect, useState } from 'react';
import { Container, Button, Row, Col, Modal, Form } from 'react-bootstrap';

// import useAuth from '../../Shared/useAuth';
import '../../Shared/Style.css';
import useAxiosSecure from '../../Shared/useAxiosSecure';

const ManageClass = () => {
  const [classes, setClasses] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [axiosSecure] = useAxiosSecure();
  // const { user } = useAuth();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axiosSecure.get('/manageClasses');
        setClasses(response.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, [axiosSecure]);

  const displayedAllClasses = showAll ? classes : classes.slice(0, 6);

  const handleSeeMore = () => {
    setShowAll(true);
  };

  const handleSeeLess = () => {
    setShowAll(false);
  };

  const handleApprove = async (classId) => {
    try {
      await axiosSecure.patch(`/manageClasses/approve/${classId}`, { status: 'approved' });
      const updatedClasses = classes.map((classData) => {
        if (classData._id === classId) {
          return { ...classData, status: 'approved' };
        }
        return classData;
      });
      setClasses(updatedClasses);
    } catch (error) {
      console.error('Error approving class:', error);
    }
  };

  const handleDeny = async (classId) => {
    try {
      await axiosSecure.patch(`/manageClasses/deny/${classId}`);
      const updatedClasses = classes.map((classData) => {
        if (classData._id === classId) {
          return { ...classData, status: 'denied' };
        }
        return classData;
      });
      setClasses(updatedClasses);
      handleOpenFeedbackModal(classId); // Open feedback modal after denying the class
    } catch (error) {
      console.error('Error denying class:', error);
    }
  };


  const handleOpenFeedbackModal = (classId) => {
    setSelectedClass(classId);
    setShowModal(true);
  };

  const handleCloseFeedbackModal = () => {
    setSelectedClass(null);
    setFeedback('');
    setShowModal(false);
  };

  const handleSendFeedback = async () => {
    try {
      await axiosSecure.post(`/manageClasses/feedback/${selectedClass}`, { feedback });
      const updatedClasses = classes.map((classData) => {
        if (classData._id === selectedClass) {
          return { ...classData, feedback };
        }
        return classData;
      });
      setClasses(updatedClasses);
      handleCloseFeedbackModal();
    } catch (error) {
      console.error('Error sending feedback:', error);
    }
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
              <div className="card h-100 w-100 border-0">
                <img src={classData.classImage} className="card-img-top" alt={classData.name} />
                <div className="card-body text-white text-center" style={{ backgroundColor: '#13182a' }}>
                  <h5 className="card-title">{classData.className}</h5>
                  <h5 className="card-title">Instructor: {classData.instructorName}</h5>
                  <p className="card-text text-danger">Time: {classData.classTimePeriod}</p>
                  <h5 className="card-title">Available Seats: {classData.availableSeats}</h5>
                  <h5 className="card-title">Price: {classData.price}</h5>

                  {classData.status === 'pending' && (
                    <div className="d-flex justify-content-center">
                      <Button variant="outline-success my-3 text-white border-0 border-bottom mx-2" onClick={() => handleApprove(classData._id)}>Approve</Button>
                      <Button variant="outline-danger my-3 text-white border-0 border-bottom mx-2" onClick={() => handleDeny(classData._id)}>Deny</Button>
                      <Button variant="outline-primary my-3 text-white border-0 border-bottom mx-2" onClick={() => handleOpenFeedbackModal(classData._id)}>Send Feedback</Button>
                    </div>
                  )}

                  {classData.status !== 'pending' && (
                    <div className="d-flex justify-content-center">
                      <Button variant="outline-secondary my-3 text-white border-0 border-bottom mx-2" disabled>Approved</Button>
                      <Button variant="outline-secondary my-3 text-white border-0 border-bottom mx-2" disabled>Denied</Button>
                      <Button variant="outline-secondary my-3 text-white border-0 border-bottom mx-2" disabled>Send Feedback</Button>
                    </div>
                  )}
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

        <Modal show={showModal} onHide={handleCloseFeedbackModal}>
          <Modal.Header closeButton>
            <Modal.Title>Send Feedback</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="feedbackTextarea">
              <Form.Label>Feedback:</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseFeedbackModal}>Cancel</Button>
            <Button variant="primary" onClick={handleSendFeedback}>Send</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default ManageClass;
