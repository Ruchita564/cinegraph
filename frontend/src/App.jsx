
import Profile from "./pages/Profile";
import MovieDetails from "./pages/MovieDetails";
import MyList from "./pages/MyList";
import { useState } from "react";
import axios from "axios";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import WatchMovie from "./pages/WatchMovie";

function App() {
  const [page, setPage] = useState("login");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [watchMovieId, setWatchMovieId] = useState(null);
  const [profilePage, setProfilePage] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/api/movies/search?query=${encodeURIComponent(
          searchQuery
        )}`
      );

      console.log("Search results:", response.data);

      setSearchResults(response.data.results || []);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
    }
  };

  return (
    <>
      {/* LOGIN */}
      {page === "login" && (
        <Login
          onRegister={() => setPage("register")}
          onLoginSuccess={() => setPage("home")}
        />
      )}

      {/* REGISTER */}
      {page === "register" && (
        <Register
          onLogin={() => setPage("login")}
        />
      )}

      {/* HOME */}
      {page === "home" && !profilePage && (
        <Home
          onMovieClick={(movieId) => {
            setSelectedMovieId(movieId);
            setPage("details");
          }}
          onMyListClick={() => setPage("mylist")}
          onSearchClick={() => setPage("search")}
          onProfileClick={() => setProfilePage(true)}
        />
      )}

      {/* PROFILE */}
      {profilePage && (
        <Profile
          onBack={() => setProfilePage(false)}

          onMyListClick={() => {
            setProfilePage(false);
            setPage("mylist");
          }}

          onMovieClick={(movieId) => {
            setProfilePage(false);
            setSelectedMovieId(movieId);
            setPage("details");
          }}

          onLogout={() => {
            localStorage.removeItem("userId");
            window.location.reload();
          }}
        />
      )}

      {/* MOVIE DETAILS */}
      {page === "details" && !profilePage && (
        <MovieDetails
          movieId={selectedMovieId}
          onBack={() => setPage("home")}
          onWatch={(movieId) => {
            setWatchMovieId(movieId);
            setPage("watch");
          }}
        />
      )}

      {/* MY LIST */}
      {page === "mylist" && !profilePage && (
        <MyList
          onBack={() => setPage("home")}
          onMovieClick={(movieId) => {
            setSelectedMovieId(movieId);
            setPage("details");
          }}
        />
      )}

      {/* WATCH MOVIE */}
      {page === "watch" && !profilePage && (
        <WatchMovie
          movieId={watchMovieId}
          onBack={() => setPage("details")}
        />
      )}

      {/* SEARCH */}
      {page === "search" && !profilePage && (
        <div className="cine-search-page">

          {/* SEARCH HEADER */}
          <div className="cine-search-header">

            <button
              className="cine-back-btn"
              onClick={() => setPage("home")}
            >
              ← Back
            </button>

            <div className="cine-logo">
              <div className="cine-logo-mark">C</div>
              <span>CineGraph</span>
            </div>

          </div>

          {/* SEARCH CONTENT */}
          <main className="cine-search-content">

            <p className="cine-section-label">
              DISCOVER SOMETHING NEW
            </p>

            <h1>Search Movies</h1>

            {/* SEARCH BOX */}
            <div className="cine-search-box">

              <span className="cine-search-icon">
                ⌕
              </span>

              <input
                type="text"
                placeholder="Search for movies..."
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearch();
                  }
                }}
              />

              <button
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>

            </div>

            {/* SEARCH RESULTS */}
            {searchResults.length > 0 ? (

              <section className="cine-section">

                <div className="cine-section-header">

                  <div>
                    <p className="cine-section-label">
                      RESULTS FOR
                    </p>

                    <h2>
                      "{searchQuery}"
                    </h2>
                  </div>

                </div>

                <div className="cine-movie-row">

                  {searchResults.map((movie) => {

                    const posterUrl = movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : null;

                    return (
                      <div
                        className="cine-movie-card"
                        key={movie.id}
                        onClick={() => {
                          setSelectedMovieId(movie.id);
                          setPage("details");
                        }}
                      >

                        <div className="cine-poster">

                          {posterUrl ? (
                            <img
                              src={posterUrl}
                              alt={
                                movie.title ||
                                "Movie poster"
                              }
                            />
                          ) : (
                            <div
                              style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#64748b",
                                fontSize: "12px",
                              }}
                            >
                              No Poster
                            </div>
                          )}

                        </div>

                        <div className="cine-card-info">

                          <h3>
                            {movie.title ||
                              "Untitled Movie"}
                          </h3>

                          <p>
                            {movie.release_date
                              ? movie.release_date.slice(
                                  0,
                                  4
                                )
                              : "N/A"}

                            {" • "}

                            ★{" "}

                            {typeof movie.vote_average ===
                            "number"
                              ? movie.vote_average.toFixed(1)
                              : "N/A"}
                          </p>

                        </div>

                      </div>
                    );
                  })}

                </div>

              </section>

            ) : searchQuery ? (

              <div className="cine-search-empty">

                <div className="cine-search-empty-icon">
                  🎬
                </div>

                <h2>
                  No movies found
                </h2>

                <p>
                  Try searching with a different movie
                  name.
                </p>

              </div>

            ) : (

              <div className="cine-search-empty">

                <div className="cine-search-empty-icon">
                  🎬
                </div>

                <h2>
                  Find your next favorite movie
                </h2>

                <p>
                  Search for a movie by title and
                  explore its details.
                </p>

              </div>

            )}

          </main>

        </div>
      )}
    </>
  );
}

export default App;

