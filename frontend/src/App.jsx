import { useState } from "react";
import axios from "axios";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import WatchMovie from "./pages/WatchMovie";
import MyList from "./pages/MyList";
import Profile from "./pages/Profile";

function App() {
  const [page, setPage] = useState("login");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [watchMovieId, setWatchMovieId] = useState(null);
  const [profilePage, setProfilePage] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // =========================
  // LOGIN SUCCESS
  // =========================
  const handleLoginSuccess = (user) => {
    console.log("Login successful:", user);

    if (user) {
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      if (user.id) {
        localStorage.setItem(
          "userId",
          user.id.toString()
        );
      }
    }

    setProfilePage(false);
    setPage("home");
  };

  // =========================
  // REGISTER SUCCESS
  // =========================
  const handleRegisterSuccess = (user) => {
    console.log("Registration successful:", user);

    if (user) {
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      if (user.id) {
        localStorage.setItem(
          "userId",
          user.id.toString()
        );
      }
    }

    setProfilePage(false);
    setPage("home");
  };

  // =========================
  // SEARCH MOVIES
  // =========================
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/movies/search?query=${encodeURIComponent(
          searchQuery
        )}`
      );

      console.log("Search results:", response.data);

      setSearchResults(
        response.data.results || []
      );
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");

    setProfilePage(false);
    setSelectedMovieId(null);
    setWatchMovieId(null);
    setSearchResults([]);
    setSearchQuery("");

    setPage("login");
  };

  return (
    <>
      {/* =========================
          LOGIN
      ========================= */}
      {page === "login" && (
        <Login
          onRegister={() => {
            setProfilePage(false);
            setPage("register");
          }}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* =========================
          REGISTER
      ========================= */}
      {page === "register" && (
        <Register
          onRegisterSuccess={handleRegisterSuccess}
          onLogin={() => {
            setPage("login");
          }}
        />
      )}

      {/* =========================
          HOME
      ========================= */}
      {page === "home" && !profilePage && (
        <Home
          onMovieClick={(movieId) => {
            setSelectedMovieId(movieId);
            setPage("details");
          }}
          onMyListClick={() => {
            setPage("mylist");
          }}
          onSearchClick={() => {
            setPage("search");
          }}
          onProfileClick={() => {
            setProfilePage(true);
          }}
        />
      )}

      {/* =========================
          PROFILE
      ========================= */}
      {profilePage && (
        <Profile
          onBack={() => {
            setProfilePage(false);
            setPage("home");
          }}
          onMyListClick={() => {
            setProfilePage(false);
            setPage("mylist");
          }}
          onMovieClick={(movieId) => {
            setProfilePage(false);
            setSelectedMovieId(movieId);
            setPage("details");
          }}
          onLogout={handleLogout}
        />
      )}

      {/* =========================
          MOVIE DETAILS
      ========================= */}
      {page === "details" && !profilePage && (
        <MovieDetails
          movieId={selectedMovieId}
          onBack={() => {
            setPage("home");
          }}
          onWatch={(movieId) => {
            setWatchMovieId(movieId);
            setPage("watch");
          }}
        />
      )}

      {/* =========================
          WATCH MOVIE
      ========================= */}
      {page === "watch" && !profilePage && (
        <WatchMovie
          movieId={watchMovieId}
          onBack={() => {
            setPage("details");
          }}
        />
      )}

      {/* =========================
          MY LIST
      ========================= */}
      {page === "mylist" && !profilePage && (
        <MyList
          onBack={() => {
            setPage("home");
          }}
          onMovieClick={(movieId) => {
            setSelectedMovieId(movieId);
            setPage("details");
          }}
        />
      )}

      {/* =========================
          SEARCH PAGE
      ========================= */}
      {page === "search" && !profilePage && (
        <div className="search-page">

          {/* SEARCH HEADER */}
          <div className="search-header">

            <button
              className="search-back-button"
              onClick={() => {
                setPage("home");
                setSearchResults([]);
                setSearchQuery("");
              }}
            >
              ← Back
            </button>

            <div className="search-title">
              <h1>Search Movies</h1>
              <p>
                Find your next movie to watch
              </p>
            </div>

          </div>

          {/* SEARCH BOX */}
          <div className="search-main-box">

            <div className="search-input-wrapper">

              <span className="search-icon">
                ⌕
              </span>

              <input
                type="text"
                placeholder="Search for movies..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />

              {searchQuery && (
                <button
                  className="clear-search"
                  onClick={() => {
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                >
                  ×
                </button>
              )}

            </div>

            <button
              className="search-main-button"
              onClick={handleSearch}
            >
              Search
            </button>

          </div>

          {/* =========================
              SEARCH RESULTS
          ========================= */}
          {searchResults.length > 0 ? (

            <div className="search-content">

              <div className="search-results-heading">

                <h2>
                  Results for{" "}
                  <span>
                    "{searchQuery}"
                  </span>
                </h2>

                <p>
                  {searchResults.length} movies found
                </p>

              </div>

              <div className="search-movie-grid">

                {searchResults.map((movie) => (

                  <div
                    key={movie.id}
                    className="search-movie-card"
                    onClick={() => {
                      setSelectedMovieId(
                        movie.id
                      );
                      setPage("details");
                    }}
                  >

                    {/* POSTER */}
                    <div className="search-poster-wrapper">

                      {movie.poster_path ? (

                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          className="search-movie-poster"
                        />

                      ) : (

                        <div className="search-no-poster">
                          <span>🎬</span>
                          <p>No Image</p>
                        </div>

                      )}

                      {/* HOVER OVERLAY */}
                      <div className="search-card-overlay">

                        <span className="play-icon">
                          ▶
                        </span>

                      </div>

                    </div>

                    {/* MOVIE INFORMATION */}
                    <div className="search-movie-info">

                      <h3>
                        {movie.title}
                      </h3>

                      <div className="search-movie-meta">

                        {movie.release_date && (
                          <span>
                            {movie.release_date.substring(
                              0,
                              4
                            )}
                          </span>
                        )}

                        {movie.vote_average !==
                          undefined && (
                          <span className="movie-rating">
                            ⭐{" "}
                            {movie.vote_average.toFixed(
                              1
                            )}
                          </span>
                        )}

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          ) : (

            /* =========================
               EMPTY SEARCH STATE
            ========================= */
            <div className="search-empty">

              {searchQuery ? (

                <>
                  <div className="empty-icon">
                    🎬
                  </div>

                  <h2>
                    No movies found
                  </h2>

                  <p>
                    We couldn't find anything
                    matching{" "}
                    <strong>
                      "{searchQuery}"
                    </strong>
                  </p>

                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSearchResults([]);
                    }}
                  >
                    Clear Search
                  </button>
                </>

              ) : (

                <>
                  <div className="empty-icon">
                    🔎
                  </div>

                  <h2>
                    What do you want to watch?
                  </h2>

                  <p>
                    Search for movies, actors,
                    or your favorite titles.
                  </p>
                </>

              )}

            </div>

          )}

        </div>
      )}
    </>
  );
}

export default App;