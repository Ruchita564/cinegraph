
import { useEffect, useState } from "react";
import axios from "axios";

function Home({
  onMovieClick,
  onMyListClick,
  onSearchClick,
  onProfileClick,
}) {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  const [showGenres, setShowGenres] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 18, name: "Drama" },
    { id: 14, name: "Fantasy" },
    { id: 27, name: "Horror" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 53, name: "Thriller" },
  ];

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const popular = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/movies/popular`
      );

      const trending = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/movies/trending`
      );

      const topRated = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/movies/top-rated`
      );

      const nowPlaying = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/movies/now-playing`
      );

      const popularList = popular.data?.results || [];
      const trendingList = trending.data?.results || [];
      const topRatedList = topRated.data?.results || [];
      const nowPlayingList = nowPlaying.data?.results || [];

      setMovies(popularList);
      setPopularMovies(popularList);
      setTrendingMovies(trendingList);
      setTopRatedMovies(topRatedList);
      setNowPlayingMovies(nowPlayingList);

    } catch (error) {
      console.error("MOVIE API ERROR:", error);
    }
  };

  const allMovies = [
    ...trendingMovies,
    ...popularMovies,
    ...topRatedMovies,
    ...nowPlayingMovies,
  ];

  const uniqueMovies = Array.from(
    new Map(allMovies.map((movie) => [movie.id, movie])).values()
  );

  const genreMovies = selectedGenre
    ? uniqueMovies.filter(
        (movie) =>
          Array.isArray(movie.genre_ids) &&
          movie.genre_ids.includes(Number(selectedGenre.id))
      )
    : [];

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    setShowGenres(false);
  };

  const clearGenre = () => {
    setSelectedGenre(null);
  };

  /*
   * ============================
   * MOVIE CARD
   * ============================
   */

  const MovieCard = ({ movie, rank }) => {
    const poster =
      movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null;

    return (
      <div
        className="cine-movie-card"
        onClick={() => onMovieClick(movie.id)}
        style={{
          cursor: "pointer",
          minWidth: 0,
        }}
      >

        {/* POSTER */}
        <div
          style={{
            width: "100%",
            height: "310px",
            position: "relative",
            overflow: "hidden",
            borderRadius: "13px",
            backgroundColor: "#111827",
            border: "1px solid rgba(148, 163, 184, 0.08)",
            boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
          }}
        >

          {poster ? (
            <img
              src={poster}
              alt={movie.title || "Movie poster"}
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#94a3b8",
              }}
            >
              No Poster
            </div>
          )}

          {/* DARK GRADIENT */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "45%",
              background:
                "linear-gradient(to top, rgba(7,11,23,0.8), transparent)",
              pointerEvents: "none",
            }}
          />

          {/* RANK */}
          {rank && (
            <span
              style={{
                position: "absolute",
                left: "10px",
                bottom: "10px",
                zIndex: 5,
                color: "#ffffff",
                fontSize: "28px",
                fontWeight: "800",
                textShadow: "0 2px 5px rgba(0,0,0,0.8)",
              }}
            >
              {String(rank).padStart(2, "0")}
            </span>
          )}

        </div>

        {/* MOVIE INFO */}
        <div className="cine-card-info">

          <h3>
            {movie.title || "Untitled Movie"}
          </h3>

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
    );
  };

  return (
    <div className="cine-home">

      {/* ================= NAVBAR ================= */}

      <header className="cine-navbar">

        <div className="cine-logo">
          <div className="cine-logo-mark">C</div>
          <span>CineGraph</span>
        </div>

        <nav className="cine-nav">

          <button
            className="active"
            type="button"
          >
            Home
          </button>

          {/* MOVIES BUTTON REMOVED */}

          <div style={{ position: "relative" }}>

            <button
              type="button"
              onClick={() => setShowGenres(!showGenres)}
            >
              Genres
            </button>

            {showGenres && (
              <div
                style={{
                  position: "absolute",
                  top: "45px",
                  left: "0",
                  width: "180px",
                  maxHeight: "350px",
                  overflowY: "auto",
                  background: "#111827",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  padding: "10px",
                  zIndex: 9999,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                }}
              >

                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    type="button"
                    onClick={() => handleGenreClick(genre)}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "8px 10px",
                      marginBottom: "3px",
                      background: "transparent",
                      border: "none",
                      color: "white",
                      textAlign: "left",
                      cursor: "pointer",
                      borderRadius: "5px",
                    }}
                  >
                    {genre.name}
                  </button>
                ))}

              </div>
            )}

          </div>

          <button
            type="button"
            onClick={onMyListClick}
          >
            My List
          </button>

        </nav>

        <div className="cine-actions">

          <button
            className="cine-search"
            type="button"
            onClick={onSearchClick}
          >
            ⌕
          </button>

          <button
            className="cine-profile"
            type="button"
            onClick={onProfileClick}
          >
            R
          </button>

        </div>

      </header>

      {/* ================= HERO ================= */}

      <section className="cine-hero">

        <div
          className="cine-hero-overlay"
          style={{
            backgroundImage: movies[0]?.backdrop_path
              ? `url(https://image.tmdb.org/t/p/original${movies[0].backdrop_path})`
              : "none",
          }}
        />

        <div className="cine-hero-content">

          <div className="cine-hero-tag">
            FEATURED MOVIE
          </div>

          <h1>
            {movies[0]?.title || "INTERSTELLAR"}
          </h1>

          <div className="cine-meta">

            <span>
              {movies[0]?.release_date
                ? movies[0].release_date.slice(0, 4)
                : "N/A"}
            </span>

            <span>•</span>

            <span>Movie</span>

            <span>•</span>

            <span className="cine-rating">
              ★{" "}
              {movies[0]?.vote_average
                ? movies[0].vote_average.toFixed(1)
                : "N/A"}
            </span>

          </div>

          <p className="cine-hero-description">
            {movies[0]?.overview ||
              "Discover popular movies and explore your next favorite story."}
          </p>

          <div className="cine-hero-buttons">

            <button
              className="cine-play-btn"
              type="button"
              onClick={() => {
                if (movies[0]?.id) {
                  onMovieClick(movies[0].id);
                }
              }}
            >
              <span>▶</span>
              <span>Play Now</span>
            </button>

            <button
              className="cine-info-btn"
              type="button"
              onClick={onMyListClick}
            >
              <span>＋</span>
              <span>My List</span>
            </button>

          </div>

        </div>

        <div className="cine-hero-dots">
          <span className="active"></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

      </section>

      {/* ================= CONTENT ================= */}

      <main className="cine-content">

        {/* ================= GENRE ================= */}

        {selectedGenre && (
          <section className="cine-section">

            <div className="cine-section-header">

              <div>
                <p className="cine-section-label">
                  GENRE
                </p>

                <h2>
                  {selectedGenre.name} Movies
                </h2>
              </div>

              <button
                className="cine-see-all"
                type="button"
                onClick={clearGenre}
              >
                Clear ×
              </button>

            </div>

            {genreMovies.length > 0 ? (
              <div className="cine-movie-row">

                {genreMovies.slice(0, 10).map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                  />
                ))}

              </div>
            ) : (
              <p style={{ color: "#94a3b8" }}>
                No movies found for this genre.
              </p>
            )}

          </section>
        )}

        {/* ================= TRENDING ================= */}

        <section className="cine-section">

          <div className="cine-section-header">

            <div>
              <p className="cine-section-label">
                WHAT&apos;S HOT
              </p>

              <h2>
                Trending Now
              </h2>
            </div>

            <button
              className="cine-see-all"
              type="button"
            >
              See All →
            </button>

          </div>

          <div className="cine-movie-row">

            {trendingMovies.slice(0, 5).map((movie, index) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                rank={index + 1}
              />
            ))}

          </div>

        </section>

        {/* ================= POPULAR ================= */}

        <section className="cine-section">

          <div className="cine-section-header">

            <div>
              <p className="cine-section-label">
                DISCOVER
              </p>

              <h2>
                Popular Movies
              </h2>
            </div>

            <button
              className="cine-see-all"
              type="button"
            >
              See All →
            </button>

          </div>

          <div className="cine-movie-row">

            {popularMovies.slice(0, 5).map((movie, index) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                rank={index + 6}
              />
            ))}

          </div>

        </section>

        {/* ================= TOP RATED ================= */}

        <section className="cine-section">

          <div className="cine-section-header">

            <div>
              <p className="cine-section-label">
                HIGHEST RATED
              </p>

              <h2>
                Top Rated
              </h2>
            </div>

            <button
              className="cine-see-all"
              type="button"
            >
              See All →
            </button>

          </div>

          <div className="cine-movie-row">

            {topRatedMovies.slice(0, 5).map((movie, index) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                rank={index + 11}
              />
            ))}

          </div>

        </section>

        {/* ================= NEW RELEASES ================= */}

        <section className="cine-section">

          <div className="cine-section-header">

            <div>
              <p className="cine-section-label">
                JUST RELEASED
              </p>

              <h2>
                New Releases
              </h2>
            </div>

            <button
              className="cine-see-all"
              type="button"
            >
              See All →
            </button>

          </div>

          <div className="cine-movie-row">

            {nowPlayingMovies.slice(0, 5).map((movie, index) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                rank={index + 16}
              />
            ))}

          </div>

        </section>

      </main>

    </div>
  );
}

export default Home;
