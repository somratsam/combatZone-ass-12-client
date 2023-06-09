import  { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

const PopularClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // Fetch class data from MongoDB
    const fetchClasses = async () => {
      try {
        const response = await fetch('http://localhost:5000/classes'); // Replace with your MongoDB API endpoint
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  const styles = {
    background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://i.ibb.co/hfKLdX4/pexels-cottonbro-studio-7792245.jpg")',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };
  
  

  return (
    <div  style={{ ...styles, marginBottom: '-48px', paddingBottom: '70px' }} >
      <h1 className='text-center fw-semibold text-white 'style={{paddingTop: '130px', paddingBottom: '50px'}}>POPULAR CLASSES</h1>
      <Container>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {classes.map((classData) => (
          <div key={classData._id} className="col">
            <div className="card h-100 border-0">
              <img src={classData.image} className="card-img-top" alt={classData.name} />
              <div className="card-body text-white text-center" style={{backgroundColor: '#191825'}}>
                <h5 className="card-title">{classData.name}</h5>
                <p className="card-text text-danger">Time: {classData.classTimePeriod}</p>
                <p className="card-text">Enrolled: {classData.enrollmentCount}</p>
                <p className="card-text text-light-emphasis">{classData.description}</p>
                
                {/* Add additional relevant information */}
              </div>
            </div>
          </div>
        ))}
      </div>
      </Container>
    </div>
  );
};

export default PopularClasses;
