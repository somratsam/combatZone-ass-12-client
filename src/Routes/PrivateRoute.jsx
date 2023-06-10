

import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Pages/AuthProviders';
import { useContext } from 'react';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

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
