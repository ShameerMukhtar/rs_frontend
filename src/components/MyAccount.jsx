import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const MyAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenFromParams = searchParams.get("token");
    const storedToken = sessionStorage.getItem("token");

    if (tokenFromParams) {
      verifyUser(tokenFromParams);
    } else if (storedToken) {
      fetchUserOrders(storedToken);
      fetchUserAddresses(storedToken);
      setLoading(false);
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  const verifyUser = async (token) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/verify?token=${token}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("token", data.token);
        fetchUserOrders(data.token);
        fetchUserAddresses(data.token);
      } else {
        console.error("Verification failed:", data.message);
      }
    } catch (error) {
      console.error("Error verifying account:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserOrders = async (token) => {
    try {
      const response = await fetch(
        "http://localhost:3000/product/get-user-orders",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) setOrders(data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchUserAddresses = async (token) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/product/get-user-addresses`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) setAddresses(data.addresses || []);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <Header />
      <br />
      <br />
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>My Account</h2>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {/* My Orders Section */}
            <div className="card mb-4">
              <div
                className="card-header text-white"
                style={{
                  backgroundColor: "#D7A7AA", // Matching palette color
                }}
              >
                <h5 className="mb-0">My Orders</h5>
              </div>
              <div className="card-body">
                {orders.length > 0 ? (
                  <ul className="list-group">
                    {orders.map((order) => (
                      <li key={order._id} className="list-group-item">
                        <strong>Order ID:</strong> {order._id} -{" "}
                        <strong>Total:</strong> Rs {order.totalPrice}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted">No orders available.</p>
                )}
              </div>
            </div>

            {/* My Addresses Section */}
            <div className="card mb-5">
              {" "}
              {/* ✅ Added margin-bottom to avoid sticking to the footer */}
              <div
                className="card-header text-white"
                style={{
                  backgroundColor: "#D7A7AA", // Same color as "My Orders"
                }}
              >
                <h5 className="mb-0">My Addresses</h5>
              </div>
              <div className="card-body">
                {addresses.length > 0 ? (
                  <ul className="list-group">
                    {addresses.map((address, index) => (
                      <li key={index} className="list-group-item">
                        {address.address}, {address.city}, {address.zipCode}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted">No addresses available.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyAccount;
