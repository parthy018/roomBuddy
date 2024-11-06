import flate from "../assets/flat.png";
import friends from "../assets/friends.jpg";
import {useNavigate} from "react-router-dom"
const Listing = () => {
  console.log("Listing visited");
  const navigate=useNavigate();

  return (
    <div className="w-full">
      <header className="w-full h-48 flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-semibold text-gray-700 text-center">Post Your Requirement</h1>
        <p className="text-lg text-center">
          Effortlessly find the ideal roommate or room. <br />
          Just post your requirements and watch the perfect match come to you!
        </p>
      </header>

      <section className="w-full min-h-96 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 items-center justify-center">
        <aside className="w-full md:w-1/4 h-[350px] bg-[#94d2bd] p-3 flex flex-col items-center rounded-sm"
        onClick={()=>navigate("/listing/need-room")}>
          <h3 className="text-2xl font-medium">Need a room/flat?</h3>
          <p>with roommate <span> <i className="ri-arrow-right-line"></i></span></p>
          <img
            src={flate}
            alt="Flat"
            className="w-full h-[70%] object-cover mt-2"
          />
        </aside>

        <aside className="w-full md:w-1/4 h-[350px] bg-[#dda15e] p-3 flex flex-col items-center rounded-sm"
        onClick={()=>{navigate("/listing/need-roommate")}}>
          <h3 className="text-2xl font-medium">Need a roommate</h3>
          <p className="text-md">for your flat/room <span><i className="ri-arrow-right-line"></i></span></p>
          <img
            src={friends}
            alt="Friends"
            className="w-full h-[70%] object-cover mt-2"
          />
        </aside>
      </section>
    </div>
  );
};

export default Listing;
