import { Link, Outlet } from 'react-router-dom';
import Header from '../Pages/Shared/Navbar/Header';
import Footer from '../Pages/Shared/Footer/Footer';
import useAdmin from '../Pages/Shared/UseAdmin';
import useInstructor from '../Pages/Shared/UseInstructor';
import useStudent from '../Pages/Shared/useStudent';

const Dashboard = () => {
  const isAdmin = useAdmin();
  const isInstructor = useInstructor();

  const isStudent = useStudent();


  return (
    <div>
      <Header></Header>
      <div className="container-fluid" style={{  marginBottom: '-50px' }} >
        <div className="row">
          {/* Left Sidebar */}
          <div className="col-md-3" style={{  backgroundColor: "#13182a" }}
          ><div className='text-white' style={{ position: 'sticky', top: '100px' }}>
            
            {isInstructor && (
              <div>
                {/* Instructor Section */}
                <h4>Instructor Dashboard</h4>
                <ul>
                  <li>
                    <Link to="/dashboard/addClass">ADD class</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/myClass">My Class</Link>
                  </li>
                </ul>
              </div>
            )}
            {isStudent && (<div>
              {/* Student Section */}
              <h4>Student Dashboard</h4>
              <ul>
                <li>
                  <Link to="/dashboard/selectedClass">My Selected Class</Link>
                </li>
                <li>
                  <Link to="/dashboard/enrolledClass">Enrolled Class</Link>
                </li>
                <li>
                  <Link to="/dashboard/paymentHistory">Payment History</Link>
                </li>
              </ul>
            </div>)}
            {isAdmin && (
              <div>
                {/* Admin Section */}
                <h4>Admin Dashboard</h4>
                <ul>
                  <li>
                    <Link to="/dashboard/manageClass">Manage Class</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/manageUsers">Manage Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          </div>

          {/* Content */}
          <div className="col-md-9">
            {/* Render the content component provided by the separate route handling component */}
            <Outlet></Outlet>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
