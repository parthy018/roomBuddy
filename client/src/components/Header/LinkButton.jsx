import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const LinkButton = ({path='', children='button',bgColor='#f49d0c' ,bgHover='#d87607',className=''}) => {
  return (
    <>
      <Link className={ `bg-[${bgColor}]
      py-2 px-4 rounded-[30px] hover:bg-[${bgHover}] transition-colors ${className}`}
       to={path}>{children}</Link>
    </>
  )
}

LinkButton.propTypes = {
  path: PropTypes.string,
  children: PropTypes.string,
  className: PropTypes.string,
  bgColor: PropTypes.string,
  bgHover: PropTypes.string
}

export default LinkButton;