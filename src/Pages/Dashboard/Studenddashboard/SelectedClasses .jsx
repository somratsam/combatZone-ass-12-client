import { Container, Table, Button } from "react-bootstrap";

import axios from "axios";
import { Link } from "react-router-dom";
import useFetchSelectedClasses from "../../Shared/useFetchSelectedClasses ";


const SelectedClasses = () => {
  
  
  

    const { selectedClasses, setSelectedClasses } = useFetchSelectedClasses();


  const handleDeleteClass = async (classId) => {
    try {
      // Delete the selected class from the backend API
      await axios.delete(`http://localhost:5000/selectedClasses/${classId}`); // Replace with your API endpoint for deleting selected classes

      // Remove the deleted class from the local state
      setSelectedClasses((prevSelectedClasses) =>
        prevSelectedClasses.filter((classData) => classData._id !== classId)
      );
    } catch (error) {
      console.error("Error deleting selected class:", error);
    }
  };

  

  return (
    <div className="style" style={{ marginBottom: "-48px", paddingBottom: "200px" }}>
      <h1 className="text-center fw-semibold text-white" style={{ paddingTop: "130px", paddingBottom: "50px" }}>
        My Selected Classes
      </h1>
      <Container >
        {selectedClasses.length === 0 ? (
          <p className="text-center text-white">You haven't booked any classes yet.</p>
        ) : (
          <Table  striped bordered hover responsive>
            <thead>
              <tr>
                <th>Class Image</th>
                <th>Class Name</th>
                <th>Instructor</th>
                <th>Time</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {selectedClasses.map((classData) => (
                <tr key={classData._id}>
                    <td>
                  <img className="rounded-circle" src={classData.image} alt={classData.name} width="90" />
                </td>
                  <td>{classData.name}</td>
                  <td>{classData.instructorName}</td>
                  <td>{classData.classTimePeriod}</td>
                  <td>{classData.price}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      className="mr-2"
                      onClick={() => handleDeleteClass(classData._id)}
                    >
                      Delete
                    </Button>


                    <Link to='/dashboard/payment'>
                      <Button variant="outline-primary">Pay</Button>
                    </Link>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
};

export default SelectedClasses;
