import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

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
          <ul className="flex items-center space-x-4">
            <li>
              <Link to="/about" className="text-gray-600 hover:text-gray-800">
                About
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-800 py-1 px-4 rounded-md border border-gray-600 hover:bg-gray-100 transition-colors"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="text-white bg-[#f49d0c] py-1 px-4 rounded-lg hover:bg-[#d87607] transition-colors"
              >
                Register
              </Link>
            </li>
          </ul>
        </nav>

        {/* Hamburger Menu for Mobile */}
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="px-4 pt-4 pb-6 space-y-4">
            <li>
              <Link to="/about" className="block text-gray-600 hover:text-gray-800">
                About
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="block text-gray-600 hover:text-gray-800 py-1 px-4 rounded-md border border-gray-600 hover:bg-gray-100 transition-colors"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="block text-white bg-[#f49d0c] py-1 px-4 rounded-lg hover:bg-[#d87607] transition-colors"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
