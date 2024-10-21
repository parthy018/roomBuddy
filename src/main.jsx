// index.js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/Home.jsx'; // Landing page component
import About from './pages/About.jsx'; // About Us page component
import Profile from './pages/Profile.jsx'; // Profile page component
import Login from './auth/Login.jsx'; // Login page component
import PrivateRoute from './PrivateRoute.jsx'; // Import the PrivateRoute component
import Register from './auth/Register.jsx';
import './index.css';

// Create routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />, // Home page (Landing page)
      },
      {
        path: '/about',
        element: <About />, // About Us page
      },
      {
        path: '/profile',
        element: <PrivateRoute />, // Protect the profile route
        children: [
          {
            path: '/profile',
            element: <Profile />, // Profile page
          },
        ],
      },
      {
        path: '/login',
        element: <Login />, // Login page
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
    <RouterProvider router={router} />
  </StrictMode>
);
