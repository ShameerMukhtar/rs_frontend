import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Ensure custom styling is applied

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <div className="row login-container">
        {/* Left Side Image */}
        <div className="col-md-6 image-side"></div>

        {/* Right Side Form */}
        <div className="col-md-6 form-side">
          <h1>RAFIA AND SUMBAL</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                EMAIL
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="example@mail.com"
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
              />
              <ul className="password-criteria list-unstyled">
                <li>✔ Minimum 8 characters</li>
                <li>✔ Must contain at least 1 number</li>
                <li>✔ Must contain at least 1 capital case and 1 small case</li>
                <li>✔ Must contain at least 1 symbol</li>
              </ul>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              SIGN IN
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
