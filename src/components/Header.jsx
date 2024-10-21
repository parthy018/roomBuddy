// Header.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate=useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white shadow-md m-0 p-0">
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800 cursor-pointer" onClick={()=>{
          navigate("/");
        }}>Flatmate</div>
        
        {/* Navigation */}
        <nav>
          <ul className={`md:flex space-x-4 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
            <li>
              <Link to="/about" className="text-gray-600 hover:text-gray-800">About</Link>
            </li>
            <li>
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-800 py-1 pb-2 px-4 rounded-md border border-gray-600 hover:bg-gray-100 transition-colors"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="text-white bg-[#f49d0c] py-1 pb-2 px-4 rounded-lg hover:bg-[#d87607] transition-colors"
              >
                Register
              </Link>
            </li>
          </ul>
        </nav>

        {/* Hamburger Menu */}
        <div className="md:hidden flex items-center" onClick={toggleMenu}>
          <button className="text-gray-800 focus:outline-none">
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
          <ul className="px-2 pt-2 pb-4 space-y-1">
            <li>
              <Link to="/" className="block text-gray-600 hover:text-gray-800">About</Link>
            </li>
            <li>
              <Link
                to="/login"
                className="block text-gray-600 hover:text-gray-800 py-1 px-4 rounded border border-gray-600 hover:bg-gray-100 transition-colors"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="block text-white bg-gray-800 py-1 px-4 rounded hover:bg-gray-700 transition-colors"
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
