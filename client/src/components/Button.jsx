import PropTypes from 'prop-types';
import clsx from 'clsx';

const Button = ({ children, variant = 'primary', onClick, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'px-4 py-2 rounded-lg transition-all duration-300 hover:scale-110',
        variant === 'primary' && 'bg-[#f49d0c] text-white hover:bg-[#d87607]',
        variant === 'secondary' && 'bg-[#1D4ED8] text-white hover:bg-[#1E3A8A]',
        variant === 'outline' && 'bg-transparent border border-[#f49d0c] text-[#f49d0c] hover:bg-[#f49d0c] hover:text-white',
        variant === 'danger' && 'bg-red-500 text-white hover:bg-red-700'
      )}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger']),
  onClick: PropTypes.func,
};

export default Button;
