// Properties.jsx
import { useParams } from "react-router-dom"; // useParams to get URL parameter
import { useGetPropertiesByLocationQuery } from "../app/userSlice";
import CategoryListing from "../components/CategoryListing";
import { LuFileStack } from "react-icons/lu";
import { IoBedOutline, IoPeopleOutline } from "react-icons/io5";
import { BiBuildings } from "react-icons/bi";
import NotFoundPage from "../components/NotFoundPage";
import AutoComplete from "../components/AutoComplete";

const Properties = () => {
  const { location } = useParams(); // Get the location param from the URL
  const place = location.replace(/-/g, " "); // Convert the hyphenated location to a readable format
  const { data, error, isLoading } = useGetPropertiesByLocationQuery(location); // Pass the location as URL param
  
  if (isLoading) {
    return <div>Loading properties...</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-700 my-6">
        Properties in {place}
      </h1>
      <div className="w-full flex gap-6 my-2 p-1 justify-between items-center border-b-2">
        <div className="flex gap-6">
          <CategoryListing icon={<LuFileStack size={20} />} title="All Properties" />
          <CategoryListing icon={<IoBedOutline size={20} />} title="Rooms" />
          <CategoryListing icon={<IoPeopleOutline size={20} />} title="Roommates" />
          <CategoryListing icon={<BiBuildings size={20} />} title="PGs" />
        </div>
        <AutoComplete />
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
              <h2>{property.username}</h2>
              <p>Location: {property.place}</p>
              <p>Price: ${property.rent}</p>
              <p>Looking For: {property.lookingFor}</p>
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
