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
    <div className="w-full min-h-screen flex justify-center items-center text-white px-4 relative overflow-hidden bg-gray-950 ">
      <div className="relative z-10 group transition-transform duration-500 hover:scale-[1.02]">
        <div className="relative bg-gray-800/70 backdrop-blur-md p-8 rounded-3xl w-full max-w-sm shadow-xl overflow-hidden border border-green-500/20  mb-2 mt-12">
          <div className="absolute inset-0 rounded-3xl pointer-events-none border-2 border-green-500 opacity-30 animate-pulse group-hover:opacity-50 transition duration-500"></div>
          <div className="absolute inset-0 rounded-3xl pointer-events-none border border-green-400 blur-sm opacity-20 group-hover:opacity-40 transition duration-500"></div>

          <div className="text-center mb-6">
            <span className="text-green-400 font-bold text-2xl tracking-widest">
              Movie<span className="text-white">Vista</span>
            </span>
          </div>

          <h2 className="text-3xl font-extrabold mb-6 text-center text-green-400 drop-shadow-lg">
            Create Account
          </h2>

          <form className="space-y-5">
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-green-400" />
              <input
                type="text"
                placeholder="Name"
                className="w-full pl-10 pr-4 py-2 bg-gray-900/80 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 placeholder-gray-400"
              />
            </div>

            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-green-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-2 bg-gray-900/80 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 placeholder-gray-400"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-green-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2 bg-gray-900/80 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 placeholder-gray-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-xl font-semibold text-white shadow-md hover:shadow-green-700 transition duration-300"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-300">
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
