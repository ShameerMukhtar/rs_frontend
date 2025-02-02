import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Ensure custom styling is applied

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Save token and user info in sessionStorage
        sessionStorage.setItem("token", data.token);

        navigate("/my-account"); // Redirect to dashboard or another page
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row login-container">
        {/* Left Side Image */}
        <div className="col-md-6 image-side"></div>

        {/* Right Side Form */}
        <div className="col-md-6 form-side">
          <h1>RAFIA AND SUMBAL</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                EMAIL
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                PASSWORD
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <ul className="password-criteria list-unstyled">
                <li>✔ Minimum 8 characters</li>
                <li>✔ Must contain at least 1 number</li>
                <li>✔ Must contain at least 1 capital case and 1 small case</li>
                <li>✔ Must contain at least 1 symbol</li>
              </ul>
            </div>
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Signing In..." : "SIGN IN"}
            </button>
            <p className="mt-3 text-center">
              <a
                href="#"
                className="forgot-password-link"
                onClick={() => navigate("/forget-password")}
              >
                Forgot your password?
              </a>
            </p>
            <p className="mt-3 text-center">
              Don’t have an account?{" "}
              <a
                href="#"
                className="register-link"
                onClick={() => navigate("/signup")}
              >
                Register here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
