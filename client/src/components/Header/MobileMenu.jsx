import PropTypes from 'prop-types';
import LinkButton from './LinkButton';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const MobileMenu = ({ isMenuOpen,  toggleMenu }) => {

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
              <LinkButton
                path="/login"
                bgColor="#ffffff"
                bgHover="#f0f0f0"
                className="block text-gray-600 border border-gray-600"
              >
                Login
              </LinkButton>
            </li>
            <li>
              <LinkButton path="/register" className="block">
                Register
              </LinkButton>
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
