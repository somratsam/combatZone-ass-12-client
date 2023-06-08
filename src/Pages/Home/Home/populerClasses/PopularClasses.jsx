import  { useState, useEffect } from 'react';

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

  return (
    <div>
      <h2>Popular Classes</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {classes.map((classData) => (
          <div key={classData._id} className="col">
            <div className="card h-100">
              <img src={classData.image} className="card-img-top" alt={classData.name} />
              <div className="card-body">
                <h5 className="card-title">{classData.name}</h5>
                <p className="card-text">Enrolled: {classData.enrollmentCount}</p>
                <p className="card-text">Description: {classData.description}</p>
                <p className="card-text">Time: {classData.classTimePeriod}</p>
                {/* Add additional relevant information */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
