// Home.jsx
import homeImg from "../assets/homeImg.png";
import rentAggrement from "../assets/rentAggrement.svg";
import eqaro from "../assets/eqaro.svg";
const Home = () => {
  return (
    <div className="text-center w-full min-h-screen flex flex-col gap-4">
      {/* Home first section */}
      <div className="text-center w-full min-h-screen flex flex-col justify-center items-center gap-4 pt-20">
        {/* Added pt-20 to push the content below the header */}
        <h1 className="text-[2.5em] font-semibold">
          Connecting You with Ideal Flatmates,
          <br />
          Roommates, and Affordable PGs
        </h1>
        <p className="mt-2 py-3 px-5 outline-none rounded-[30px] bg-[#fef3c7]">
          Share Your room with the right roommates
        </p>
        <img src={homeImg} alt="Example" className="mt-4 w-1/2 mx-auto" />
      </div>
      <div className="flex w-full min-h-screen bg-[#F9FAFB] p-10">
        <div className="w-1/2 h-full text-left ">
          <h2 className="text-[2.5em] font-semibold">
            Getting Rental Agreement <br /> made easy, quick, and
            <br /> affordable for you
          </h2>
          <p className="mt-2 text-xl">
            Lowest Price Guarantee! Create your rental
            <br /> agreement online in minutes.
          </p>
          <button
            className="mt-20 py-3 px-5 outline-none rounded-[30px] bg-[#f49d0c]
              capitalize"
          >
            create now
          </button>
        </div>
        <div className="w-1/2 h-full">
          <img
            src={rentAggrement}
            alt="Example SVG"
            className="w-full h-full mx-auto"
          />
        </div>
      </div>

      <div className="flex w-full min-h-[40vh] md:min-h-[70vh] p-5 ">
        <div className="w-1/2 h-[100] text-left flex flex-col justify-center">
          <h2 className="text-[1.8em] font-semibold">
            Don&apos;t want to pay <br /> Security deposit?
          </h2>
          <p className="mt-2 text-lg">
            Lowest Price Guarantee! Create your rental
            <br /> agreement online in minutes.
          </p>
          <button className="mt-10 py-2 px-4 outline-none rounded-[20px] capitalize max-w-[8rem]">
            create now
          </button>
        </div>
        <div className="w-1/2 h-full">
          <img src={eqaro} alt="Example SVG" className="w-3/4 h-auto mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default Home;
