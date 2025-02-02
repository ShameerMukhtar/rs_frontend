import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OrderSuccess.module.css";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [showCheckmark, setShowCheckmark] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowCheckmark(true);
    }, 500); // Delay for checkmark animation
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.successBox}>
        <div
          className={`${styles.checkmarkContainer} ${
            showCheckmark ? styles.show : ""
          }`}
        >
          <svg className={styles.checkmark} viewBox="0 0 52 52">
            <circle
              className={styles.circle}
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path className={styles.check} fill="none" d="M14 27l7 7 16-16" />
          </svg>
        </div>
        <h2 className={styles.successText}>Order Placed Successfully! </h2>
        <p className={styles.message}>
          We'll notify you once your order is shipped with a tracking ID.
        </p>
        <button
          className={styles.homeButton}
          onClick={() => navigate("/landingpage")}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
