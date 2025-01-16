import React, { useState } from "react";
import { useChangePasswordMutation } from "../app/appSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const PasswordChange = ({ setIsChangePassword }) => {
  const [changePassword] = useChangePasswordMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordChangeData, setPasswordChangeData] = useState({
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordChangeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitPasswordChange = async () => {
    if (
      !passwordChangeData.old_password ||
      !passwordChangeData.new_password ||
      !passwordChangeData.confirm_new_password
    ) {
      setErrorMessage("All fields are required");
      return;
    }

    if (
      passwordChangeData.new_password !==
      passwordChangeData.confirm_new_password
    ) {
      setErrorMessage("New password and confirmation do not match");
      // setPasswordChangeData({
      //     old_password: "",
      //     new_password: "",
      //     confirm_new_password: "",
      //   })
      return;
    }
    if (passwordChangeData.new_password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
    }
    try {
      await changePassword(passwordChangeData).unwrap();
      toast.success("Password changed successfully", {
        position: "right-center",
      });
      setIsChangePassword(false);
    } catch (error) {
      const errorMsg = error?.data?.error || "Something went wrong";
      setErrorMessage(errorMsg);
    }
  };

  return (
    <div className="">
      <div className="relative">
        <p className="text-md text-slate-700">Old Password</p>
        <input
          type={`${showOldPassword ? "text" : "password"}`}
          name="old_password"
          value={passwordChangeData.old_password}
          onChange={handleInputChange}
          className="py-2 px-4 bg-gray-200 rounded w-full"
        />
        {showOldPassword ? (
          <FaEyeSlash
            onClick={() => setShowOldPassword(false)}
            className="absolute top-1/2 right-3 cursor-pointer"
          />
        ) : (
          <FaEye
            onClick={() => setShowOldPassword(true)}
            className="absolute top-1/2 right-3 cursor-pointer"
          />
        )}
      </div>
      <div className="relative">
        <p className="text-md text-slate-700">New Password</p>
        <input
          type={`${showNewPassword ? "text" : "password"}`}
          name="new_password"
          value={passwordChangeData.new_password}
          onChange={handleInputChange}
          className="py-2 px-4 bg-gray-200 rounded w-full"
        />
        {showNewPassword ? (
          <FaEyeSlash
            onClick={() => setShowNewPassword(false)}
            className="absolute top-1/2 right-3 cursor-pointer"
          />
        ) : (
          <FaEye
            onClick={() => setShowNewPassword(true)}
            className="absolute top-1/2 right-3 cursor-pointer"
          />
        )}
      </div>
      <div className="relative">
        <p className="text-md text-slate-700">Confirm New Password</p>
        <input
          type={`${showConfirmPassword ? "text" : "password"}`}
          name="confirm_new_password"
          value={passwordChangeData.confirm_new_password}
          onChange={handleInputChange}
          className="py-2 px-4 bg-gray-200 rounded w-full"
        />
        {showConfirmPassword ? (
          <FaEyeSlash
            onClick={() => setShowConfirmPassword(false)}
            className="absolute top-1/2 right-3 cursor-pointer"
          />
        ) : (
          <FaEye
            onClick={() => setShowConfirmPassword(true)}
            className="absolute top-1/2 right-3 cursor-pointer"
          />
        )}
      </div>
      <span className="text-red-500">{errorMessage}</span>
      <button onClick={handleSubmitPasswordChange} className="mt-4 ml-24">
        Update password
      </button>
    </div>
  );
};

export default PasswordChange;
