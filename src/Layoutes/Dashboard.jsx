import { Link, Outlet} from 'react-router-dom';

const Dashboard = () => {
// todo
    
  return (
    <div className="container-fluid" style={{marginTop: '100px'}}>
      <div className="row">
        {/* Left Sidebar */}
        <div className="col-md-4">
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
          <div>
            {/* Student Section */}
            <h4>Student</h4>
            <ul>
              <li>
                <Link to="/student-dashboard">Student Dashboard</Link>
              </li>
              <li>
                <Link to="/dashboard/selectedClass">My Selected Class</Link>
              </li>
              <li>
                <Link to="/enrolled-class">Enrolled Class</Link>
              </li>
            </ul>
          </div>
          <div>
            {/* Admin Section */}
            <h4>Admin</h4>
            <ul>
              
              <li>
                <Link to="/dashboard/manageClass">Manage Class</Link>
              </li>
              <li>
                <Link to="/manage-users">Manage Users</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Content */}
        <div className="col-md-8">
          {/* Render the content component provided by the separate route handling component */}
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
