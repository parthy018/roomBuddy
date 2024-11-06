import PropTypes from "prop-types";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";

const UserCard = ({
  id,
  username,
  profilePicture,
  lookingGender,
  lookingFor,
  place,
  rent,
}) => {
  const navigate = useNavigate();
  const { location } = useParams();

  const handleRedirect = (id) => {
    navigate(`/properties/${location}/${id}`);
  };

  return (
    <div
      className="w-full sm:w-[30rem] bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex flex-col sm:flex-row items-center 
                 hover:scale-105 transition-all duration-300 space-y-4 sm:space-y-0 sm:space-x-4"
      onClick={() => handleRedirect(id)}
    >
      {/* Profile Picture */}
      <img
        src={profilePicture}
        alt="profilePicture"
        className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover"
      />

      {/* User Info */}
      <div className="flex flex-1 flex-col justify-evenly gap-4 items-start text-center sm:text-left">
        <div>
          <h4 className="text-xl font-semibold text-gray-800">{username}</h4>
          <p className="text-gray-500 flex items-center justify-center sm:justify-start">
            <CiLocationOn className="mr-1" /> {place}
          </p>
        </div>

        {/* Details Flex */}
        <div className="flex flex-col sm:flex-row justify-between w-full text-gray-700 text-start mt-4 gap-2">
          <div className="flex-1">
            <p className="font-light text-sm">Rent</p>
            <p className="text-medium font-semibold">₹ {rent}</p>
          </div>
          <div className="flex-1">
            <p className="font-light text-sm">Looking for</p>
            <p className="text-medium font-semibold">{lookingGender}</p>
          </div>
          <div className="flex-1">
            <p className="font-light text-sm">Roommate</p>
            <p className="text-medium font-semibold">{lookingFor}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  id: PropTypes.string,
  username: PropTypes.string,
  profilePicture: PropTypes.string,
  lookingGender: PropTypes.string,
  lookingFor: PropTypes.string,
  place: PropTypes.string,
  rent: PropTypes.number,
};

export default UserCard;
