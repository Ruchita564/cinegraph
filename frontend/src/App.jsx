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
  // Current page
  const [page, setPage] = useState("login");

  // Selected movie
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  // Movie being watched
  const [watchMovieId, setWatchMovieId] = useState(null);

  // Profile page
  const [profilePage, setProfilePage] = useState(false);

  // Search
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

    // Make sure profile is closed
    setProfilePage(false);

    // Go to Home
    setPage("home");
  };

  // =========================
  // SEARCH
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
      {/* =====================================
          LOGIN
      ===================================== */}
      {page === "login" && (
        <Login
          onRegister={() => {
            setProfilePage(false);
            setPage("register");
          }}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* =====================================
          REGISTER
      ===================================== */}
      {page === "register" && (
        <Register
          onRegisterSuccess={handleRegisterSuccess}
          onLogin={() => {
            setPage("login");
          }}
        />
      )}

      {/* =====================================
          HOME
      ===================================== */}
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

      {/* =====================================
          PROFILE
      ===================================== */}
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

      {/* =====================================
          MOVIE DETAILS
      ===================================== */}
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

      {/* =====================================
          WATCH MOVIE
      ===================================== */}
      {page === "watch" && !profilePage && (
        <WatchMovie
          movieId={watchMovieId}

          onBack={() => {
            setPage("details");
          }}
        />
      )}

      {/* =====================================
          MY LIST
      ===================================== */}
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

      {/* =====================================
          SEARCH PAGE
      ===================================== */}
      {page === "search" && !profilePage && (
        <div className="cine-search-page">

          {/* Search Header */}
          <div className="search-header">

            <button
              className="back-button"
              onClick={() => {
                setPage("home");
              }}
            >
              ← Back
            </button>

            <h1>Search Movies</h1>

          </div>

          {/* Search Box */}
          <div className="search-box">

            <input
              type="text"
              placeholder="Search for a movie..."
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

            <button
              onClick={handleSearch}
            >
              Search
            </button>

          </div>

          {/* Search Results */}
          <div className="search-results">

            {searchResults.length === 0 ? (
              <p className="no-results">
                No movies found.
              </p>
            ) : (
              searchResults.map((movie) => (
                <div
                  key={movie.id}
                  className="search-movie-card"
                  onClick={() => {
                    setSelectedMovieId(movie.id);
                    setPage("details");
                  }}
                >

                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                  ) : (
                    <div className="no-poster">
                      No Image
                    </div>
                  )}

                  <h3>
                    {movie.title}
                  </h3>

                  {movie.release_date && (
                    <p>
                      {movie.release_date}
                    </p>
                  )}

                </div>
              ))
            )}

          </div>

        </div>
      )}
    </>
  );
}

export default App;