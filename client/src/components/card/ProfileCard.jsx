import PropTypes from "prop-types";
import { MdOutlineEmail } from "react-icons/md";

const ProfileCard = ({ profilePicture, name, email,children }) => {
  return (
    <div
      className="
        shadow-[0px_1px_4px_rgba(0,0,0,0.16)] 
        mx-auto 
        p-4 
        text-center 
        flex 
        flex-col 
        gap-4
        max-w-xs 
        md:max-w-sm 
        lg:max-w-md
        w-full
      "
    >
    {children}
      <img
        src={profilePicture}
        alt="profile-picture"
        className="
          w-16 
          h-16 
          md:w-20 
          md:h-20 
          lg:w-40 
          lg:h-40 
          rounded-full 
          object-cover
          mx-auto
        "
        loading="lazy"
      />
      
      <h4 className="text-lg md:text-xl lg:text-2xl font-semibold text-slate-700 mt-4">
        {name}
      </h4>
      
      <div className="flex items-center justify-center gap-2 text-slate-600 text-sm md:text-base">
        <MdOutlineEmail />
        
        <p className="font-regular">{email}</p>
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
