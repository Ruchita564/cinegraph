import { useEffect, useState } from "react";
import axios from "axios";

function Profile({ onBack, onLogout }) {
  const [user, setUser] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    const loadProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/${userId}`
        );

        setUser(response.data);
      } catch (error) {
        console.error("Profile error:", error);
      }
    };

    loadProfile();
  }, [userId]);

  return (
    <div className="profile-page">

      <header className="profile-header">

        <button
          className="profile-back-btn"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="cine-logo">
          <div className="cine-logo-mark">C</div>
          <span>CineGraph</span>
        </div>

      </header>

      <main className="profile-content">

        <p className="cine-section-label">
          MY ACCOUNT
        </p>

        <h1>Profile</h1>

        <div className="profile-hero">

          <div className="profile-avatar">
            {(user?.name || "U")
              .charAt(0)
              .toUpperCase()}
          </div>

          <div className="profile-hero-info">

            <h2>
              {user?.name || "CineGraph User"}
            </h2>

            <p>
              {user?.email || "Loading..."}
            </p>

          </div>

        </div>

        <div className="profile-card">

          <div className="profile-card-title">
            <span>👤</span>
            <h2>Account Details</h2>
          </div>

          <div className="profile-row">

            <div>

              <span className="profile-label">
                Full Name
              </span>

              <strong>
                {user?.name || "Loading..."}
              </strong>

            </div>

          </div>

          <div className="profile-divider"></div>

          <div className="profile-row">

            <div>

              <span className="profile-label">
                Email Address
              </span>

              <strong>
                {user?.email || "Loading..."}
              </strong>

            </div>

          </div>

        </div>

        <button
          className="profile-logout-btn"
          onClick={onLogout}
        >
          Log Out
        </button>

      </main>

    </div>
  );
}

export default Profile;