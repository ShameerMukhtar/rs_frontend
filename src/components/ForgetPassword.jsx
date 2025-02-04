import React, { useState } from "react";
import "./Login.css"; // Assuming same styles as Signup modal
import { Modal } from "react-bootstrap";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/auth/forget-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Reset password link has been sent to your email.");
        setShowModal(true); // Show modal on success
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to send reset link. Please try again later.");
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
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              SEND RESET LINK
            </button>

            {/* Error Message */}
            {error && <p className="mt-3 text-danger">{error}</p>}

            {/* Back to Login Link */}
            <p className="mt-3 text-center">
              <a href="/login" className="register-link">
                Back to Login
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* ✅ SUCCESS MODAL (Auto-Opens, No Buttons) */}
      <Modal show={showModal} backdrop="static" keyboard={false} centered>
        <Modal.Header>
          <Modal.Title>Password Reset Link Sent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          A password reset link has been sent to your provided email address.
          Please check your inbox and follow the instructions.
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ForgotPassword;
