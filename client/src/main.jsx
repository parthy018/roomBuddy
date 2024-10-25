// index.js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx'; 
import About from './pages/About.jsx'; // About Us page component
import Profile from './pages/Profile.jsx'; // Profile page component
import Login from './auth/Login.jsx'; // Login page component
import PrivateRoute from './PrivateRoute.jsx'; // Import the PrivateRoute component
import Register from './auth/Register.jsx';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import './index.css';
import Properties from './pages/Properties.jsx';
import AdminDashboard from './dashboard/AdminDashboard.jsx';
import Listing from './pages/Listing.jsx';


// Create routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />, 
      },
      {
        path: '/properties/:place',
        element: <Properties />,
      },
      {
        path:'listing',
        element: <PrivateRoute allowedRoles={['seeker', 'host']} />,
        children: [
          {
            path: '',
            element: <Listing />,
          },
        ],
      },
      {
        path: '/profile/:id', 
        element: <PrivateRoute allowedRoles={['seeker', 'host']} />,
        children: [
          {
            path: '', 
            element: <Profile />,
          },
        ],
      },
      {
        path: '/admin',
        element: <PrivateRoute allowedRoles={['admin']} />, 
        children: [
          {
            path: '/admin',
            element: <AdminDashboard />,
          },
        ],
      },
      {
        path: '/login',
        element: <Login />, 
      },
      {
        path: '/register',
        element: <Register />,
      }
    ],
  },
]);

// Render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider  store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
