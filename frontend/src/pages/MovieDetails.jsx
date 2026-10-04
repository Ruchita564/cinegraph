
import { useEffect, useState } from "react";
import axios from "axios";
function MovieDetails({ movieId, onBack }) {
  const [showTrailer, setShowTrailer] = useState(false);
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isInMyList, setIsInMyList] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/movies/${movieId}`
        );

        setMovie(response.data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(
  `http://localhost:8080/api/movies/${movieId}/videos`
);

const videos = response.data.results || [];

const trailer = videos.find(
  (video) =>
    video.site === "YouTube" &&
    video.type === "Trailer" &&
    video.official === true
);

if (trailer) {
  setTrailerKey(trailer.key);
} else {
  setTrailerKey(null);
}
      } catch (error) {
        console.error("Failed to fetch trailer:", error);
        setTrailerKey(null);
      }
    };

    if (movieId) {
      fetchTrailer();
    }
  }, [movieId]);

  useEffect(() => {
    const checkMyList = async () => {
      try {
        const userId = localStorage.getItem("userId");

        const response = await axios.get(
          `http://localhost:8080/api/my-list/${userId}`
        );

        const exists = response.data.some(
          (item) => item.movieId === Number(movieId)
        );

        setIsInMyList(exists);
      } catch (error) {
        console.error("Failed to check My List:", error);
      }
    };

    if (movieId) {
      checkMyList();
    }
  }, [movieId]);

  const handleAddToMyList = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (isInMyList) {
        await axios.delete(
          `http://localhost:8080/api/my-list?userId=${userId}&movieId=${movieId}`
        );

        setIsInMyList(false);
        alert("Removed from My List!");
        return;
      }

      await axios.post(
        `http://localhost:8080/api/my-list?userId=${userId}&movieId=${movieId}`
      );

      setIsInMyList(true);
      alert("Added to My List!");
    } catch (error) {
      console.error("Failed to update My List:", error);
      alert("Failed to update My List");
    }
  };

  if (!movie) {
    return (
      <div className="movie-details-loading">
        Loading movie...
      </div>
    );
  }

  return (
    <div className="movie-details">

      {/* BACKDROP */}
      <div
        className="movie-details-backdrop"
        style={{
          backgroundImage: movie.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            : "none",
        }}
      ></div>

      {/* OVERLAY */}
      <div className="movie-details-overlay"></div>

      {/* CONTENT */}
      <div className="movie-details-content">

        <button
          className="movie-back-btn"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="movie-details-main">

          {/* POSTER */}
          <div className="movie-details-poster">
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            )}
          </div>

          {/* INFORMATION */}
          <div className="movie-details-info">

            <span className="movie-details-label">
              MOVIE DETAILS
            </span>

            <h1>{movie.title}</h1>

            {movie.tagline && (
              <p className="movie-tagline">
                {movie.tagline}
              </p>
            )}

            <div className="movie-details-meta">

              <span>
                {movie.release_date
                  ? movie.release_date.slice(0, 4)
                  : "N/A"}
              </span>

              <span>•</span>

              <span>
                {movie.runtime
                  ? `${movie.runtime} min`
                  : "N/A"}
              </span>

              <span>•</span>

              <span className="movie-rating">
                ★ {movie.vote_average?.toFixed(1)}
              </span>

            </div>

            <div className="movie-genres">
              {movie.genres?.map((genre) => (
                <span key={genre.id}>
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="movie-overview">
              {movie.overview}
            </p>

            {/* BUTTONS */}
            <div className="movie-details-buttons">

              <button
  className="movie-play-btn"
  onClick={() => {
    if (trailerKey) {
      setShowTrailer(true);
    } else {
      alert("Trailer not available for this movie.");
    }
  }}
>
  ▶ Play Trailer
</button>

              <button
                className="movie-list-btn"
                onClick={handleAddToMyList}
              >
                {isInMyList
                  ? "✓ In My List"
                  : "＋ My List"}
              </button>

            </div>

            {/* TRAILER */}
{showTrailer && trailerKey && (
  <div className="movie-trailer-container">
    <div className="movie-trailer-header">
      <h2>{movie.title} — Official Trailer</h2>

      <button
        className="movie-trailer-close"
        onClick={() => setShowTrailer(false)}
      >
        ✕
      </button>
    </div>

    <div className="movie-trailer-player">
      <iframe
        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
        title={`${movie.title} Official Trailer`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  </div>
)}

          </div>

        </div>

      </div>

    </div>
  );
}

export default MovieDetails;

