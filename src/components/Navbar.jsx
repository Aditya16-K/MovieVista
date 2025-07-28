import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaUserPlus,
  FaSignInAlt,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import newlogo from "../assets/newlogo.png";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMenuOpen(false); // close mobile menu on search
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Popular", path: "/popular" },
    { name: "Browse", path: "/browse-movies" },
    { name: "Trending", path: "/trending" },
    { name: "Top Rated", path: "/toprated" },
    { name: "Upcoming", path: "/upcoming" },
    { name: "Now Playing", path: "/nowplaying" }, // ✅ Added Now Playing
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow">
      {/* Top Row */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo */}
        <Link to="/" className=" sm:text-2xl">
          <img src={newlogo} className="h-[60px]" alt="" />
        </Link>

        {/* Search Center (desktop only) */}
        <form
          onSubmit={handleSubmit}
          className="hidden sm:flex flex-1 justify-center max-w-lg mx-4"
        >
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow px-4 py-3 rounded-l bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:ring-0.5 focus:ring-green-500 focus:outline-none transition duration-300 text-sm"
          />

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded-r"
          >
            <FaSearch />
          </button>
        </form>

        {/* Right Icons (desktop only) */}
        <div className="hidden sm:flex items-center gap-5 text-white text-sm font-semibold">
          <Link
            to="/login"
            className="hover:text-green-400 flex items-center gap-3"
          >
            <FaSignInAlt className="text-2xl" /> Login
          </Link>
          <Link
            to="/register"
            className="hover:text-green-400 flex items-center gap-1"
          >
            <FaUserPlus className="text-2xl" /> Register
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-xl focus:outline-none"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-3 bg-gray-800">
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow px-3 py-2 rounded-l bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-r"
            >
              <FaSearch />
            </button>
          </form>

          <Link to="/login" className="block text-sm hover:text-green-400">
            <FaSignInAlt className="inline mr-1" /> Login
          </Link>
          <Link to="/register" className="block text-sm hover:text-green-400">
            <FaUserPlus className="inline mr-1" /> Register
          </Link>
        </div>
      )}

      {/* Bottom Navigation Links */}
      <div className="bg-gray-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4 py-3 text-white font-semibold text-sm sm:text-base">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`hover:text-green-400 border-b-2 ${
                isActive(link.path)
                  ? "border-green-400 text-green-400"
                  : "border-transparent"
              } transition pb-1`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
