import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { AuthContext } from '../../AuthProviders';

const ClassesList = () => {
  const [classes, setClasses] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/myClasses?email=${user?.email}`);
        setClasses(response.data);
        console.log(response.data);
      } catch (error) {
        // Handle the error if needed
      }
    };

    if (user) {
      fetchClasses();
    }
  }, [user]);

  const handleUpdateFeedback = async (classId, feedback) => {
    try {
      await axios.put(`http://localhost:5000/classes/${classId}`, { feedback });
      // Update the classes state with the updated feedback
      setClasses((prevClasses) =>
        prevClasses.map((classData) =>
          classData._id === classId ? { ...classData, feedback } : classData
        )
      );
    } catch (error) {
      // Handle the error if needed
    }
  };

  return (
    <div className="container" style={{paddingTop: '100px', paddingBottom: '30px'}}>
     <Container>
     <h2>My Classes</h2>
      {classes.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Class Image</th>
              <th>Class Name</th>
              <th>Instructor Name</th>
              <th>Instructor Email</th>
              <th>Status</th>
              <th>Total Enrolled Students</th>
              <th>Feedback</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classData) => (
              <tr key={classData._id}>
                <td>
                  <img src={classData.classImage} alt={classData.className} width="100" />
                </td>
                <td>{classData.className}</td>
                <td>{classData.instructorName}</td>
                <td>{classData.instructorEmail}</td>
                <td>{classData.status}</td>
                <td>{classData.enrolledStudents?.length || 0}</td>
                <td>
                  {classData.status === 'denied' ? (
                    <>
                      {classData.feedback ? (
                        <span>{classData.feedback}</span>
                      ) : (
                        <button
                          onClick={() => handleUpdateFeedback(classData._id, 'Feedback message')}
                        >
                          Add Feedback
                        </button>
                      )}
                    </>
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {classData.status === 'denied' && (
                    <button>Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No classes found.</p>
      )}
     </Container>
    </div>
  );
};

export default ClassesList;
