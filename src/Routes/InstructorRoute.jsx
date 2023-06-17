
import useInstructor from '../Pages/Shared/UseInstructor';

import { Navigate, useLocation } from 'react-router-dom';

const InstructorRoute = ({children}) => {
const {isInstructor} = useInstructor
// const {user} = useAuth()

const location = useLocation()
if ( isInstructor) {
    return children;
  }

    return (
        <Navigate
          to="/login"
          replace
          state={{ from: location.pathname }}
        />
      );
};

export default InstructorRoute;