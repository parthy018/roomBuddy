import  { useState } from "react";
import { useNeedRoomMutation } from "../app/appSlice";
const ListingRoom = () => {
  const [formData, setFormData] = useState({
    location: "",
    rent: "",
    lookingFor: "any",
    occupancy: "Any",
    description: "",
  });
  const [highlights, setHighlights] = useState([]);
  const [successMessage,setSuccessMessage]=useState("");
  const [errorMessage,setErrorMessage]=useState("");
 const [needRoom]=useNeedRoomMutation();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleButtonClick = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleHighlight = (highlight) => {
    setHighlights((prevHighlights) =>
      prevHighlights.includes(highlight)
        ? prevHighlights.filter((h) => h !== highlight)
        : [...prevHighlights, highlight]
    );
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    if(highlights.length<=2){
      alert("choose minimum three highlights");
    }
    const fData=new FormData();
    fData.append('place',formData.location);
    fData.append('description',formData.description);
    fData.append('rent',formData.rent);
    fData.append('lookingGender',formData.lookingFor);
    fData.append('occupancy',formData.occupancy);
    highlights.forEach((highlight)=>(
      fData.append('highlights',highlight)
    ))
    console.log("FormData entries:", Array.from(fData.entries()));
    try {
      const response=await needRoom(fData).unwrap()
      setSuccessMessage(response.message);
      console.log("Roommate listing created successfully:", response);
      setFormData({
        location: "",
        rent: "",
        lookingFor: "any",
        occupancy: "Any",
        description: "",
      });
      setHighlights([]);
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Failed to create roommate listing:", error);
    }
   
  };

  const highlightOptions = [
    "Working full time",
    "College student",
    "25+ age",
    "<25 age",
    "Working night shifts",
    "Will shift immediately",
    "Have pets",
    "Need no furnishing",
    "Pure vegetarian",
    "Have 2 wheeler",
    "Have 4 wheeler",
  ];

  if(successMessage){
    return (
      <div className="p-10 mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {successMessage}
        </h2>
      </div>
    );
  }

  if(errorMessage){
    return (
      <div className="p-10 mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {errorMessage}
        </h2>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-10 mx-auto">
      <div className="p-6 bg-white rounded-lg shadow-2xl max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Add your requirement
        </h2>
        <p className="text-center text-gray-500 mb-8">
          so that other users can contact you.
        </p>

        {/* Location and Rent */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="location">
              Add Your Location*
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              className="bg-gray-100 focus:outline-none w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Add Location..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Approx Rent*
            </label>
            <input
              type="number"
              name="rent"
              value={formData.rent}
              onChange={handleChange}
              className="bg-gray-100 focus:outline-none w-full p-2 border border-gray-300 rounded-lg"
              placeholder="₹ 5000"
              required
            />
          </div>
        </div>

        {/* Looking For and Occupancy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Looking For
            </label>
            <div className="flex space-x-4">
              {["male", "female", "any"].map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`py-2 px-4 rounded-lg border hover:bg-[#fbd24e] ${
                    formData.lookingFor === option
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => handleButtonClick("lookingFor", option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Occupancy
            </label>
            <div className="flex space-x-4">
              {["Single", "Shared", "Any"].map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`py-2 px-4 rounded-lg border hover:bg-[#fbd24e] ${
                    formData.occupancy === option
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => handleButtonClick("occupancy", option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="mt-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose Highlights for your property
          </label>
          <div className="flex flex-wrap gap-4">
            {highlightOptions.map((highlight) => (
              <button
                type="button"
                key={highlight}
                className={`py-2 px-4 rounded-full border hover:bg-[#fbd24e] ${
                  highlights.includes(highlight)
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => toggleHighlight(highlight)}
              >
                {highlight}
              </button>
            ))}
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-8">
          <h3 className="text-sm font-medium">Description</h3>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a description..."
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-8 rounded-lg text-sm"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default ListingRoom;
