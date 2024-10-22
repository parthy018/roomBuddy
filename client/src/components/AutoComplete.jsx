import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

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
    // Navigate to another page with the selected suggestion
    navigate(`/properties/${suggestion.replace(/\s+/g, "-").toLowerCase()}`);
    // Clear input and suggestions
    setSearchTerm("");
    setSuggestions([]);
  };

  return (
    <>
      <div className="autocomplete-container relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search Places in Indore"
          className="border p-2 rounded-[20px] w-full bg-[#f2f2f4] placeholder:text-[#7a7876] placeholder:pl-3 
    transition-all duration-300 focus:scale-[1.05] focus:border-[#fb923c] focus:border-0 focus:outline-none 
    focus:ring-2 focus:ring-[#d6ad8c] transform"
          onFocus={(e) => e.target.classList.add("scale-[1.1]")}
          onBlur={(e) => e.target.classList.remove("scale-[1.1]")}
        />
        {suggestions.length > 0 && (
          <ul
            className="suggestions-list mt-2 border rounded-md bg-white absolute w-full max-h-60 overflow-y-auto"
            style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSelect(suggestion)}
              >
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
