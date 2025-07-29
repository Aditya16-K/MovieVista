import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const TopRated = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const [pages, setPages] = useState({
    hollywood: 1,
    bollywood: 1,
    tollywood: 1,
    kollywood: 1,
    chinese: 1,
    japanese: 1,
  });

  const [moviesData, setMoviesData] = useState({
    hollywood: [],
    bollywood: [],
    tollywood: [],
    kollywood: [],
    chinese: [],
    japanese: [],
  });

  const [totalPages, setTotalPages] = useState({
    hollywood: 1,
    bollywood: 1,
    tollywood: 1,
    kollywood: 1,
    chinese: 1,
    japanese: 1,
  });

  const [loading, setLoading] = useState(true);

  const fetchTopRatedMovies = async (langKey, langCode, pageNum) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=${langCode}&sort_by=vote_average.desc&vote_count.gte=100&page=${pageNum}`
      );
      const filteredMovies = response.data.results.filter((m) => m.poster_path);
      setMoviesData((prev) => ({ ...prev, [langKey]: filteredMovies }));
      setTotalPages((prev) => ({
        ...prev,
        [langKey]:
          response.data.total_pages > 500 ? 500 : response.data.total_pages,
      }));
    } catch (err) {
      console.error(`${langKey} fetch error:`, err);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchTopRatedMovies("hollywood", "en", pages.hollywood),
      fetchTopRatedMovies("bollywood", "hi", pages.bollywood),
      fetchTopRatedMovies("tollywood", "te", pages.tollywood),
      fetchTopRatedMovies("kollywood", "ta", pages.kollywood),
      fetchTopRatedMovies("chinese", "zh", pages.chinese),
      fetchTopRatedMovies("japanese", "ja", pages.japanese),
    ]).finally(() => setLoading(false));
  }, [pages]);

  const handlePageChange = (langKey, direction) => {
    setPages((prev) => ({
      ...prev,
      [langKey]:
        direction === "prev"
          ? Math.max(prev[langKey] - 1, 1)
          : Math.min(prev[langKey] + 1, totalPages[langKey]),
    }));
  };

  const renderSection = (title, langKey) => (
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4 text-green-300">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {moviesData[langKey].map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={() => handlePageChange(langKey, "prev")}
          disabled={pages[langKey] === 1}
          className="px-4 py-2 bg-green-600 rounded disabled:bg-gray-700 cursor-pointer"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-sm sm:text-base">
          Page {pages[langKey]} / {totalPages[langKey]}
        </span>
        <button
          onClick={() => handlePageChange(langKey, "next")}
          disabled={pages[langKey] === totalPages[langKey]}
          className="px-4 py-2 bg-green-600 rounded disabled:bg-gray-700 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-950 min-h-screen text-white max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-6">
      <h2 className="text-2xl font-bold mb-6 text-green-400">
        Top Rated Movies
      </h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          {renderSection("Hollywood", "hollywood")}
          {renderSection("Bollywood", "bollywood")}
          {renderSection("Tollywood", "tollywood")}
          {renderSection("Kollywood", "kollywood")}
          {renderSection("Chinese", "chinese")}
          {renderSection("Japanese", "japanese")}
        </>
      )}
    </div>
  );
};

export default TopRated;
