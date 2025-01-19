import { useEffect, useState } from "react";
import { useGetAllRoomsDataQuery } from "../app/userSlice";
import Showrooms from "../components/Showrooms";

const AllRooms = () => {
  const [lookingGender, setLookingGender] = useState("all");
  const [location, setLocation] = useState("all");
  const { data, isLoading } = useGetAllRoomsDataQuery();
  const [newData, setNewData] = useState()

  useEffect(() => {
    let tempData = data
    if (!(location === "all")) {
      tempData = tempData.filter((item) => item.place === location);
    }
    if (!(lookingGender === 'all')) {
      tempData = tempData.filter((item) => item.lookingGender === lookingGender);
    }
    setNewData(tempData)
    console.log(tempData)
    console.log(newData)
    console.log(data)
  }, [location, lookingGender, data]);
  

  if (isLoading) return <div>Loading......</div>;
  return (
    <div>
      <div className="pb-10">
        <b className="">Filters</b>
        <hr className="my-2" />
        <ul className="flex gap-10">
          <div className="flex gap-1 justify-center ">
            <label htmlFor="choose-gender">gender: </label>
            <select
              id="choose-gender"
              className="border-x-2 border-gray-400 rounded "
              onChange={(e) => setLookingGender(e.target.value)}
              value={lookingGender}
            >
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="all">both</option>
            </select>
          </div>
          <div className="flex gap-1 justify-center">
            <label htmlFor="choose-gender">Place: </label>
            <select
              className="border-x-2 items-center justify-center flex items-center justify-center border-gray-400 rounded "
              onChange={(e) => setLocation(e.target.value)}
              value={location}
            >
              <option value="all">all</option>
              {data?.map((item, index) => (
                <option key={index} value={item.place}>
                  {item.place}
                </option>
              ))}
            </select>
          </div>
        </ul>
        <hr className="my-3" />
      </div>
      <div className="flex gap-5">
        {newData?.map((item, index) => {
          return <Showrooms key={index} roomData={item} />;
        })}
      </div>
    </div>
  );
};

export default AllRooms;
