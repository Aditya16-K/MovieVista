import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  if (!movie || !movie.poster_path) return null;

  const imgBase = "https://image.tmdb.org/t/p/w500";
  const imgSrc = `${imgBase}${movie.poster_path}`;

  const title = movie.title || movie.original_title || "Untitled";
  const overview = movie.overview || "No description available.";
  const movieId = movie.id;

  return (
    <div
      className="relative rounded-lg overflow-hidden shadow-md group transition-transform duration-300 w-full max-w-[220px] mx-auto border-2 border-green-600 hover:scale-105"
      tabIndex={0} // keyboard focus
      aria-label={`Movie: ${title}`}
    >
      <img
        src={imgSrc}
        alt={title}
        loading="lazy"
        className="w-full h-[320px] object-cover rounded-lg"
      />
      <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm opacity-0 group-hover:opacity-80 rounded-lg transition-opacity duration-300 pointer-events-none" />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 py-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <h3 className="text-white font-bold text-base md:text-lg mb-2 line-clamp-1">
          {title}
        </h3>
        <p className="text-gray-100 text-sm mb-4 line-clamp-3">{overview}</p>
        <Link
          to={`/movie/${movieId}`}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full text-sm shadow-md transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
