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
    <div className="w-full h-screen flex justify-center items-center bg-gray-950 overflow-hidden px-4">
      <div className="relative bg-gray-800/80 backdrop-blur-md border border-green-500/20 rounded-xl shadow-xl px-5 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 w-full max-w-[350px] sm:max-w-[400px] group transition-transform duration-500 hover:scale-[1.02]">
        {/* Border Effects */}
        <div className="absolute inset-0 rounded-xl pointer-events-none border-2 border-green-500 opacity-20 animate-pulse group-hover:opacity-40 transition duration-500"></div>
        <div className="absolute inset-0 rounded-xl pointer-events-none border border-green-400 blur-sm opacity-10 group-hover:opacity-30 transition duration-500"></div>

        {/* Logo */}
        <div className="text-center mb-4">
          <span className="text-green-400 font-bold text-xl sm:text-2xl tracking-widest">
            Movie<span className="text-white">Vista</span>
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-green-400 text-center mb-5">
          Create Account
        </h2>

        {/* Form */}
        <form className="space-y-4 sm:space-y-5">
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-green-400 text-sm" />
            <input
              type="text"
              placeholder="Name"
              className="w-full pl-10 pr-4 py-2 bg-gray-900/80 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 text-sm"
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-green-400 text-sm" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 bg-gray-900/80 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 text-sm"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-green-400 text-sm" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 bg-gray-900/80 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold text-white shadow-md hover:shadow-green-700 transition duration-300 text-sm"
          >
            Register
          </button>
        </form>

        {/* Switch to Login */}
        <p className="mt-4 text-center text-xs text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-400 hover:underline transition duration-200"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
