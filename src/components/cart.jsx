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

  // Handle updating the quantity with stock limit check
  const handleQuantityChange = (itemId, itemSize, action) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId && item.size === itemSize) {
        const maxStock =
          item.size === "S"
            ? item.smallQuantity
            : item.size === "M"
            ? item.mediumQuantity
            : item.largeQuantity;

        if (action === "increase" && item.quantity < maxStock) {
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

  // Handle adding a note to a specific cart item
  const handleNoteChange = (itemId, itemSize, note) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId && item.size === itemSize) {
        return { ...item, note };
      }
      return item;
    });

    setCartItems(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart)); // Save notes in sessionStorage
  };

  // Calculate the subtotal and total dynamically
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total = subtotal;

  return (
    <div className={`${styles.cartPage} container`}>
      <h1 className={styles.title}>CART</h1>
      <div className="row">
        {/* Cart Items */}
        <div className="col-md-8">
          {cartItems.length === 0 ? (
            <p className={styles.emptyCart}>Your cart is empty.</p>
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
                  <p className={styles.price}>PKR {item.price}</p>
                  <p className={styles.sizeText}>Size: {item.size}</p>
                  <input
                    type="text"
                    placeholder="Add note (optional)..."
                    className={styles.noteInput}
                    value={item.note || ""}
                    onChange={(e) =>
                      handleNoteChange(item.id, item.size, e.target.value)
                    }
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
                      disabled={
                        item.quantity >=
                        (item.size === "S"
                          ? item.smallQuantity
                          : item.size === "M"
                          ? item.mediumQuantity
                          : item.largeQuantity)
                      }
                    >
                      +
                    </button>
                  </div>
                  {item.quantity >=
                    (item.size === "S"
                      ? item.smallQuantity
                      : item.size === "M"
                      ? item.mediumQuantity
                      : item.largeQuantity) && (
                    <p className={styles.stockWarning}>
                      Max stock limit reached!
                    </p>
                  )}
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
                <span>Subtotal</span> <span>PKR {subtotal}</span>
              </p>
              <p>
                <span>Total</span> <span>PKR {total}</span>
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
