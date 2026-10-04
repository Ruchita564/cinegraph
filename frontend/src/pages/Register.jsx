
import { useState } from "react";
import axios from "axios";

function Register({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "${import.meta.env.VITE_API_URL}:8080/api/auth/register",
        {
          name: name,
          email: email,
          password: password,
        }
      );

      console.log("Registration successful:", response.data);

      alert("Account created successfully!");

      onLogin();
    } catch (error) {
      console.error("Registration failed:", error);

      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="glow glow-purple"></div>
      <div className="glow glow-blue"></div>

      <div className="login-container">

        <div className="login-brand">
          <div className="brand-icon">C</div>

          <div>
            <h1>CineGraph</h1>
            <p>Your world of cinema</p>
          </div>
        </div>

        <div className="login-card">

          <div className="login-heading">
            <h2>Create your account</h2>

            <p>
              Join CineGraph and start your cinematic journey.
            </p>
          </div>

          <form onSubmit={handleRegister}>

            <div className="input-group">
              <label>Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="login-button"
            >
              Create Account
              <span>→</span>
            </button>

          </form>

          <div className="divider">
            <span>or</span>
          </div>

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

        <p className="login-footer">
          © 2026 CineGraph. Your entertainment, your way.
        </p>

      </div>
    </div>
  );
}

export default Register;
