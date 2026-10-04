import { useState } from "react";
import axios from "axios";

function Register({ onRegisterSuccess, onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          name: name,
          email: email,
          password: password,
        }
      );

      console.log("Registration successful:", response.data);

      // Save complete user data
      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      // Save user ID
      if (response.data.id) {
        localStorage.setItem(
          "userId",
          response.data.id.toString()
        );
      }

      alert("Account created successfully!");

      // Go to Home
      if (onRegisterSuccess) {
        onRegisterSuccess(response.data);
      } else {
        console.error(
          "onRegisterSuccess function is missing in App.jsx"
        );
      }

    } catch (error) {
      console.error("Registration failed:", error);

      if (error.response) {
        console.error(
          "Server response:",
          error.response.data
        );
      }

      alert(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="login-page">

      <div className="glow glow-purple"></div>
      <div className="glow glow-blue"></div>

      <div className="login-container">

        {/* BRAND */}
        <div className="login-brand">

          <div className="brand-icon">
            C
          </div>

          <div>
            <h1>CineGraph</h1>
            <p>Your world of cinema</p>
          </div>

        </div>

        {/* REGISTER CARD */}
        <div className="login-card">

          <div className="login-heading">

            <h2>
              Create your account
            </h2>

            <p>
              Join CineGraph and start your cinematic journey.
            </p>

          </div>

          <form onSubmit={handleRegister}>

            {/* NAME */}
            <div className="input-group">

              <label>
                Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />

            </div>

            {/* EMAIL */}
            <div className="input-group">

              <label>
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>

            {/* PASSWORD */}
            <div className="input-group">

              <label>
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

            </div>

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              className="login-button"
            >
              Create Account
              <span>→</span>
            </button>

          </form>

          {/* DIVIDER */}
          <div className="divider">
            <span>or</span>
          </div>

          {/* LOGIN LINK */}
          <p className="signup-text">

            Already have an account?

            <button
              type="button"
              className="signup-link"
              onClick={onLogin}
            >
              Sign in
            </button>

          </p>

        </div>

        {/* FOOTER */}
        <p className="login-footer">
          © 2026 CineGraph. Your entertainment, your way.
        </p>

      </div>

    </div>
  );
}

export default Register;