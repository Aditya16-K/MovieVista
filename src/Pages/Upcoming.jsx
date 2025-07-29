import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const Upcoming = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const [moviesData, setMoviesData] = useState({
    hollywood: [],
    bollywood: [],
    tollywood: [],
    kollywood: [],
    chinese: [],
    japanese: [],
  });

  const [loading, setLoading] = useState(true);

  const fetchUpcomingByLanguage = async (langKey, langCode) => {
    try {
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie`,
        {
          params: {
            api_key: apiKey,
            with_original_language: langCode,
            "primary_release_date.gte": today,
            sort_by: "primary_release_date.asc",
            page: 1,
          },
        }
      );

      // Filter movies jinke paas poster ho aur release date aaj ya aage ho (double safety)
      const filtered = response.data.results.filter(
        (m) => m.poster_path && m.release_date && m.release_date >= today
      );

      return filtered;
    } catch (error) {
      console.error(`${langKey} upcoming fetch error:`, error);
      return [];
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchUpcomingByLanguage("hollywood", "en"),
      fetchUpcomingByLanguage("bollywood", "hi"),
      fetchUpcomingByLanguage("tollywood", "te"),
      fetchUpcomingByLanguage("kollywood", "ta"),
      fetchUpcomingByLanguage("chinese", "zh"),
      fetchUpcomingByLanguage("japanese", "ja"),
    ])
      .then(
        ([hollywood, bollywood, tollywood, kollywood, chinese, japanese]) => {
          setMoviesData({
            hollywood,
            bollywood,
            tollywood,
            kollywood,
            chinese,
            japanese,
          });
        }
      )
      .finally(() => setLoading(false));
  }, [apiKey]);

  const renderSection = (title, langKey) => (
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4 text-green-300">{title}</h3>
      {moviesData[langKey].length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {moviesData[langKey].map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>No upcoming movies found for {title}.</p>
      )}
    </div>
  );

  return (
    <div className="bg-gray-950 min-h-screen text-white max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-6">
      <h2 className="text-2xl font-bold mb-6 text-green-400">
        Upcoming Movies
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

export default Upcoming;
