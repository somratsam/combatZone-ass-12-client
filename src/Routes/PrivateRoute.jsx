
import useAuth from '../Pages/Shared/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {

const {user} = useAuth()

const location = useLocation()
if (user?.email) {
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

export default PrivateRoute;