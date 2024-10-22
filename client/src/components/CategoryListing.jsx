import PropTypes from "prop-types"
const CategoryListing = ({icon, title}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      {icon}
      <p className="text-sm text-slate-600">{title}</p>
    </div>
  )
}

CategoryListing.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired
}

export default CategoryListing