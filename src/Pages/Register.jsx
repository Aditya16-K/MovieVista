import React, { useEffect } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center text-white px-4 sm:px-6 md:px-8 lg:px-10 bg-gray-950 ">
      <div className="relative z-10 group transition-transform duration-500 hover:scale-[1.02] w-full max-w-sm sm:max-w-md md:max-w-lg ">
        <div className="relative bg-gray-800/70 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-xl border border-green-500/20 mb-45">
          {/* Logo */}
          <div className="text-center mb-4 sm:mb-6">
            <span className="text-green-400 font-bold text-2xl sm:text-3xl tracking-widest">
              Movie<span className="text-white">Vista</span>
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-5 sm:mb-6 text-center text-green-400 drop-shadow-lg">
            Create Account
          </h2>

          {/* Form */}
          <form className="space-y-4 sm:space-y-5 ">
            {/* Name */}
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-green-400 text-sm sm:text-base" />
              <input
                type="text"
                placeholder="Name"
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-gray-900/80 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 placeholder-gray-400 text-sm sm:text-base"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-green-400 text-sm sm:text-base" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-gray-900/80 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 placeholder-gray-400 text-sm sm:text-base"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-green-400 text-sm sm:text-base" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-gray-900/80 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 placeholder-gray-400 text-sm sm:text-base"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 py-2 sm:py-2.5 rounded-xl font-semibold text-white shadow-md hover:shadow-green-700 transition duration-300 text-sm sm:text-base"
            >
              Register
            </button>
          </form>

          {/* Link */}
          <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-center text-gray-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-400 hover:underline cursor-pointer transition duration-200"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
