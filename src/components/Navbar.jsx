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
    { name: "Now Playing", path: "/nowplaying" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-md backdrop-blur-sm">
      {/* Top Row */}
      <div
        className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2"
        style={{ minHeight: "52px" }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 transform transition-transform duration-300 hover:scale-105"
          aria-label="Homepage"
        >
          <img src={newlogo} className="h-14 w-auto" alt="Logo" />
        </Link>

        {/* Search Center (desktop only) */}
        <form
          onSubmit={handleSubmit}
          className="hidden sm:flex flex-1 max-w-md mx-6"
          role="search"
        >
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow px-3 py-2 rounded-l-md bg-gray-800 text-white border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none transition duration-300 text-sm placeholder-gray-400"
            aria-label="Search movies"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-r-md shadow-md transition duration-300"
            aria-label="Search"
          >
            <FaSearch />
          </button>
        </form>

        {/* Right Icons (desktop only) */}
        <div className="hidden sm:flex items-center gap-5 text-white text-sm font-semibold select-none">
          <Link
            to="/login"
            className="hover:text-green-400 flex items-center gap-2 transition duration-300"
          >
            <FaSignInAlt className="text-xl" /> Login
          </Link>
          <Link
            to="/register"
            className="hover:text-green-400 flex items-center gap-1 transition duration-300"
          >
            <FaUserPlus className="text-xl" /> Register
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-2xl focus:outline-none transition-transform duration-200"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`sm:hidden bg-gray-800 overflow-hidden transition-max-height duration-500 ease-in-out ${
          menuOpen ? "max-h-screen py-4 px-4" : "max-h-0"
        } backdrop-blur-md`}
      >
        <form onSubmit={handleSubmit} className="flex mb-3" role="search">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow px-3 py-2 rounded-l bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm placeholder-gray-400"
            aria-label="Search movies"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-r shadow-md transition duration-300"
            aria-label="Search"
          >
            <FaSearch />
          </button>
        </form>

        <Link
          to="/login"
          className="block text-sm py-2 hover:text-green-400 transition duration-300"
          onClick={() => setMenuOpen(false)}
        >
          <FaSignInAlt className="inline mr-2" /> Login
        </Link>
        <Link
          to="/register"
          className="block text-sm py-2 hover:text-green-400 transition duration-300"
          onClick={() => setMenuOpen(false)}
        >
          <FaUserPlus className="inline mr-2" /> Register
        </Link>
      </div>

      {/* Bottom Navigation Links */}
      <div className="bg-gray-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 py-2 text-white font-semibold text-sm sm:text-base select-none">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative px-2 py-1 border-b-2 border-transparent transition-all duration-300 ${
                isActive(link.path)
                  ? "text-green-400 border-green-400 font-bold"
                  : "hover:text-green-400 hover:border-green-400"
              }`}
            >
              {link.name}

              {/* Underline Animation */}
              <span
                className={`absolute left-0 bottom-0 w-full h-[2px] bg-green-400 transition-transform duration-300 ${
                  isActive(link.path)
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                } origin-left`}
              />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
