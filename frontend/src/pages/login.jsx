
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token
      const storage = rememberMe ? localStorage : sessionStorage;

      storage.setItem("token", data.token);
      storage.setItem("user", JSON.stringify(data.user));

      // Redirect after successful login
      navigate("/dashboard");

    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to server. Start your backend."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* LEFT PANEL */}
      <section className="login-visual">

        <Link to="/" className="login-brand">
          <span className="login-brand-icon">M</span>
          <span>ML<span>Studio</span></span>
        </Link>

        <div className="login-visual-content">
          <div className="login-visual-badge">
            ✦ MACHINE LEARNING, SIMPLIFIED
          </div>

          <h1>
            Your data.
            <br />
            Your models.
            <br />
            <span>Your insights.</span>
          </h1>

          <p>
            Explore datasets, train machine learning models,
            and transform your data into meaningful insights.
          </p>

          <div className="login-illustration">
            <div className="login-illustration-card">

              <div className="illustration-top">
                <span className="illustration-dot"></span>
                <span className="illustration-dot"></span>
                <span className="illustration-dot"></span>
                ML Studio Workspace
              </div>

              <div className="illustration-stat-row">
                <div className="illustration-stat">
                  <small>Models trained</small>
                  <strong>04</strong>
                  <span>Algorithms tested</span>
                </div>

                <div className="illustration-stat">
                  <small>Best accuracy</small>
                  <strong>94.8%</strong>
                  <span>Best performing model</span>
                </div>
              </div>

              <div className="illustration-chart">
                <div className="illustration-chart-bars">
                  <span style={{ height: "35%" }}></span>
                  <span style={{ height: "55%" }}></span>
                  <span style={{ height: "45%" }}></span>
                  <span style={{ height: "75%" }}></span>
                  <span style={{ height: "62%" }}></span>
                  <span style={{ height: "90%" }}></span>
                  <span style={{ height: "100%" }}></span>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="login-visual-footer">
          <span>© 2026 ML Studio</span>
          <span>Built for curious minds.</span>
        </div>
      </section>

      {/* RIGHT PANEL */}
      <section className="login-form-section">

        <Link to="/" className="mobile-login-brand">
          <span className="login-brand-icon">M</span>
          <span>ML<span>Studio</span></span>
        </Link>

        <div className="login-form-container">

          <div className="login-welcome">
            <span className="login-eyebrow">WELCOME BACK</span>
            <h2>Sign in to your account</h2>
            <p>Continue your machine learning journey.</p>
          </div>

          <div className="login-divider">
            <span></span>
            <p>CONTINUE WITH EMAIL</p>
            <span></span>
          </div>

          <form onSubmit={handleSubmit} className="login-form">

            <div className="login-field">
              <label htmlFor="login-email">Email address</label>

              <input
                id="login-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="login-field">
              <div className="login-password-label">
                <label htmlFor="login-password">Password</label>
                <Link to="/forgot-password">Forgot password?</Link>
              </div>

              <div className="login-password-input">
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <label className="remember-option">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-submit-button"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>

          </form>

          <div className="login-signup-text">
            Don't have an account?
            <Link to="/signup"> Create an account</Link>
          </div>

          <div className="login-security-note">
            🔒 Your data stays private and secure.
          </div>

        </div>

        <div className="login-bottom-links">
          <Link to="/">Back to home</Link>
          <span>·</span>
          <Link to="/privacy">Privacy</Link>
          <span>·</span>
          <Link to="/terms">Terms</Link>
        </div>

      </section>
    </div>
  );
}

export default Login;
