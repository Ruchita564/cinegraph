
import { useState } from "react";
import axios from "axios";

function Login({ onRegister, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "${import.meta.env.VITE_API_URL}/api/auth/login",
        {
          email: email,
          password: password,
        }
      );

      console.log("Login successful:", response.data);
console.log("User ID:", response.data.id);

localStorage.setItem("userId", response.data.id);

alert("Welcome back, " + response.data.name + "!");
      onLoginSuccess();
    } catch (error) {
      console.error("Login failed:", error);

      alert("Invalid email or password");
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
            <h2>Welcome back</h2>

            <p>
              Sign in to continue your cinematic journey.
            </p>
          </div>

          <form onSubmit={handleLogin}>

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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="login-options">

              <label className="remember">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="forgot-password"
              >
                Forgot password?
              </button>

            </div>

            <button
              type="submit"
              className="login-button"
            >
              Sign In
              <span>→</span>
            </button>

          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <p className="signup-text">
            Don't have an account?

            <button
              type="button"
              className="signup-link"
              onClick={onRegister}
            >
              Create account
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

export default Login;

