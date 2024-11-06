import { useGetPropertyDetailByIdQuery } from "../app/userSlice";
import { useParams } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { IoMdMale } from "react-icons/io";
import { IoMdFemale } from "react-icons/io";
import { BsCurrencyRupee } from "react-icons/bs";
import { IoBedOutline } from "react-icons/io5";

import tv from "../assets/listing/tv.png";
import fridge from "../assets/listing/fridge.png";
import kitchen from "../assets/listing/kitchen.png";
import wifi from "../assets/listing/wifi.png";
import laundry from "../assets/listing/laundry.png";
import ac from "../assets/listing/ac.png";
import parking from "../assets/listing/parking.png";
import power from "../assets/listing/power.png";

const Property = () => {
  //   const showAmenties = [
  //     { src: tv, label: "TV" },
  //     { src: fridge, label: "Fridge" },
  //     { src: kitchen, label: "Kitchen" },
  //     { src: wifi, label: "Wi-Fi" },
  //     { src: laundry, label: "Laundry" },
  //     { src: ac, label: "Air Conditioning" },
  //     { src: power, label: "Power Backup" },
  //     { src: parking, label: "Parking" },
  // ];

  const showAmenties = {
    TV: tv,
    Fridge: fridge,
    Kitchen: kitchen,
    "Wi-Fi": wifi,
    Laundry: laundry,
    "Air Conditioning": ac,
    "Power Backup": power,
    Parking: parking,
  };

  const { location, id } = useParams();
  console.log("location", location, " id ", id);

  console.log("property visited");
  const { data, error, isLoading } = useGetPropertyDetailByIdQuery({
    location,
    id,
  });
  console.log("Data", data);
  const property = data?.data;

  if (error) {
    return (
      <div>
        <h4>error accoured during api call {error}</h4>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto min-h-screen  py-10 grid grid-cols-1 sm:grid-cols-7 gap-4">
      <div className="sm:col-span-5  order-1 sm:order-none h-auto border shadow-[0px_1px_4px_rgba(0,0,0,0.16)] p-5">
        <div className="w-full py-5  border-b-2">
          <h4 className="text-lg font-semibold text-slate-600 my-1 ">
            Location
          </h4>
          <p className="flex items-center gap-2  text-lg text-slate-700">
            <span>
              <CiLocationOn />
            </span>
            {property.place}
          </p>
        </div>
        <div className="w-full py-5  border-b-2">
          <h4 className="text-lg font-semibold text-slate-700">Basic Info</h4>
          <div className="w-full  sm:flex justify-between   py-3">
            <div className="">
              <h5 className="font-medium text-slate-500">Gender</h5>
              <p className=" flex items-center text-lg font-medium gap-1 text-slate-600">
                <span>
                  {property?.owner?.gender === "male" ? (
                    <IoMdMale />
                  ) : (
                    <IoMdFemale />
                  )}
                </span>
                {property?.owner?.gender}
              </p>
            </div>
            <div className="">
              <h5 className="font-medium text-slate-500">Approx Rent</h5>
              <p className=" flex items-center text-lg font-medium gap-1 text-slate-600">
                <span>
                  <BsCurrencyRupee />
                </span>
                {property?.rent}
              </p>
            </div>
            <div className="">
              <h5 className="font-medium text-slate-500">occupancy</h5>
              <p className=" flex items-center text-lg font-medium gap-1 text-slate-600">
                <span>
                  <IoBedOutline />
                </span>
                {property?.occupancy}
              </p>
            </div>
            <div className="">
              <h5 className="font-medium text-slate-500">Looking for</h5>
              <p className=" flex items-center text-lg font-medium gap-1 text-slate-600">
                <span>
                  {property?.lookingGender === "male" ? (
                    <IoMdMale />
                  ) : (
                    <IoMdFemale />
                  )}
                </span>
                {property?.lookingGender}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full py-5  border-b-2">
          <h4 className="text-lg text-slate-700 font-medium my-1">Picture</h4>

          {property.image &&
            property.image.length > 0 &&
            property.image.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Property Image ${index + 1}`}
                className="w-full h-auto"
              />
            ))}
        </div>

        <div className="w-full py-5  border-b-2">
          <h4 className="text-lg text-slate-700 font-medium my-1">
            Highlights
          </h4>
          <div className="w-full h-auto flex  gap-3 flex-wrap">
            {property.highlights &&
              property.highlights.length > 0 &&
              property.highlights.map((highlight, index) => (
                <p
                  key={index}
                  className="py-1 px-3 text-slate-600 text-[1rem] font-normal bg-[#d4d4d8] rounded-lg"
                >
                  {highlight}
                </p>
              ))}
          </div>
        </div>
        <div className="w-full py-5  border-b-2">
          <h4 className="text-lg text-slate-700 font-medium my-1">Amenities</h4>
          <div className="w-full h-auto flex gap-6 flex-wrap">
            {property.amenities &&
              property.amenities.length > 0 &&
              property.amenities.map((amenitie, index) => (
                <div key={index} className="flex flex-col items-center bg-[#fef3c7]  w-20 h-20  py-2 rounded-full">
                  <img
                    src={showAmenties[amenitie]}
                    alt={amenitie}
                    className="w-12 h-12 object-contain"
                  />
                  <p className="text-slate-600 text-[0.8rem] font-normal mt-1">
                    {amenitie}
                  </p>
                </div>
              ))} 
          </div>
        </div>

        <div className="w-full py-5  border-b-2">
        <h4 className="text-lg text-slate-700 font-medium my-1">description</h4>
        <p className="text-sm text-slate-600">{property.description}</p>
        </div>
      </div>

      <div className="sm:col-span-2 min-h-screen bg-blue-300 order-last sm:order-none">
        <h1>hasdfhalkf</h1>
      </div>
    </div>
  );
};

export default Property;
