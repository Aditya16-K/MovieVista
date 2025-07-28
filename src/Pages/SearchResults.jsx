import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const SearchResults = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const location = useLocation();

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSearchQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get("query") || "";
  };

  useEffect(() => {
    const searchQuery = getSearchQuery().trim();

    if (searchQuery.length === 0) {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
          searchQuery
        )}&language=en-US&page=1&include_adult=false`
      )
      .then((res) => {
        setSearchResults(res.data.results || []);
      })
      .catch((err) => console.error("Error fetching search results:", err))
      .finally(() => setLoading(false));
  }, [location.search, apiKey]);

  const searchQuery = getSearchQuery();

  return (
    <div className="px-6 sm:px-10 lg:px-20 py-6 bg-gray-950 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-4">
        Search results for "{searchQuery}"
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {searchResults.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
