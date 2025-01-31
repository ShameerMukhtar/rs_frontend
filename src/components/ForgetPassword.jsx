import React, { useState } from "react";
import "./Login.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("If this email exists, a password reset link has been sent.");
  };

  return (
    <div className="container-fluid">
      <div className="row login-container">
        {/* Left Side Image */}
        <div className="col-md-6 image-side"></div>

        {/* Right Side Form */}
        <div className="col-md-6 form-side">
          <h1>RESET PASSWORD</h1>
          <p>Enter your email address to receive a password reset link.</p>
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
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              SEND RESET LINK
            </button>
            {message && <p className="mt-3 text-success">{message}</p>}
            <p className="mt-3 text-center">
              <a href="/login" className="register-link">
                Back to Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
