// Properties.jsx
import { useParams } from "react-router-dom";
import { useGetPropertiesByLocationQuery } from "../app/appSlice";
import CategoryListing from "../components/CategoryListing";
import { LuFileStack } from "react-icons/lu";
import { IoBedOutline, IoPeopleOutline } from "react-icons/io5";
import { BiBuildings } from "react-icons/bi";
import NotFoundPage from "../components/NotFoundPage";
import AutoComplete from "../components/AutoComplete";
const Properties = () => {
  const { place } = useParams(); // Get the place parameter from the URL
  const { data, error, isLoading } = useGetPropertiesByLocationQuery(place);

  if (isLoading) {
    return <div>Loading properties...</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-700 my-6">
        Properties in {place.replace(/-/g, " ")}
      </h1>
      <div className="w-full flex gap-6 my-2 p-1 justify-between items-center border-b-2 bg-blue-500">
       <div className="flex gap-6 bg-orange-600">
       <CategoryListing icon={<LuFileStack size={20} />}  title="All Properties" />
        <CategoryListing icon={<IoBedOutline size={20} />} title="Rooms" />
        <CategoryListing icon={<IoPeopleOutline size={20} />} title="roommates" />
        <CategoryListing icon={<BiBuildings size={20} />} title="PGs" />
       </div>
        <AutoComplete  />
      </div>
      {error && (
        <div className="flex justify-center items-center min-h-10">
          <NotFoundPage content={error.message} />
        </div>
      )}
      {data && data.length > 0 ? (
        <ul className="property-list">
          {data.map((property) => (
            <li key={property.id} className="property-item">
              <h2>{property.name}</h2>
              <p>{property.description}</p>
              <p>Location: {property.location}</p>
              <p>Price: ${property.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No properties found for this location.</p>
      )}
    </div>
  );
};

export default Properties;
