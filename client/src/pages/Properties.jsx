import { useParams } from "react-router-dom";
import { useGetPropertiesByLocationQuery } from "../app/userSlice";
import CategoryListing from "../components/CategoryListing";
import { LuFileStack } from "react-icons/lu";
import { IoBedOutline, IoPeopleOutline } from "react-icons/io5";
import { BiBuildings } from "react-icons/bi";
import NotFoundPage from "../components/NotFoundPage";
import AutoComplete from "../components/AutoComplete";
import UserCard from "../components/UserCard";

const Properties = () => {
  const { location } = useParams();
  const place = location.replace(/-/g, " ");
  const {
    data: response,
    error,
    isLoading,
  } = useGetPropertiesByLocationQuery(location);
  const data = response?.data;

  if (isLoading) {
    return <div>Loading properties...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-semibold text-gray-700 my-6 text-center sm:text-left">
        Properties in {place}
      </h1>

      <div className="w-full flex flex-col sm:flex-row gap-6 my-2 p-1 justify-between items-center border-b-2">
        <div className="flex gap-4 sm:gap-6 justify-center sm:justify-start">
          <CategoryListing
            icon={<LuFileStack size={20} />}
            title="All Properties"
          />
          <CategoryListing icon={<IoBedOutline size={20} />} title="Rooms" />
          <CategoryListing
            icon={<IoPeopleOutline size={20} />}
            title="Roommates"
          />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {data.map((property) => (
            <div key={property.id}>
              <UserCard
                id={property.id}
                username={property.username}
                profilePicture={property.profilePicture}
                lookingGender={property.lookingGender}
                lookingFor={property.lookingFor}
                place={property.place}
                rent={property.rent}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No properties found for this location.</p>
      )}
    </div>
  );
};

export default Properties;
