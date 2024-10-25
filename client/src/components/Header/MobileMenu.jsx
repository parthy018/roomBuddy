import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button';
const MobileMenu = ({ isMenuOpen,  toggleMenu }) => {
  const Navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);
  if (!isMenuOpen) {
    return null; // Do not render anything if the menu is closed
  }

  return (
    <div className="md:hidden bg-white shadow-md">
      <ul className="px-4 pt-4 pb-6 space-y-4">
        <li>
        <Link to="/about" className="text-gray-600 hover:text-gray-900 ">
                About
              </Link>
        </li>
        {!isAuthenticated && (
          <>
            <li>
              <Button
               onClick={()=>{Navigate('/login') }}
               variant='outline'
              >
                Login
              </Button>
            </li>
            <li>
              <Button onClick={()=>{Navigate('/register') }} variant='outline' >
                Register
              </Button>
            </li>
          </>
        )}
        {isAuthenticated && (
          <li>
            <button onClick={toggleMenu}>
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

MobileMenu.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default MobileMenu;
