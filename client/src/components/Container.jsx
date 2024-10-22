// src/components/Container.jsx
import PropTypes from 'prop-types';
import Header from './Header';
const Container = ({ children }) => {
  return (
    <div className="w-full h-full relative ">
      <Header />
      <div className="pt-1">
        {children}
      </div>
    </div>
  );
};


Container.propTypes = {
  children: PropTypes.node.isRequired, 
};

export default Container;
