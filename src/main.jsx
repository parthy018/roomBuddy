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
        path: '/properties/:place',
        element:<Properties />
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
    <Provider  store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
