import { EyeIcon,  GoogleIcon } from "../assets/svgIcons/Svg"; // Assume you have EyeOffIcon
import { FaRegEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setCredentials } from "../app/authSlice";
import { useRegisterMutation } from "../app/appSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import avataaars1 from "../assets/profile/avataaars1.png";
import avataaars2 from "../assets/profile/avataaars2.png";
import avataaars3 from "../assets/profile/avataaars3.png";
import avataaars4 from "../assets/profile/avataaars4.png";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerUser, { isLoading, error }] = useRegisterMutation();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
  const password = watch("password");

  const handleUserRegister = async (data) => {
    try {
      console.log(data);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("role", data.role);
      formData.append("gender", data.gender);

      if (uploadedImage) {
        formData.append("profilePicture", uploadedImage);
      } else if (selectedAvatar) {
        formData.append("profilePicture", selectedAvatar);
      }
      const formDataObj = Array.isArray(formData) ? formData : Object.fromEntries(formData);

      console.log(formDataObj);
      const response = await registerUser(formData).unwrap();
      dispatch(setCredentials(response));
      navigate("/");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    setUploadedImage(null); // Clear uploaded image if an avatar is selected
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(file);
        setSelectedAvatar(null); // Clear selected avatar if a custom image is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle show/hide password
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword); // Toggle show/hide confirm password
  };

  return (
    <section className="min-h-[100] flex items-center justify-center">
      <div className="flex rounded-2xl max-w-5xl p-5 items-center border">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Register</h2>
          <p className="text-xs mt-4 text-[#002D74]">
            Create a new account and start your journey
          </p>

          <form
            onSubmit={handleSubmit(handleUserRegister)}
            className="flex flex-col gap-4"
          >
            <div className="flex gap-4">
              <input
                className="p-2 rounded-xl border w-1/2"
                type="text"
                {...register("name", { required: "Username is required" })}
                placeholder="Username"
              />
              <input
                className="p-2 rounded-xl border w-1/2"
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Email"
              />
            </div>
            {errors.name && <span>{errors.name.message}</span>}
            {errors.email && <span>{errors.email.message}</span>}

            <div className="flex gap-4">
              <div className="relative w-1/2">
                <input
                  className="p-2 rounded-xl border w-full"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Password"
                />
                {showPassword ? (
                  <FaRegEyeSlash
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/3 right-3 cursor-pointer"
                  />
                ) : (
                  <EyeIcon
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/3 right-3 cursor-pointer"
                  />
                )}
                {errors.password && <span>{errors.password.message}</span>}
              </div>

              <div className="relative w-1/2">
                <input
                  className="p-2 rounded-xl border w-full"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  placeholder="Confirm Password"
                />
                {showConfirmPassword ? (
                  <FaRegEyeSlash
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute top-1/3 right-3 cursor-pointer"
                  />
                ) : (
                  <EyeIcon
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute top-1/3 right-3 cursor-pointer"
                  />
                )}
                {errors.confirmPassword && (
                  <span>{errors.confirmPassword.message}</span>
                )}
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="male"
                  {...register("gender", { required: "Gender is required" })}
                  className="form-radio"
                />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="female"
                  {...register("gender", { required: "Gender is required" })}
                  className="form-radio"
                />
                Female
              </label>
            </div>
            {errors.gender && <span>{errors.gender.message}</span>}

            <select
              className="p-2 rounded-xl border w-full mt-4"
              {...register("role", { required: "Role is required" })}
            >
              <option value="">Select Role</option>
              <option value="host">Host</option>
              <option value="seeker">Seeker</option>
            </select>
            {errors.role && <span>{errors.role.message}</span>}

            <div className="mt-4">
              <p className="text-sm mb-2">
                Choose an avatar or upload your image:
              </p>
              <div className="flex gap-4">
                {[avataaars1, avataaars2, avataaars3, avataaars4].map(
                  (avatar, index) => (
                    <img
                      key={index}
                      src={avatar}
                      alt={`Avatar ${index + 1}`}
                      className={`w-16 h-16 rounded-full cursor-pointer ${
                        selectedAvatar === avatar
                          ? "border-2 border-blue-500"
                          : ""
                      }`}
                      onClick={() => handleAvatarSelect(avatar)}
                    />
                  )
                )}
              </div>

              <div className="mt-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              {uploadedImage && (
                <img
                  src={URL.createObjectURL(uploadedImage)}
                  alt="Uploaded"
                  className="w-16 h-16 rounded-full mt-2"
                />
              )}
            </div>

            {errors.avatar && <span>{errors.avatar.message}</span>}
            <button className="bg-white hover:bg-slate-300 border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
              <GoogleIcon className="ml-4" />
              Register with Google
            </button>

            <button
              type="submit"
              className="rounded-xl text-white py-2 hover:scale-105 duration-300 mt-6"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>

          {error && (
            <p className="text-red-500 mt-2">
              Registration failed. Please try again.
            </p>
          )}
        </div>
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl"
            src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
            alt="Register illustration"
          />
        </div>
      </div>
    </section>
  );
};

export default Register;
