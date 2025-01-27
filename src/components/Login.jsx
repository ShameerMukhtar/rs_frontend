import React from "react";
import "./Login.css"; // Optional, for custom styling

const Login = () => {
  return (
    <>
      <div class="container-fluid">
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />

        <div class="row login-container">
          <div class="col-md-6 image-side"></div>

          <div class="col-md-6 form-side">
            <h1>RAFIA AND SUMBAL</h1>
            <form>
              <div class="mb-3">
                <label for="email" class="form-label">
                  EMAIL
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="example@mail.com"
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">
                  PASSWORD
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="********"
                />
                <ul class="password-criteria list-unstyled">
                  <li>✔ Minimum 8 characters</li>
                  <li>✔ Must contain at least 1 number</li>
                  <li>
                    ✔ Must contain at least 1 capital case and 1 small case
                  </li>
                  <li>✔ Must contain at least 1 symbol</li>
                </ul>
              </div>
              <button type="submit" class="btn btn-primary w-100">
                SIGN IN
              </button>
              <p class="mt-3">
                Don’t have an account?{" "}
                <a href="#" class="register-link">
                  Register here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    </>
  );
};

export default Login;
