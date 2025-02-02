// import React from "react";
// import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row">
          {/* Logo and Contact Section */}
          <div className="col-md-3">
            <img style={{ width: "150px" }} src="/images/logo.svg" />
            <p>WhatsApp: +92 859 9999 999</p>
            <p>Email: rafiaandsumbal.com</p>
            <p>
              Address: Lorem ipsum street Block B Number 08, Islamabad, Pakistan
            </p>
          </div>

          {/* Menu Section */}
          <div className="col-md-3" style={{ paddingTop: "50px" }}>
            <h5>Menu</h5>
            <ul className={styles.list}>
              <li>Home</li>
              <li>Shop</li>
              <li>Landing Page</li>
            </ul>
          </div>

          {/* Get Help Section */}
          <div className="col-md-3" style={{ paddingTop: "50px" }}>
            <h5>Get Help</h5>
            <ul className={styles.list}>
              <li>Customer Service</li>
            </ul>
          </div>

          {/* Account Section */}
          <div className="col-md-3" style={{ paddingTop: "50px" }}>
            <h5>Account</h5>
            <ul className={styles.list}>
              <li>My Orders</li>
            </ul>
          </div>
        </div>
        <div className={styles.bottomText}>
          <p>All rights reserved</p>
          <p>Copyright 2025 By RAFIA AND SUMBAL</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
