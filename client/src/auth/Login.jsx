import {GoogleIcon } from '../assets/svgIcons/Svg';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import {  useDispatch } from 'react-redux';
import { setCredentials } from '../app/authSlice';
import { useLoginMutation } from '../app/appSlice';
import { useNavigate } from 'react-router-dom';
import { FaEye,FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [login, { isLoading, error }] = useLoginMutation();

  const handleUserLogin = async (data) => {
    try {
      const userData = await login(data).unwrap(); 
      console.log('Logged in successfully:', userData);
      dispatch(setCredentials(userData)); 
      navigate('/'); 
    } catch (err) {
      console.error('Failed to log in:', err); // Handle login error
    }
  };

  return (
    <section className="min-h-[100] flex items-center justify-center">
      <div className="flex rounded-2xl max-w-3xl p-5 items-center border">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
          <p className="text-xs mt-4 text-[#002D74]">
            If you are already a member, easily log in
          </p>

          <form onSubmit={handleSubmit(handleUserLogin)} className="flex flex-col gap-4">
            <input
              className="p-2 mt-8 rounded-xl border"
              type="email"
              {...register('email', { required: true })}
              placeholder="Email"
            />
            {errors.email && <span>This field is required</span>}
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type={isPasswordVisible ? 'text' : 'password'}
                {...register('password', { required: true })}
                placeholder="Password"
              />
              {
                isPasswordVisible ? (
                  <FaEyeSlash className="absolute top-1/3 right-3" onClick={() => setIsPasswordVisible(false)} />
                ) : (
                  <FaEye className="absolute top-1/3 right-3" onClick={() => setIsPasswordVisible(true)} />
                )
              }
              {/* <FaEye className="absolute top-1/3 right-3" /> */}
              {errors.password && <span>This field is required</span>}
            </div>
            <button
              type="submit"
              className="rounded-xl text-white py-2 hover:scale-105 duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {error && <p className="text-red-500 mt-2">Login failed. Please check your credentials.</p>}

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          <button className="bg-white hover:bg-slate-300 border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
            <GoogleIcon className="ml-4" />
            Login with Google
          </button>

          <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
            <a href="#">Forgot your password?</a>
          </div>

          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>Don&apos;t have an account?</p>
            <button onClick={()=>navigate('/register')} className="py-2 px-5 border rounded-xl hover:scale-110 duration-300">
              Register
            </button>
          </div>
        </div>

        {/* Image section */}
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl"
            src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
            alt="Login illustration"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
