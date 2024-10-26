import  { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import tv from "../assets/listing/tv.png";
import fridge from "../assets/listing/fridge.png";
import kitchen from "../assets/listing/kitchen.png";
import wifi from "../assets/listing/wifi.png";
import laundry from "../assets/listing/laundry.png";
import ac from "../assets/listing/ac.png";
import parking from "../assets/listing/parking.png";
import power from "../assets/listing/power.png";

const RoomDetailsForm = () => {
  const amenities = [
    { src: tv, label: "TV" },
    { src: fridge, label: "Fridge" },
    { src: kitchen, label: "Kitchen" },
    { src: wifi, label: "WiFi" },
    { src: laundry, label: "Washing Machine" },
    { src: ac, label: "AC" },
    { src: power, label: "Power Backup" },
    { src: parking, label: "Parking" },
  ];
  
  const [location, setLocation] = useState("");
  const [rent, setRent] = useState("");
  const [selectedLookingFor, setSelectedLookingFor] = useState("Any");
  const [selectedOccupancy, setSelectedOccupancy] = useState("Any");
  const [selectedHighlights, setSelectedHighlights] = useState([]);
  const [description, setDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleRentChange = (e) => setRent(e.target.value);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles(files);
  };

  const toggleHighlight = (highlight) => {
    setSelectedHighlights((prevHighlights) =>
      prevHighlights.includes(highlight)
        ? prevHighlights.filter((h) => h !== highlight)
        : [...prevHighlights, highlight]
    );
  };

  const toggleAmenity = (amenityLabel) => {
    setSelectedAmenities((prevAmenities) =>
      prevAmenities.includes(amenityLabel)
        ? prevAmenities.filter((a) => a !== amenityLabel)
        : [...prevAmenities, amenityLabel]
    );
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      location,
      rent,
      lookingFor: selectedLookingFor,
      occupancy: selectedOccupancy,
      highlights: selectedHighlights,
      amenities: selectedAmenities,
      description,
      files: selectedFiles,
    };
    console.log(formData);
    // Form submission logic goes here
  };

  return (
    <form onSubmit={handleSubmit} className="p-10 mx-auto">
      <div className="p-6 bg-white rounded-lg shadow-2xl max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Add your room details
        </h2>
        <p className="text-center text-gray-500 mb-8">
          so that other users can contact you.
        </p>

        {/* Location and Rent */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Your Location*
            </label>
            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg p-2">
             
              <input
                type="text"
                value={location}
                onChange={handleLocationChange}
                className="bg-gray-100 focus:outline-none w-full"
                placeholder="Enter your location"

              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Approx Rent*
            </label>
            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg p-2">
             
              <input
                type="number"
                value={rent}
                onChange={handleRentChange}
                className="bg-gray-100 focus:outline-none w-full"
                placeholder="Rs:5000"
              />
            </div>
          </div>
        </div>

        {/* Looking For and Occupancy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Looking For
            </label>
            <div className="flex space-x-4">
              {["Male", "Female", "Any"].map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`py-2 px-4 rounded-lg border hover:bg-[#fbd24e] ${
                    selectedLookingFor === option
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setSelectedLookingFor(option)}
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
                    selectedOccupancy === option
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setSelectedOccupancy(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Upload Photos Section */}
        <div className="mt-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload 3 Photos of your room
          </label>
          <div
            className={`border-2 rounded-lg p-6 text-center cursor-pointer transition-all 
                    ${
                      isDragging
                        ? "border-blue-500 bg-blue-50"
                        : "border-dashed border-gray-300"
                    }
                    hover:border-blue-400 hover:bg-blue-50`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              accept="image/jpeg, image/png, image/jpg"
              className="hidden"
              id="fileInput"
              onChange={handleFileSelect}
            />
            <label
              htmlFor="fileInput"
              className="flex flex-col items-center justify-center"
            >
              <FaCloudUploadAlt className="text-4xl text-blue-500 mb-2" />
              <p className="text-gray-500">Click or Drag Images To Upload</p>
              <p className="text-gray-400">(JPG, PNG, JPEG)</p>
            </label>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            You can upload images up to <strong>25 MB</strong>
          </p>

          {/* Preview Section */}
          {selectedFiles.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center border p-2 rounded-md"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Highlights Section */}
        <div className="mt-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose Highlights for your room
          </label>
          <div className="flex flex-wrap gap-3">
            {[
              "Attached washroom",
              "Market nearby",
              "Attached balcony",
              "Close to metro station",
              "Public transport nearby",
              "Gated society",
              "No Restriction",
            ].map((highlight) => (
              <button
                key={highlight}
                type="button"
                className={`px-4 py-2 rounded-lg border ${
                  selectedHighlights.includes(highlight)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => toggleHighlight(highlight)}
              >
                {highlight}
              </button>
            ))}
          </div>
        </div>

        {/* Amenities Section */}
        <div className="mt-8">
          <h3 className="text-lg font-medium">Amenities</h3>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {amenities.map((amenity, index) => (
              <button
                key={index}
                type="button"
                className={`flex flex-col w-10/12 h-10/12 items-center transition-transform  transform 
                   hover:bg-[#fbd24e]  hover:scale-110 ${
                    selectedAmenities.includes(amenity.label)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => toggleAmenity(amenity.label)}
              >
                <img src={amenity.src} alt={amenity.label} className="w-4/12 h-4/12" />
                <p className="mt-2 text-sm">{amenity.label}</p>
              </button>
            ))}
          </div>
        </div>
  
       <div className="mt-8">
         <h3 className="text-lg font-medium">Description</h3>
         <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Write a description..."
            className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RoomDetailsForm;
