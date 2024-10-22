// CategoryListing.jsx
import PropTypes from "prop-types";
import { LuFileStack } from "react-icons/lu";
import { IoBedOutline,IoPeopleOutline  } from "react-icons/io5";
import { BiBuildings } from "react-icons/bi";
const CategoryListing = ({ icon, title }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      {icon}
      <p className="text-center">{title}</p>
    </div>
  );
};

CategoryListing.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
};

export default CategoryListing;
