import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const Trending = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const [hollywood, setHollywood] = useState([]);
  const [bollywood, setBollywood] = useState([]);
  const [tollywood, setTollywood] = useState([]);
  const [kollywood, setKollywood] = useState([]);
  const [chinese, setChinese] = useState([]);
  const [japanese, setJapanese] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    setLoading(true);

    const fetchHollywood = axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
    );

    const fetchBollywood = axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=hi&sort_by=popularity.desc`
    );

    const fetchTollywood = axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=te&sort_by=popularity.desc`
    );

    const fetchKollywood = axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=ta&sort_by=popularity.desc`
    );

    const fetchchinese = axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=zh&sort_by=popularity.desc`
    );

    const fetchJapanese = axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=ja&sort_by=popularity.desc`
    );

    Promise.all([
      fetchHollywood,
      fetchBollywood,
      fetchTollywood,
      fetchKollywood,
      fetchchinese,
      fetchJapanese,
    ])
      .then(([hollyRes, bollyRes, tollyRes, kollyRes, chinRes, japRes]) => {
        const filterReleased = (movies) =>
          movies.filter(
            (m) => m.poster_path && m.release_date && m.release_date <= today
          );

        setHollywood(filterReleased(hollyRes.data.results));
        setBollywood(filterReleased(bollyRes.data.results));
        setTollywood(filterReleased(tollyRes.data.results));
        setKollywood(filterReleased(kollyRes.data.results));
        setChinese(filterReleased(chinRes.data.results));
        setJapanese(filterReleased(japRes.data.results)); // fixed here
      })

      .catch((err) => console.error("Trending fetch error:", err))
      .finally(() => setLoading(false));
  }, [apiKey]);

  const renderSection = (title, movies) => (
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4 text-green-300">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-950 min-h-screen text-white max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-6">
      <h2 className="text-2xl font-bold mb-6 text-green-400">
        Trending Movies
      </h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          {renderSection("Hollywood Trending", hollywood)}
          {renderSection("Bollywood Trending", bollywood)}
          {renderSection("Tollywood Trending", tollywood)}
          {renderSection("Kollywood Trending", kollywood)}
          {renderSection("Chinese Trending", chinese)}
          {renderSection("Japanese Trending", japanese)}
        </>
      )}
    </div>
  );
};

export default Trending;
