// PrivateRoute.jsx
import { Outlet, Navigate } from 'react-router-dom';

// Simulated authentication function
const isAuthenticated = () => {
  // Replace this with your actual authentication logic
  return localStorage.getItem('auth') === 'true';
};

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
