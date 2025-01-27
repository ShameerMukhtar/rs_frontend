import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  // Fetch cart data from sessionStorage
  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Handle deleting a cart item
  const handleDelete = (itemId, itemSize) => {
    const updatedCart = cartItems.filter(
      (item) => !(item.id === itemId && item.size === itemSize)
    );
    setCartItems(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle updating the quantity
  const handleQuantityChange = (itemId, itemSize, action) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId && item.size === itemSize) {
        if (action === "increase") {
          return { ...item, quantity: item.quantity + 1 };
        }
        if (action === "decrease" && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    });
    setCartItems(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate the subtotal and total dynamically
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total = subtotal; // You can apply discounts or additional logic here

  return (
    <div className={`${styles.cartPage} container`}>
      <h1 className={styles.title}>CART</h1>
      <div className="row">
        {/* Cart Items */}
        <div className="col-md-8">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                className={`row ${styles.cartItem}`}
                key={`${item.id}-${item.size}`}
              >
                <div className="col-md-2">
                  <img
                    src={item.image[0]}
                    alt={item.title}
                    className={styles.productImage}
                  />
                </div>
                <div className="col-md-6">
                  <h5 className={styles.productName}>{item.title}</h5>
                  {item.originalPrice ? (
                    <p className={styles.discountPrice}>
                      <span className={styles.originalPrice}>
                        {item.originalPrice}
                      </span>{" "}
                      <span className={styles.discount}>{item.discount}</span>{" "}
                      <span>{item.price}</span>
                    </p>
                  ) : (
                    <p>{item.price}</p>
                  )}
                  <input
                    type="text"
                    placeholder="Eg: Please double check before packing."
                    className={styles.noteInput}
                  />
                </div>
                <div className="col-md-3">
                  <div className={styles.quantityControls}>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.size, "decrease")
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.size, "increase")
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col-md-1">
                  <p
                    className={styles.deleteItem}
                    onClick={() => handleDelete(item.id, item.size)}
                  >
                    Delete
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Shopping Info */}
        {cartItems.length > 0 && (
          <div className="col-md-4">
            <div className={styles.shoppingInfo}>
              <h5>SHOPPING INFO</h5>
              <p>
                <span>Subtotal</span> <span>{subtotal}</span>
              </p>
              <p>
                <span>Total</span> <span>{total}</span>
              </p>
              <button
                className={styles.checkoutButton}
                onClick={() => navigate("/purchase")}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
