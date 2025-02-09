import React, { useState, useEffect } from "react";
import styles from "./Purchase.module.css";
import { useNavigate } from "react-router-dom";

function Purchase() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    city: "",
    firstName: "",
    lastName: "",
    address: "",
    postalCode: "",
    phone: "",
    paymentMethod: "COD", // Default to COD
    notifyUser: false,
    cart: [],
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setFormData((prev) => ({
      ...prev,
      cart: savedCart,
    }));
  }, []);

  // Fetch user address if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:3000/product/get-address", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.userAddress) {
            setFormData((prev) => ({
              ...prev,
              firstName: data.userAddress.firstName || "",
              lastName: data.userAddress.lastName || "",
              address: data.userAddress.address || "",
              city: data.userAddress.city || "",
              postalCode: data.userAddress.zipCode || "",
              phone: data.userAddress.phone || "",
              email: data.userAddress.email || "",
            }));
          }
        })
        .catch((error) => console.error("Error fetching address:", error));
    }
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

    const token = localStorage.getItem("token");
    const payload = {
      cart: formData.cart,
      address: formData.address,
      zipCode: formData.postalCode,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      city: formData.city,
      phone: formData.phone,
      paymentMethod: formData.paymentMethod, // Pass the selected payment method
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
        localStorage.removeItem("cart"); // Clear cart from localStorage
        navigate("/order-success");
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
        <input
          type="text"
          id="city"
          placeholder="Enter your city"
          value={formData.city}
          onChange={handleChange}
        />
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
              value="COD"
              checked={formData.paymentMethod === "COD"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  paymentMethod: "COD",
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
