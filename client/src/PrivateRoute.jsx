import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
const PrivateRoute = ({ allowedRoles }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  console.log('isAuthenticated', isAuthenticated, 'role', role);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; 
};

PrivateRoute.propTypes = {
  allowedRoles: PropTypes.array,
};

export default PrivateRoute;
