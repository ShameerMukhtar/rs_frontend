import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Reuse the same CSS

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <div className="row login-container">
        {/* Left Side Image */}
        <div className="col-md-6 image-side"></div>

        {/* Right Side Form */}
        <div className="col-md-6 form-side">
          <h1>CREATE ACCOUNT</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">
                Firstname
              </label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                placeholder="Your Firstname"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">
                Lastname
              </label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                placeholder="Your Lastname"
              />
            </div>
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
            </div>
            <button type="submit" className="btn btn-primary w-100">
              SIGN UP
            </button>
            <p className="mt-3 text-center">
              Already have an account?{" "}
              <a
                href="#"
                className="register-link"
                onClick={() => navigate("/login")}
              >
                Sign in here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
