import { useEffect, useRef, useState } from "react";
import axios from "axios";

function WatchMovie({ movieId, onBack }) {
  const [movie, setMovie] = useState(null);
  const videoRef = useRef(null);
  const lastSavedTime = useRef(0);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/movies/${movieId}`
        );

        setMovie(response.data);
      } catch (error) {
        console.error("Failed to fetch movie:", error);
      }
    };

    fetchMovie();
  }, [movieId]);

  const saveProgress = async () => {
    const userId = localStorage.getItem("userId");
    const video = videoRef.current;

    if (!userId || !movie || !video) {
      return;
    }

    if (!video.duration || isNaN(video.duration)) {
      return;
    }

    const progress = Math.min(
      100,
      Math.max(
        1,
        Math.floor((video.currentTime / video.duration) * 100)
      )
    );

    try {
      await axios.post(
        "${import.meta.env.VITE_API_URL}/api/watch-history",
        null,
        {
          params: {
            userId: Number(userId),
            movieId: Number(movie.id),
            movieTitle: movie.title,
            posterPath: movie.poster_path || "",
            progress: progress,
          },
        }
      );

      console.log("Watch history saved:", progress + "%");
    } catch (error) {
      console.error(
        "Watch history save failed:",
        error.response?.data || error.message
      );
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.currentTime - lastSavedTime.current >= 5) {
      lastSavedTime.current = video.currentTime;
      saveProgress();
    }
  };

  if (!movie) {
    return (
      <div className="watch-loading">
        Loading movie...
      </div>
    );
  }

  return (
    <div className="watch-page">

      <header className="watch-header">

        <button
          className="watch-back-btn"
          onClick={async () => {
            await saveProgress();
            onBack();
          }}
        >
          ← Back
        </button>

        <div className="cine-logo">
          <div className="cine-logo-mark">C</div>
          <span>CineGraph</span>
        </div>

      </header>

      <main className="watch-content">

        <div className="watch-player">

          <video
            ref={videoRef}
            controls
            autoPlay
            onTimeUpdate={handleTimeUpdate}
            onPause={saveProgress}
            onEnded={saveProgress}
            poster={
              movie.backdrop_path
                ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                : ""
            }
          >
            <source
              src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
              type="video/mp4"
            />

            Your browser does not support video playback.
          </video>

        </div>

        <div className="watch-info">

          <span className="watch-label">
            NOW PLAYING
          </span>

          <h1>{movie.title}</h1>

          <div className="watch-meta">

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

            <span>
              ★ {movie.vote_average?.toFixed(1)}
            </span>

          </div>

          <p>{movie.overview}</p>

        </div>

      </main>

    </div>
  );
}

export default WatchMovie;