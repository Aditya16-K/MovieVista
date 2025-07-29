import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const Popular = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  // State for movies language wise (arrays)
  const [moviesData, setMoviesData] = useState({
    hollywood: [],
    bollywood: [],
    tollywood: [],
    kollywood: [],
    chinese: [],
    japanese: [],
  });

  // State for page per language (object)
  const [pages, setPages] = useState({
    hollywood: 1,
    bollywood: 1,
    tollywood: 1,
    kollywood: 1,
    chinese: 1,
    japanese: 1,
  });

  // State for total pages per language (object)
  const [totalPages, setTotalPages] = useState({
    hollywood: 1,
    bollywood: 1,
    tollywood: 1,
    kollywood: 1,
    chinese: 1,
    japanese: 1,
  });

  const [loading, setLoading] = useState(false);

  // Languages mapping
  const languages = {
    hollywood: "en",
    bollywood: "hi",
    tollywood: "te",
    kollywood: "ta",
    chinese: "zh",
    japanese: "ja",
  };

  // Fetch popular movies by language and page
  const fetchPopularByLanguage = async (langKey, langCode, page) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie`,
        {
          params: {
            api_key: apiKey,
            with_original_language: langCode,
            sort_by: "popularity.desc",
            page,
          },
        }
      );

      const filtered = response.data.results.filter((m) => m.poster_path);
      return {
        results: filtered,
        totalPages:
          response.data.total_pages > 500 ? 500 : response.data.total_pages,
      };
    } catch (error) {
      console.error(`${langKey} popular fetch error:`, error);
      return { results: [], totalPages: 1 };
    } finally {
      setLoading(false);
    }
  };

  // Fetch movies when page or apiKey changes for all languages
  useEffect(() => {
    const fetchAllLanguages = async () => {
      const keys = Object.keys(languages);

      // For each language, fetch movies for current page
      const promises = keys.map((key) =>
        fetchPopularByLanguage(key, languages[key], pages[key])
      );

      const results = await Promise.all(promises);

      // Prepare new data & total pages
      const newMoviesData = {};
      const newTotalPages = {};

      keys.forEach((key, idx) => {
        newMoviesData[key] = results[idx].results;
        newTotalPages[key] = results[idx].totalPages;
      });

      setMoviesData(newMoviesData);
      setTotalPages(newTotalPages);
    };

    fetchAllLanguages();
  }, [apiKey, pages]);

  // Handle page change for a language
  const handlePageChange = (langKey, direction) => {
    setPages((prev) => {
      const newPage =
        direction === "next"
          ? Math.min(prev[langKey] + 1, totalPages[langKey])
          : Math.max(prev[langKey] - 1, 1);
      return { ...prev, [langKey]: newPage };
    });
  };

  // Render one language section with pagination buttons
  const renderSection = (title, langKey) => (
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4 text-green-300">{title}</h3>
      {moviesData[langKey] && moviesData[langKey].length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {moviesData[langKey].map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={() => handlePageChange(langKey, "prev")}
              disabled={pages[langKey] === 1 || loading}
              className="px-3 py-1 bg-green-600 rounded disabled:bg-gray-700 cursor-pointer"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-lg">
              Page {pages[langKey]} / {totalPages[langKey]}
            </span>
            <button
              onClick={() => handlePageChange(langKey, "next")}
              disabled={pages[langKey] === totalPages[langKey] || loading}
              className="px-3 py-1 bg-green-600 rounded disabled:bg-gray-700 cursor-pointer"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No popular movies found for {title}.</p>
      )}
    </div>
  );

  return (
    <div className="bg-gray-950 min-h-screen text-white max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-6">
      <h2 className="text-2xl font-bold mb-6 text-green-400">Popular Movies</h2>
      {loading && <p className="text-center">Loading...</p>}

      {!loading && (
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

export default Popular;
