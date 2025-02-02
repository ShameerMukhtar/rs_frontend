import React, { useState, useEffect } from "react";
import styles from "./Purchase.module.css";

function Purchase() {
  const [formData, setFormData] = useState({
    email: "",
    city: "",
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
    phone: "",
    paymentMethod: "cash",
    notifyUser: false,
    cart: [],
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false); // New state for success animation

  // Fetch cart data from sessionStorage on component mount
  useEffect(() => {
    const savedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setFormData((prev) => ({
      ...prev,
      cart: savedCart,
    }));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = sessionStorage.getItem("token");
    const payload = {
      cart: formData.cart,
      address: formData.address,
      zipCode: formData.postalCode,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      city: formData.city,
      phone: formData.phone,
      notifyUser: formData.notifyUser,
    };

    try {
      const response = await fetch("http://localhost:3000/product/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Order placed successfully!");
        sessionStorage.removeItem("cart"); // Clear cart from sessionStorage
        setOrderPlaced(true); // Trigger success animation
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setMessage("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    // Success Screen
    return (
      <div className={styles.successContainer}>
        <div className={styles.successAnimation}>
          <h2>🎉 Order Placed Successfully! 🎉</h2>
        </div>
        <button
          className={styles.backButton}
          onClick={() => {
            window.location.href = "/"; // Redirect to home
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles["form-section"]}>
        <h2>Contact</h2>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        <div className={styles.checkbox}>
          <input
            type="checkbox"
            id="notifyUser"
            checked={formData.notifyUser}
            onChange={handleChange}
          />
          <label htmlFor="notifyUser">Email me with news and offers</label>
        </div>

        <h2>Delivery</h2>
        <label htmlFor="city">City</label>
        <select id="city" value={formData.city} onChange={handleChange}>
          <option value="">Select city from dropdown</option>
          <option value="Karachi">Karachi</option>
          <option value="Lahore">Lahore</option>
          <option value="Islamabad">Islamabad</option>
        </select>
        <label htmlFor="country">Country/Region</label>
        <input type="text" id="country" value="Pakistan" disabled />
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          placeholder="Enter your last name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          placeholder="Enter your address"
          value={formData.address}
          onChange={handleChange}
        />
        <label htmlFor="postalCode">Postal Code</label>
        <input
          type="text"
          id="postalCode"
          placeholder="Enter postal code"
          value={formData.postalCode}
          onChange={handleChange}
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleChange}
        />

        <div className={styles.paymentMethods}>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={formData.paymentMethod === "cash"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  paymentMethod: e.target.value,
                }))
              }
            />
            Cash on Delivery
          </label>
          <label className={styles.disabledOption}>
            <input type="radio" name="paymentMethod" value="card" disabled />
            Credit/Debit Card
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
        {message && <p>{message}</p>}
      </form>

      <div className={styles["summary-section"]}>
        <h3>Order Summary</h3>
        {formData.cart.map((item, index) => (
          <div key={index} className={styles["summary-item"]}>
            <span>{item.title}</span>
            <span>
              Rs {item.price.toLocaleString()} x {item.quantity}
            </span>
          </div>
        ))}
        <div className={styles["summary-item"]}>
          <span>Shipping</span>
          <span>Rs 300.00</span>
        </div>
        <div className={styles.total}>
          Total: Rs{" "}
          {(
            formData.cart.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            ) + 300
          ).toLocaleString()}
        </div>
      </div>
    </div>
  );
}

export default Purchase;
