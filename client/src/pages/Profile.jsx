import { useState } from "react";
import { useSelector } from "react-redux";
import ProfileCard from "../components/card/ProfileCard";
import { useGetUserQuery, useEditUserMutation } from "../app/appSlice";
import clsx from "clsx";
import { MdOutlineModeEdit } from "react-icons/md";

const Profile = () => {
  const { profilePicture } = useSelector((state) => state.auth);
  const { data, isError, isLoading,refetch } = useGetUserQuery();
  const [setEditUser] = useEditUserMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
  });

  if (isLoading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-lg text-red-600">
        Failed to load profile data. Please try again later.
      </div>
    );
  }

  const handleEditClick = () => {
    setIsEditing(true);
    setFormData({
      name: data?.data?.name || "",
      email: data?.data?.email || "",
      gender: data?.data?.gender || "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleUpdateClick = async () => {
    try {
      await setEditUser(formData).unwrap();
      refetch(); // Refetch the user data after update
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  const name = data?.data?.name || "Anonymous";
  const email = data?.data?.email || "No email available";
  const gender = data?.data?.gender;
  const role = data?.data?.role || "Seeker";

  return (
    <div className="w-11/12 mx-auto py-4 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-8">
      <div className="h-auto rounded-lg order-last sm:order-none sm:col-span-2 shadow-[0px_1px_4px_rgba(0,0,0,0.16)]">
        <div className="p-5 flex justify-between items-center bg-gray-100 center h-20">
          <h4 className="text-2xl font-semibold text-slate-600 my-1">
            Your Profile
          </h4>
          <div>
            {isEditing ? (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleUpdateClick}
              >
                Update
              </button>
            ) : (
              <MdOutlineModeEdit
                className="cursor-pointer"
                onClick={handleEditClick}
              />
            )}
          </div>
        </div>
        <div className="w-full p-5 h-auto border-b-2 grid grid-col-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-md text-slate-700">Name</p>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="py-2 px-4 bg-gray-100 rounded w-full"
              />
            ) : (
              <h6 className="py-2 px-6 bg-[#fefce8] rounded-full">{name}</h6>
            )}
          </div>
          <div>
            <p className="text-md text-slate-700">Email</p>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="py-2 px-4 bg-gray-100 rounded w-full"
              />
            ) : (
              <h6 className="py-2 px-6 bg-[#fefce8] rounded-full">{email}</h6>
            )}
          </div>
          <div>
            <p className="text-md text-slate-700">Role</p>
            <h6 className="py-2 px-6 bg-[#fefce8] rounded-full">{role}</h6>
          </div>
          <div>
            <p className="text-md text-slate-700">Gender</p>
            {isEditing ? (
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="py-2 px-4 bg-gray-100 rounded w-full"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <div className="flex justify-start gap-4">
                <p
                  className={`${
                    gender === "male" ? "bg-[#fef08a]" : "bg-[#fffbeb]"
                  } py-2 px-4 border-lg rounded-full`}
                >
                  Male
                </p>
                <p
                  className={`${
                    gender === "female" ? "bg-[#fef08a]" : "bg-[#fffbeb]"
                  } py-2 px-4 border-lg rounded-full`}
                >
                  Female
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-auto rounded-lg order-1 sm:order-none">
        <ProfileCard
          profilePicture={profilePicture}
          name={name}
          email={email}
        />
      </div>
    </div>
  );
};

export default Profile;
