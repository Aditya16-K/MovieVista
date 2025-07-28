import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const Upcoming = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
      )
      .then((res) => {
        const filtered = res.data.results.filter((m) => m.poster_path);
        setMovies(filtered);
      })
      .catch((err) => console.error("Upcoming fetch error:", err))
      .finally(() => setLoading(false));
  }, [apiKey]);

  return (
    <div className="bg-gray-950 min-h-screen text-white max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-6 scrollable-content overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Upcoming Movies</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Upcoming;
