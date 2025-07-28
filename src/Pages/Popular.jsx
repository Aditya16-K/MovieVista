import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const Popular = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
      )
      .then((res) => {
        setMovies(res.data.results.filter((m) => m.poster_path));
        setTotalPages(res.data.total_pages > 500 ? 500 : res.data.total_pages);
      })
      .catch((err) => console.error("Popular fetch error:", err))
      .finally(() => setLoading(false));
  }, [apiKey, page]);

  return (
    <div className="bg-gray-950 min-h-screen text-white max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-6">
      <h2 className="text-2xl font-bold mb-6">Popular Movies</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-green-600 rounded disabled:bg-gray-700 cursor-pointer"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-lg">
              Page {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-green-600 rounded disabled:bg-gray-700 cursor-pointer"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Popular;
