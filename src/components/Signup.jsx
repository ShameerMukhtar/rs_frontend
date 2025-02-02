import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Reuse the same CSS
import { Modal, Button } from "react-bootstrap"; // Bootstrap Modal

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false); // Keep modal open

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Show verification modal
        setShowVerifyModal(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || "Signup failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Error during signup:", error);
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
          <h1>CREATE ACCOUNT</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">
                Firstname
              </label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                placeholder="Your Firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
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
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
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
            </div>
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "SIGN UP"}
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

      {/* Bootstrap Modal for Email Verification */}
      <Modal show={showVerifyModal} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Email Verification Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            A verification link has been sent to your email. Please check your
            inbox and click the link to verify your account.
          </p>
          <p>
            After verifying, you will be redirected to your account page
            automatically.
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Signup;
