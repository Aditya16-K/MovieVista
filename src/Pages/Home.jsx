import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const location = useLocation();

  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to get search param from URL
  const getSearchQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get("search") || "";
  };

  useEffect(() => {
    if (!apiKey) {
      setError("API key is missing. Please set your TMDB API key.");
      setLoading(false);
      return;
    }

    const searchQuery = getSearchQuery().trim();
    setLoading(true);
    setError(null);

    if (searchQuery.length > 0) {
      // Search API call
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
            searchQuery
          )}&language=en-US&page=1&include_adult=false`
        )
        .then((res) => {
          setSearchResults(res.data.results || []);
        })
        .catch((err) => {
          console.error("Error fetching search results:", err);
          setError(
            "Failed to fetch search results. Please check your internet connection."
          );
        })
        .finally(() => setLoading(false));
    } else {
      // Default fetch all sections
      const fetchTrending = axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
      );
      const fetchPopular = axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
      );
      const fetchUpcoming = axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
      );
      const fetchTopRated = axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
      );

      Promise.all([fetchTrending, fetchPopular, fetchUpcoming, fetchTopRated])
        .then(([trendingRes, popularRes, upcomingRes, topRatedRes]) => {
          setTrending(trendingRes.data.results.slice(0, 5));
          setPopular(popularRes.data.results.slice(0, 5));
          setUpcoming(upcomingRes.data.results.slice(0, 5));
          setTopRated(topRatedRes.data.results.slice(0, 5));
          setSearchResults([]);
        })
        .catch((err) => {
          console.error("Error fetching home page data:", err);
          setError(
            "Failed to fetch home page data. Please check your internet connection."
          );
        })
        .finally(() => setLoading(false));
    }
  }, [apiKey, location.search]);

  const renderSection = (title, movies, link) => (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4 px-1 sm:px-2 md:px-0">
        <h2 className="text-xl sm:text-2xl font-semibold">{title}</h2>
        <Link
          to={link}
          className="text-green-400 hover:text-green-600 transition-colors duration-300 text-sm sm:text-base"
        >
          View More
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p className="text-center text-gray-400">No movies found.</p>
        )}
      </div>
    </section>
  );

  const searchQuery = getSearchQuery();

  return (
    <main className="bg-gray-950 min-h-screen text-white max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-6">
      {loading ? (
        <div className="text-center text-lg sm:text-xl font-medium">
          Loading...
        </div>
      ) : error ? (
        <div className="text-center text-red-500 font-semibold my-6">
          {error}
        </div>
      ) : searchQuery ? (
        <>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 px-1 sm:px-0">
            Search results for "{searchQuery}"
          </h2>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {searchResults.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">No results found.</p>
          )}
        </>
      ) : (
        <>
          {renderSection("Trending Today", trending, "/trending")}
          {renderSection("Popular Movies", popular, "/popular")}
          {renderSection("Upcoming Movies", upcoming, "/upcoming")}
          {renderSection("Top Rated Movies", topRated, "/toprated")}
        </>
      )}
    </main>
  );
};

export default Home;
