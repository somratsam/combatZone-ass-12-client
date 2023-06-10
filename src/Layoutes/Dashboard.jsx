import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
// todo
    
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Left Sidebar */}
        <div className="col-md-4">
          <div>
            {/* Instructor Section */}
            <h4>Instructor Dashboard</h4>
            <ul>
              <li>
                <Link to="/addClass">ADD class</Link>
              </li>
              <li>
                <Link to="/myClass">My Class</Link>
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
                <Link to="/my-selected-class">My Selected Class</Link>
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
                <Link to="/admin-dashboard">Admin Dashboard</Link>
              </li>
              <li>
                <Link to="/manage-class">Manage Class</Link>
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
