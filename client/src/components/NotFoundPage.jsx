import NotFound from "../assets/NotFound.png";
import PropTypes from "prop-types";

const NotFoundPage = ({ content }) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <img src={NotFound} alt="not found" className="max-w-full h-80" />
      <h1 className="text-2xl font-bold mt-4">Page Not Found</h1>
      <p className="text-gray-500 mt-2">{content}</p>
    </div>
  );
};

NotFoundPage.propTypes = {
  content: PropTypes.string,
};

export default NotFoundPage;
