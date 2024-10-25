import homeImg from "../assets/homeImg.png";
import rentAggrement from "../assets/rentAggrement.svg";
import eqaro from "../assets/eqaro.svg";
import Autocomplete from "../components/AutoComplete";

const Home = () => {
  const places = [
    {
      name: "Khajrana",
      imgUrl:
        "https://images.unsplash.com/photo-1499678329028-101435549a4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Palasia",
      imgUrl:
        "https://images.unsplash.com/photo-1644144972720-4a932a9252c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Bangali",
      imgUrl:
        "https://images.unsplash.com/photo-1499678329028-101435549a4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Vijay Nagar",
      imgUrl:
        "https://images.unsplash.com/photo-1595521624992-48a59aef95e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJlYXV0aWZ1bCUyMHBsYWNlcyUyMGJ1aWxkaW5nfGVufDB8fDB8fHww",
    },
    {
      name: "Saket",
      imgUrl:
        "https://images.unsplash.com/photo-1717147507202-d0be928e3b7f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Noida",
      imgUrl:
        "https://images.unsplash.com/photo-1623741099118-e3095a66784a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhdXRpZnVsJTIwcGxhY2VzJTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Delhi",
      imgUrl:
        "https://images.unsplash.com/photo-1712961747359-1461301b89a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJlYXV0aWZ1bCUyMHBsYWNlcyUyMGJ1aWxkaW5nfGVufDB8fDB8fHww",
    },
    {
      name: "Mumbai",
      imgUrl:
        "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGJlYXV0aWZ1bCUyMHBsYWNlcyUyMGJ1aWxkaW5nfGVufDB8fDB8fHww",
    },
    {
      name: "Chandigarh",
      imgUrl:
        "https://plus.unsplash.com/premium_photo-1679582754705-0b8fc5b86042?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8",
    },
    {
      name: "Musakhedi",
      imgUrl:
        "https://images.unsplash.com/photo-1705861144284-d52dd52fa3dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmVhdXRpZnVsJTIwcGxhY2VzJTIwYnVpbGRpbmd8ZW58MHx8MHx8fDA%3D",
    },
  ];
  return (
    <div className="text-center w-full min-h-screen flex flex-col gap-8">
      {/* Main Hero Section */}
      <div className="text-center w-full flex flex-col justify-center items-center gap-4 pt-20 px-4">
        <h1 className="text-[2em] sm:text-[2.5em] font-semibold leading-snug sm:leading-normal">
          Connecting You with Ideal Flatmates,
          <br />
          Roommates, and Affordable PGs
        </h1>
        <p className="mt-2 py-3 px-5 outline-none rounded-[30px] bg-[#fef3c7] text-sm sm:text-base">
          Share Your room with the right roommates
        </p>
        {/* Autocomplete Component */}
        <div className="w-full sm:w-2/3 lg:w-1/2 mx-auto mt-4">
          <Autocomplete />
        </div>
        <img
          src={homeImg}
          alt="Example"
          className="mt-4 w-full sm:w-2/3 lg:w-1/2 mx-auto"
        />
      </div>

      {/* Rental Agreement Section */}
      <div className="flex flex-col lg:flex-row w-full min-h-screen bg-[#F9FAFB] p-10 items-center gap-6">
        <div className="w-full lg:w-1/2 text-left">
          <h2 className="text-[2em] sm:text-[2.5em] font-semibold leading-tight sm:leading-tight">
            Getting Rental Agreement <br /> made easy, quick, and <br />
            affordable for you
          </h2>
          <p className="mt-2 text-base sm:text-xl">
            Lowest Price Guarantee! Create your rental <br />
            agreement online in minutes.
          </p>
          <button className="mt-10 py-3 px-5 outline-none rounded-[30px] bg-[#f49d0c] capitalize hover:bg-[#d87607] transition-colors">
            Create now
          </button>
        </div>
        <div className="w-full lg:w-1/2">
          <img
            src={rentAggrement}
            alt="Rental Agreement"
            className="w-full h-auto mx-auto"
          />
        </div>
      </div>

      {/* Security Deposit Section */}
      <div className="flex flex-col lg:flex-row w-full min-h-[40vh] md:min-h-[70vh] p-5 items-center gap-6">
        <div className="w-full lg:w-1/2 text-left flex flex-col justify-center">
          <h2 className="text-[1.5em] sm:text-[1.8em] font-semibold leading-tight">
            Don&apos;t want to pay <br /> Security deposit?
          </h2>
          <p className="mt-2 text-base sm:text-lg">
            Lowest Price Guarantee! Create your rental <br />
            agreement online in minutes.
          </p>
          <button className="mt-10 py-2 px-4 outline-none rounded-[20px] bg-[#f49d0c] capitalize max-w-[8rem] hover:bg-[#d87607] transition-colors">
            Create now
          </button>
        </div>
        <div className="w-full lg:w-1/2">
          <img
            src={eqaro}
            alt="No Security Deposit"
            className="w-3/4 h-auto mx-auto"
          />
        </div>
      </div>

      {/* View Places Section */}
      <div className="w-full min-h-screen bg-[#F9FAFB] flex flex-col items-center p-20">
      <h1 className="text-5xl font-medium mb-20 text-center">
        View Rooms In Popular Places
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full max-w-6xl">
        {places.map((place, index) => (
          <div key={index} className="shadow-md rounded-lg overflow-hidden relative">
            <img
              src={place.imgUrl}
              alt={place.name}
              className="w-full h-40 object-cover transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 w-full bg-opacity-50 text-xl font-bold text-white text-center p-2">
              {place.name}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Home;


