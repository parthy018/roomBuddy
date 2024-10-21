import { EyeIcon, GoogleIcon } from '../assets/svgIcons/Svg';
import { useForm } from 'react-hook-form';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const handleUserRegister = (data) => {
    console.log(data);
  };

  // Watch the password and confirm password fields for validation
  const password = watch('password');

  return (
    <section className="min-h-[100] flex items-center justify-center ">
      <div className="flex rounded-2xl max-w-3xl p-5 items-center border">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Register</h2>
          <p className="text-xs mt-4 text-[#002D74]">
            Create a new account and start your journey
          </p>

          <form onSubmit={handleSubmit(handleUserRegister)} className="flex flex-col gap-4">
            <input
              className="p-2 mt-8 rounded-xl border"
              type="text"
              {...register('username', { required: 'Username is required' })}
              placeholder="Username"
            />
            {errors.username && <span>{errors.username.message}</span>}

            <input
              className="p-2 rounded-xl border"
              type="email"
              {...register('email', { required: 'Email is required' })}
              placeholder="Email"
            />
            {errors.email && <span>{errors.email.message}</span>}

            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type="password"
                {...register('password', { required: 'Password is required' })}
                placeholder="Password"
              />
              <EyeIcon className="absolute top-1/3 right-3" />
              {errors.password && <span>{errors.password.message}</span>}
            </div>

            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type="password"
                {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: (value) =>
                    value === password || 'Passwords do not match',
                })}
                placeholder="Confirm Password"
              />
              <EyeIcon className="absolute top-1/3 right-3" />
              {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
            </div>

            <select
              className="p-2 rounded-xl border w-full"
              {...register('role', { required: 'Role is required' })}
            >
              <option value="">Select Role</option>
              <option value="host">Host</option>
              <option value="seeker">Seeker</option>
            </select>
            {errors.role && <span>{errors.role.message}</span>}

            <button
              type="submit"
              className="rounded-xl text-white py-2 hover:scale-105 duration-300"
            >
              Register
            </button>
          </form>

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          <button className="bg-white hover:bg-slate-300 border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
            <GoogleIcon className="ml-4" />
            Register with Google
          </button>

          <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
            <a href="#">Forgot your password?</a>
          </div>

          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>Already have an account?</p>
            <button className="py-2 px-5 border rounded-xl hover:scale-110 duration-300">
              Login
            </button>
          </div>
        </div>

        {/* Image section */}
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
