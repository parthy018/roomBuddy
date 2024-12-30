import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaLocationDot } from "react-icons/fa6";

const placesList = [
  "Vijay Nagar",
  "Gandhi Nagar",
  "Bhanwarkuan",
  "Scheme 78",
  "Rajendra Nagar",
  "Sukhliya",
  "AB Road",
  "Malhar Mega Mall Area",
  "Rau",
  "Saraswati Nagar",
  "Aerodrome Area",
  "Mahalaxmi Nagar",
  "Shivaji Nagar",
  "Sukhlia",
  "Satyam Garden",
  "Nehru Park",
  "Khandwa Road",
  "Gomti Nagar",
  "Mangal City",
  "Nandanvan Colony",
];

const AutoComplete = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    let value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setSuggestions([]);
    } else {
      // Filter suggestions based on input
      const filteredSuggestions = placesList.filter((place) =>
        place.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSelect = (suggestion) => {
    navigate(`/properties/${suggestion.replace(/\s+/g, "-").toLowerCase()}`);
    setSearchTerm("");
    setSuggestions([]);
  };
  

  return (
    <>
      <div className="autocomplete-container relative">
      <div className="relative w-full">
      {/* Add the icon */}
      <FaLocationDot
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7a7876] z-10"
        size={20} // Adjust size if necessary
      />
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search Places in Indore"
        className="border ml-2 p-2 pl-10 rounded-[20px] w-full bg-[#f2f2f4] placeholder:text-[#7a7876] transition-all duration-300 focus:scale-[1.05] focus:border-[#fb923c] focus:border-0 focus:outline-none focus:ring-2 focus:ring-[#d6ad8c] transform"
        onFocus={(e) => e.target.classList.add("scale-[1.1]")}
        onBlur={(e) => e.target.classList.remove("scale-[1.1]")}
      />
    </div>
        {suggestions.length > 0 && (
          <ul
            className="suggestions-list mt-2 border rounded-md bg-white absolute w-full max-h-60 overflow-y-auto"
            style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-200 flex items-center gap-4  cursor-pointer"
                onClick={() => handleSelect(suggestion)}
              >
                <FaLocationDot className="text-[#7a7876]" />
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default AutoComplete;
