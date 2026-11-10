
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signup.css";

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // STEP 1: SEND OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      setOtpSent(true);
      setVerified(false);
      setOtp("");
      setMessage(data.message || "OTP sent to your email");
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

  // STEP 2: VERIFY OTP
  const handleVerifyOTP = async () => {
    setError("");
    setMessage("");

    if (!otp.trim()) {
      setError("Please enter the OTP");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          otp: otp.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      setVerified(true);
      setMessage(data.message || "Email verified successfully");
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

  // STEP 3: CREATE ACCOUNT
  const handleSignup = async () => {
    setError("");
    setMessage("");

    if (!verified) {
      setError("Please verify your email first");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          otp: otp.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      setMessage(data.message || "Account created successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
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
    <div className="signup-page">
      <div className="signup-card">

        <Link to="/" className="signup-logo">
          <span className="logo-icon">M</span>
          <span>ML<span>Studio</span></span>
        </Link>

        <h1>Create your account</h1>
        <p className="signup-subtitle">
          Start your machine learning journey today.
        </p>

        {error && (
          <div className="signup-message error">
            {error}
          </div>
        )}

        {message && (
          <div className="signup-message success">
            {message}
          </div>
        )}

        {/* STEP 1: ACCOUNT DETAILS */}
        <form onSubmit={handleSendOTP}>

          <div className="signup-field">
            <label htmlFor="signup-name">Full name</label>
            <input
              id="signup-name"
              name="name"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              required
              disabled={otpSent}
            />
          </div>

          <div className="signup-field">
            <label htmlFor="signup-email">Email address</label>
            <input
              id="signup-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
              disabled={otpSent}
            />
          </div>

          <div className="signup-field">
            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
              disabled={otpSent}
            />

            {!otpSent && (
              <button
                type="button"
                className="resend-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide password" : "Show password"}
              </button>
            )}
          </div>

          <div className="signup-field">
            <label htmlFor="signup-confirm-password">
              Confirm password
            </label>
            <input
              id="signup-confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
              disabled={otpSent}
            />

            {!otpSent && (
              <button
                type="button"
                className="resend-button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword
                  ? "Hide password"
                  : "Show password"}
              </button>
            )}
          </div>

          {!otpSent && (
            <button type="submit" disabled={loading}>
              {loading ? "Sending OTP..." : "Send Email OTP →"}
            </button>
          )}
        </form>

        {/* STEP 2: OTP */}
        {otpSent && (
          <div className="signup-otp-section">

            <div className="signup-field">
              <label htmlFor="signup-otp">Email OTP</label>
              <input
                id="signup-otp"
                type="text"
                inputMode="numeric"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                maxLength={6}
                disabled={verified}
              />
            </div>

            {!verified && (
              <button
                type="button"
                onClick={handleVerifyOTP}
                disabled={loading || otp.length !== 6}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            )}

            {verified && (
              <button
                type="button"
                onClick={handleSignup}
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create Account →"}
              </button>
            )}

            {!verified && (
              <button
                type="button"
                className="resend-button"
                onClick={handleSendOTP}
                disabled={loading}
              >
                {loading ? "Sending..." : "Resend OTP"}
              </button>
            )}
          </div>
        )}

        <div className="signup-footer">
          Already have an account?
          <Link to="/login"> Sign in</Link>
        </div>

      </div>
    </div>
  );
}

export default Signup;
