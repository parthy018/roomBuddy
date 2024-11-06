// routes.js

import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Profile from '../pages/Profile.jsx';
import Login from '../auth/Login.jsx';
import Register from '../auth/Register.jsx';
import Properties from '../pages/Properties.jsx';
import Property from '../pages/Property.jsx';
import Listing from '../pages/Listing.jsx';
import ListingFields from '../pages/ListingFields.jsx';
import AdminDashboard from '../dashboard/AdminDashboard.jsx';
import PrivateRoute from '../PrivateRoute.jsx';
import ListingRoom from '../pages/ListingRoom.jsx';

// Define routes
const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/properties/:location', element: <Properties /> },
      {
        path: '/properties/:location/:id',
        element: <PrivateRoute allowedRoles={['seeker', 'host']} />,
        children: [{ path: '', element: <Property /> }],
      },
      {
        path: '/listing',
        element: <PrivateRoute allowedRoles={['seeker', 'host']} />,
        children: [
          { path: '', element: <Listing /> },
          { path: 'need-roommate', element: <ListingFields /> },
          {path:'need-room',element:<ListingRoom />}
        ],
      },
      {
        path: '/user',
        element: <PrivateRoute allowedRoles={['seeker', 'host']} />,
        children: [{ path: '', element: <Profile /> }],
      },
      {
        path: '/admin',
        element: <PrivateRoute allowedRoles={['admin']} />,
        children: [{ path: '', element: <AdminDashboard /> }],
      },
    ],
  },
];

// Create and export router instance
export const router = createBrowserRouter(routes);
