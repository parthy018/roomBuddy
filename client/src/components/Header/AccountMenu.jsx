import  { useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from "../../assets/profile/avataaars4.png";
import { logOut } from '../../app/authSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
export default function AccountMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const toggleMenu = () => setIsOpen(!isOpen);
  const {profilePicture}=useSelector(state=>state.auth);
  const logoutfun = ()=>{
    dispatch(logOut());
    toggleMenu();
  }
  return (
    <div
      className="relative"
    >
      <div className="flex items-center">
        <img
          src={profilePicture ||avatar}
          alt="Profile"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={toggleMenu}
            loading="lazy"
        />
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <Link
            to="/user"
            onClick={toggleMenu}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#fde68a]"
          >
            <span className="mr-2">👤</span> Profile
          </Link>
          <hr className="my-1 border-gray-200" />
          <Link
            to='/login'
            onClick={logoutfun}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#fde68a]"
          >
            <span className="mr-2">🚪</span> Logout
          </Link>
        </div>
      )}
    </div>
  );
}
