import homeImg from "../assets/homeImg.png";
import rentAggrement from "../assets/rentAggrement.svg";
import eqaro from "../assets/eqaro.svg";
import Autocomplete from "../components/AutoComplete";

const Home = () => {
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
          <button
            className="mt-10 py-3 px-5 outline-none rounded-[30px] bg-[#f49d0c] capitalize hover:bg-[#d87607] transition-colors"
          >
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
    </div>
  );
};

export default Home;
