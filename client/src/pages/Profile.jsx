import { useSelector } from "react-redux";
import ProfileCard from "../components/card/ProfileCard";
import { useGetUserQuery } from "../app/appSlice";
import clsx from 'clsx';

const Profile = () => {
  const { profilePicture } = useSelector((state) => state.auth);
  const { data, isError, isLoading } = useGetUserQuery();

  if (isLoading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center text-lg text-red-600">Failed to load profile data. Please try again later.</div>;
  }

  // Fallback values for name and email if data is unavailable
  const name = data?.data?.name || "Anonymous";
  const email = data?.data?.email || "No email available";
  const gender= data?.data?.gender ;
  return (
    <div className="w-11/12 mx-auto  py-4 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-8">
      <div className="h-auto rounded-lg order-last sm:order-none sm:col-span-2  shadow-[0px_1px_4px_rgba(0,0,0,0.16)] ">
      <div className="w-full p-5   border-b-2 ">
          <h4 className="text-2xl font-semibold text-slate-600 my-1 ">
           Your Profile
          </h4>
        </div>
        <div className="w-full p-5 h-auto  border-b-2  grid grid-col-1 sm:grid-cols-2 gap-4">
          <div className="">
            <p className="text-md text-slate-700">Name</p>
            <h6 className="py-2 px-6 bg-[#fefce8] rounded-full">{name}</h6>
          </div>
          <div className="">
            <p className="text-md text-slate-700">Email</p>
            <h6 className="py-2 px-6 bg-[#fefce8] rounded-full">{email}</h6>
          </div>
          <div className="">
            <p className="text-md text-slate-700">Gender</p>
            <div className="flex justify-start gap-4">
              <p className={`${gender==='male'? "bg-[#fef08a]":"bg-[#fffbeb]"} py-2 px-4 
                border-lg rounded-full`} >Male</p>
              <p className={`${gender==='female'? "bg-[#fef08a]":"bg-[#fffbeb]"} py-2 px-4 
                 border-lg rounded-full`}>Female</p>
            </div>
          </div>

        </div>
      </div>
      <div className="h-auto rounded-lg order-1 sm:order-none">
        <ProfileCard profilePicture={profilePicture} name={name} email={email} />
      </div>
    </div>
  );
};

export default Profile;
