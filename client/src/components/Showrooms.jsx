import { NavLink } from "react-router-dom";
import React from "react";

const Showrooms = ({ roomData }) => {
  return (
    <div className="bg-rose-100 flex justify-center items-center flex-col p-2">
      <div className="flex flex-col items-start">
        <div>
          <img src={roomData.image} className="h-52 w-44" alt="" />
        </div>
        <div>
          <h4 className="text-[12px] my-3 overflow-hidden text-ellipsis">{roomData.description}</h4>
          <p className=" text-[10px]">looking for: {roomData.lookingGender}</p>
          <p className=" text-[10px]">Place: {roomData.place}</p>
          <p className=" text-[10px]">Rent: {roomData.rent}</p>
          <NavLink className="text-sm self-end mt-2 bg-yellow-500 rounded-lg text-black px-2 flex justify-center items-center w-max text-center ">
            See more
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Showrooms;
