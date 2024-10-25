import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LinkButton from './LinkButton';
import MobileMenu from './MobileMenu'; // Import the MobileMenu component
import avatar from '../../assets/profile/avataaars4.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated,isListed } = useSelector((state) => state.auth);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <div
          className="text-xl font-bold text-gray-800 cursor-pointer"
          onClick={() => {
            navigate('/');
          }}
        >
          Flatmate
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <ul className="flex items-center space-x-6">
            <li>
              <Link to="/about" className="text-gray-600 hover:text-gray-900 ">
                About
              </Link>
            </li>
            {!isAuthenticated && (
              <>
                <li>
                  <LinkButton
                    path="/login"
                    bgColor="#ffffff"
                    bgHover="#f0f0f0"
                    className="text-gray-600 border border-gray-600"
                  >
                    Login
                  </LinkButton>
                </li>
                <li>
                  <LinkButton path="/register" className="text-white">
                    Register
                  </LinkButton>
                </li>
              </>
            )}
            {isAuthenticated && (
              <>{
                isListed ? (
                  <li>
                    <LinkButton
                      path="/"
                      bgColor="#fef08a"
                      bgHover="#fef9c3"
                      className="text-gray-600 border border-gray-600"
                    >
                     Edit Listing
                    </LinkButton>
                  </li>
                ) : (
                  <li>
                    <LinkButton
                      path="listing"
                      className="text-white"
                    >
                      List Property
                    </LinkButton>
                  </li>
                )
              }
              <li>
                <Link to="/profile">
                  <img
                    src={avatar}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                </Link>
              </li>
              </>
            )}
          </ul>
        </nav>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex items-center">
            <button className="text-gray-800 focus:outline-none" onClick={toggleMenu}>
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-gray-800"></span>
              <span className="block w-6 h-0.5 bg-gray-800"></span>
              <span className="block w-6 h-0.5 bg-gray-800"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </header>
  );
};

export default Header;
