import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  // Extract token & email from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get("token");
    const emailParam = urlParams.get("email");

    if (!tokenParam || !emailParam) {
      setError("Invalid or expired reset link.");
      return;
    }

    setToken(tokenParam);
    setEmail(emailParam);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email || !token) {
      setError("Invalid or expired reset link.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/auth/reset-password?email=${encodeURIComponent(
          email
        )}&token=${encodeURIComponent(token)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Your password has been reset successfully! Redirecting...");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setError(data.message || "Failed to reset password.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row login-container">
        {/* Left Side Image */}
        <div className="col-md-6 image-side"></div>

        {/* Right Side Form */}
        <div className="col-md-6 form-side">
          <h1>RESET PASSWORD</h1>
          <p>Enter your new password below.</p>
          <form onSubmit={handleSubmit}>
            {/* Password Field */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                NEW PASSWORD
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100">
              RESET PASSWORD
            </button>

            {/* Error Message */}
            {error && <p className="mt-3 text-danger">{error}</p>}

            {/* Success Message */}
            {message && <p className="mt-3 text-success">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
