import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { faker } from "@faker-js/faker";

const generateFakeReviews = (count = 10) => {
  return Array.from({ length: count }).map(() => ({
    author: faker.person.fullName(),
    content: faker.lorem.sentences(3),
    created_at: faker.date.past().toISOString().split("T")[0],
    rating: Math.floor(Math.random() * 5) + 6,
  }));
};

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFullSummary, setShowFullSummary] = useState(false);
  const [showAllCast, setShowAllCast] = useState(false);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  // Placeholder torrent magnet links - replace with your actual links
  const torrentLinks = {
    "480p": "magnet:?xt=urn:btih:EXAMPLEHASH480p",
    "720p": "magnet:?xt=urn:btih:EXAMPLEHASH720p",
    "1080p": "magnet:?xt=urn:btih:EXAMPLEHASH1080p",
    "4K": "magnet:?xt=urn:btih:EXAMPLEHASH4K",
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&append_to_response=videos,credits`
      )
      .then((res) => {
        setMovie(res.data);
        return axios.get(
          `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}&language=en-US&page=1`
        );
      })
      .then((res) => {
        if (res.data.results && res.data.results.length > 0) {
          setReviews(res.data.results);
        } else {
          setReviews(generateFakeReviews(8));
        }
      })
      .catch((err) => {
        console.error("Error fetching movie or reviews:", err);
        setReviews(generateFakeReviews(8));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, apiKey]);

  if (loading || !movie) {
    return (
      <div className="text-white p-6 text-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  const trailer =
    movie.videos?.results?.find(
      (vid) =>
        vid.site === "YouTube" &&
        vid.type === "Trailer" &&
        vid.official === true
    ) || movie.videos?.results?.find((vid) => vid.site === "YouTube");

  const visibleCast = showAllCast
    ? movie.credits?.cast
    : movie.credits?.cast?.slice(0, 10);

  const summaryText = movie.overview || "No description available.";

  return (
    <div className="bg-gray-950 text-white min-h-screen px-6 sm:px-10 lg:px-20 py-6">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Poster */}
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.title}
          className="rounded-lg shadow-lg border-2 border-green-600 w-[250px] h-auto object-contain flex-shrink-0"
        />

        {/* Movie Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-wide mb-1">
              {movie.title}{" "}
              <span className="text-green-400 font-semibold">
                ({movie.release_date?.slice(0, 4)})
              </span>
            </h1>
            <p className="italic text-gray-400 mb-3">{movie.tagline}</p>

            <p className="text-lg leading-relaxed mb-2">
              {showFullSummary ? summaryText : summaryText.slice(0, 300)}
              {summaryText.length > 300 && (
                <span
                  className="text-green-400 cursor-pointer ml-2"
                  onClick={() => setShowFullSummary(!showFullSummary)}
                >
                  {showFullSummary ? "Show Less" : "Show More"}
                </span>
              )}
            </p>

            {/* Movie Details in 2 Rows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300 mt-4">
              <p>
                <strong className="text-green-400">Genres:</strong>{" "}
                {movie.genres?.map((g) => g.name).join(", ") || "N/A"}
              </p>
              <p>
                <strong className="text-green-400">Runtime:</strong>{" "}
                {movie.runtime ? `${movie.runtime} mins` : "N/A"}
              </p>
              <p>
                <strong className="text-green-400">Release Date:</strong>{" "}
                {movie.release_date || "N/A"}
              </p>
              <p>
                <strong className="text-green-400">Language:</strong>{" "}
                {movie.original_language?.toUpperCase() || "N/A"}
              </p>
              <p>
                <strong className="text-green-400">Rating:</strong>{" "}
                {movie.vote_average?.toFixed(1)} / 10 ({movie.vote_count} votes)
              </p>
              <p>
                <strong className="text-green-400">Status:</strong>{" "}
                {movie.status || "N/A"}
              </p>
              {movie.homepage && (
                <p>
                  <strong className="text-green-400">Official Site:</strong>{" "}
                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-green-500"
                  >
                    Visit
                  </a>
                </p>
              )}
              {movie.budget ? (
                <p>
                  <strong className="text-green-400">Budget:</strong> $
                  {movie.budget.toLocaleString()}
                </p>
              ) : null}
              {movie.revenue ? (
                <p>
                  <strong className="text-green-400">Revenue:</strong> $
                  {movie.revenue.toLocaleString()}
                </p>
              ) : null}
            </div>

            {/* Download Links */}
            <div className="mt-6">
              <h2 className="font-bold text-2xl mb-3 border-b border-green-600 pb-1">
                🎬 Download Links
              </h2>
              <div className="flex flex-wrap gap-4">
                {["480p", "720p", "1080p", "4K"].map((quality) => (
                  <a
                    key={quality}
                    href={torrentLinks[quality] || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-green-600 hover:bg-green-700 px-5 py-2 text-sm rounded-2xl text-white shadow-md transition duration-300 ${
                      !torrentLinks[quality]
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                    onClick={(e) => {
                      if (!torrentLinks[quality]) {
                        e.preventDefault();
                        alert("Torrent link not available for this quality");
                      }
                    }}
                  >
                    {quality}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="mt-10 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Cast & Characters
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {visibleCast?.map((actor) => (
            <div
              key={actor.cast_id || actor.credit_id}
              className="flex flex-col items-center w-24"
            >
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : "https://via.placeholder.com/100x140?text=No+Photo"
                }
                alt={actor.name}
                className="rounded-lg mb-1 w-full h-auto object-cover"
              />
              <p className="text-sm text-center truncate">{actor.name}</p>
              <p className="text-xs text-gray-400 truncate">
                {actor.character}
              </p>
            </div>
          ))}
        </div>
        {movie.credits?.cast?.length > 10 && (
          <div className="text-center mt-2">
            <button
              onClick={() => setShowAllCast(!showAllCast)}
              className="text-green-400 text-sm underline"
            >
              {showAllCast ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>

      {/* Trailer Section */}
      <div className="mt-10 max-w-7xl mx-auto">
        <h2 className="font-bold text-2xl mb-4 text-center">
          🎞️ Movie Trailer
        </h2>
        {trailer ? (
          <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg border-2 border-green-500 mx-auto max-w-4xl">
            <iframe
              className="w-full h-[200px] md:h-[400px]"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={`${movie.title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <p className="text-center text-gray-400 italic text-lg mt-6">
            Sorry, trailer not available for this movie.
          </p>
        )}
      </div>

      {/* Reviews Section */}
      <div className="mt-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
        <h2 className="text-2xl font-bold mb-6">🗣️ User Reviews</h2>
        {reviews.length === 0 && (
          <p className="text-gray-400 italic">No reviews available.</p>
        )}
        {reviews.map((review, i) => (
          <div
            key={i}
            className="mb-6 bg-gray-800 rounded-lg p-5 shadow-lg hover:shadow-green-600 transition-shadow duration-300"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
              <p className="font-semibold text-lg text-green-400">
                {review.author || review.name}
              </p>
              <span className="text-sm text-gray-400">
                {review.created_at || review.date}
              </span>
            </div>
            {review.author_details?.rating || review.rating ? (
              <p className="text-yellow-400 font-semibold mt-2 mb-3">
                ⭐ {review.author_details?.rating || review.rating}/10
              </p>
            ) : null}
            <p className="text-gray-300 leading-relaxed">
              {review.content.length > 300
                ? `${review.content.slice(0, 300)}...`
                : review.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
