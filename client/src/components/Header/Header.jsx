import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MobileMenu from './MobileMenu';
import AccountMenu from './AccountMenu'; // Import the AccountMenu component
import Button from '../Button';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, isListed } = useSelector((state) => state.auth);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div
          className="text-xl font-bold text-gray-800 cursor-pointer"
          onClick={() => navigate('/')}
        >
          RoomBuddy
        </div>

        <nav className="hidden md:flex space-x-6">
          <ul className="flex items-center space-x-6">
            <li>
              <Link to="/about" className="text-gray-600 hover:text-gray-900 ">
                About
              </Link>
            </li>
            {!isAuthenticated ? (
              <>
                <li>
                 
                  <Button variant="outline" onClick={() => navigate('/login')}> Login </Button>
                </li>
                <li>
                 
                  <Button variant="primary" onClick={() => navigate('/register')} > Register </Button>
                </li>
              </>
            ) : (
              <>
                {isListed ? (
                  <li>
                    <Button variant="outline" onClick={() => navigate('/edit-listing')}> Edit Listing </Button>
                  </li>
                ) : (
                  <li>
                    <Button variant="primary" onClick={() => navigate('/listing')}> List Property </Button>
                  </li>
                )}
               
                <li className="relative">
                  <AccountMenu />
                </li>
              </>
            )}
          </ul>
        </nav>

        <div className="md:hidden flex items-center">
          <button
            className="text-gray-800 focus:outline-none"
            onClick={toggleMenu}
          >
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-gray-800"></span>
              <span className="block w-6 h-0.5 bg-gray-800"></span>
              <span className="block w-6 h-0.5 bg-gray-800"></span>
            </div>
          </button>
        </div>
      </div>
      <MobileMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </header>
  );
};

export default Header;
