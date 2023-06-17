
import { Container } from 'react-bootstrap';

import '../../../Shared/Style.css'
import { useFetchClasses } from '../../../Shared/ClassFetch';

const PopularClasses = () => {
  const classes = useFetchClasses();
  return (
    <div className='style' style={{ marginBottom: '-48px', paddingBottom: '200px' }} >
      <h1 className='text-center fw-semibold text-white 'style={{paddingTop: '130px', paddingBottom: '50px'}}>POPULAR CLASSES</h1>
      <Container>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {classes.map((classData) => (
          <div key={classData._id} className="col">
            <div className="card h-100 border-0">
              <img src={classData.classImage} className="card-img-top" alt={classData.name} />
              <div className="card-body text-white text-center" style={{backgroundColor: '#13182a'}}>
                <h5 className="card-title">{classData.className}</h5>
                <p className="card-text text-danger">Time: {classData.classTimePeriod}</p>
                <p className="card-text">Enrolled: {classData.enrolledCount}</p>
                <p className="card-text text-light-emphasis">{classData.description}</p>
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