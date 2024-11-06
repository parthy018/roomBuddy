import PropTypes from "prop-types";
import { MdOutlineEmail } from "react-icons/md";
const ProfileCard = ({ profilePicture, name, email }) => {
  return (
    <div
      className=" shadow-[0px_1px_4px_rgba(0,0,0,0.16)] mx-auto p-4 text-center
    flex flex-col gap-4"
    >
      <img
        src={profilePicture}
        alt="profile-picture"
        className="w-18 h-18 rounded-full mx-auto"
      />
      <h4 className="text-lg font-semibold text-slate-700 mt-4">{name}</h4>
      <div className="flex items-center justify-evenly">
        <MdOutlineEmail />
        <p className="text-md font-regular text-slate-600">{email}</p>
      </div>
    </div>
  );
};

ProfileCard.propTypes = {
  profilePicture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default ProfileCard;
