import { useEffect, useState } from "react";
import axios from "axios";

function MyList({ onBack, onMovieClick }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMyList = async () => {
      try {
        const userId = localStorage.getItem("userId");

const response = await axios.get(
  `http://localhost:8080/api/my-list/${userId}`
);

        const movieDetails = await Promise.all(
          response.data.map(async (item) => {
            const movieResponse = await axios.get(
              `http://localhost:8080/api/movies/${item.movieId}`
            );

            return movieResponse.data;
          })
        );

        setMovies(movieDetails);
      } catch (error) {
        console.error("Failed to fetch My List:", error);
      }
    };

    fetchMyList();
  }, []);

  return (
    <div className="my-list-page">

      <header className="my-list-navbar">

        <div className="cine-logo">
          <div className="cine-logo-mark">C</div>
          <span>CineGraph</span>
        </div>

        <button
          className="my-list-back-btn"
          onClick={onBack}
        >
          ← Home
        </button>

      </header>

      <main className="my-list-content">

        <div className="my-list-heading">
          <p>YOUR COLLECTION</p>
          <h1>My List</h1>
          <span>
            {movies.length} {movies.length === 1 ? "movie" : "movies"} saved
          </span>
        </div>

        {movies.length === 0 ? (

          <div className="my-list-empty">
            <div className="my-list-empty-icon">＋</div>

            <h2>Your list is empty</h2>

            <p>
              Add movies you want to watch later and they’ll appear here.
            </p>

            <button
              className="my-list-home-btn"
              onClick={onBack}
            >
              Explore Movies
            </button>
          </div>

        ) : (

          <div className="my-list-grid">

            {movies.map((movie) => (

              <div
                className="my-list-card"
                key={movie.id}
                onClick={() => onMovieClick(movie.id)}
              >

                <div className="my-list-poster">

                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                  ) : (
                    <div className="my-list-no-poster">
                      No Poster
                    </div>
                  )}

                  <div className="my-list-card-overlay">
                    <span>▶</span>
                  </div>

                </div>

                <div className="my-list-card-info">

                  <h3>{movie.title}</h3>

                  <p>
                    {movie.release_date
                      ? movie.release_date.slice(0, 4)
                      : "N/A"}

                    {" • "}

                    ★{" "}

                    {typeof movie.vote_average === "number"
                      ? movie.vote_average.toFixed(1)
                      : "N/A"}
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
}

export default MyList;