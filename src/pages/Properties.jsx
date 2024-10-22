import { useParams } from "react-router-dom"
import {useGetPropertiesByLocationQuery} from "../app/appSlice";
import CategoryListing from "../components/CategoryListing";
const Properties = () => {
    const {place}=useParams();
    const {data , error , isLoading}=useGetPropertiesByLocationQuery(place);

    if (isLoading) {
        return <div>Loading properties...</div>;
      }
    
     

  return (
   <>
      <div>
      <h1>Properties in {place.replace(/-/g, ' ')}</h1>
      <div className="w-full flex gap-4">
        <CategoryListing
          icon={<i className="fa fa-home" aria-hidden="true"></i>}
          title="All Properties"
        />
        <CategoryListing
          icon={<i className="fa fa-building" aria-hidden="true"></i>}
          title="PGs"
        />
        <CategoryListing
          icon={<i className="fa fa-bed" aria-hidden="true"></i>}
          title="Rooms"
        />
      </div>
      {error && <p>{error.message}</p>}
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
        <p>No properties found for this location.</p>
      )}
    </div>
   </>
  )
}

export default Properties