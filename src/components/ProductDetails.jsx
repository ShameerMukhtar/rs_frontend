import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  console.log("i am using", import.meta.env.VITE_API_URL);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/product/product-details/${id}`
        );
        const data = await response.json();
        setProduct(data.product);
        setMainImage(data.product.images[0]);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const handleSizeSelection = (size) => {
    const stock =
      size === "S"
        ? product.smallQuantity
        : size === "M"
        ? product.mediumQuantity
        : product.largeQuantity;

    if (stock > 0) {
      setSelectedSize(size);
      setQuantity(1); // Reset quantity when changing size
      setErrorMessage(""); // Clear error message
    }
  };

  const handleQuantityChange = (type) => {
    if (!selectedSize) {
      setErrorMessage("Please select a size first.");
      return;
    }

    const stock =
      selectedSize === "S"
        ? product.smallQuantity
        : selectedSize === "M"
        ? product.mediumQuantity
        : product.largeQuantity;

    if (type === "increase" && quantity < stock) {
      setQuantity(quantity + 1);
      setErrorMessage("");
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === "increase") {
      setErrorMessage(`Only ${stock} items available in this size.`);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setErrorMessage("Please select a size before adding to cart.");
      return;
    }

    const stock =
      selectedSize === "S"
        ? product.smallQuantity
        : selectedSize === "M"
        ? product.mediumQuantity
        : product.largeQuantity;

    if (quantity > stock) {
      setErrorMessage(`Only ${stock} items available in this size.`);
      return;
    }

    const cartItem = {
      id: product._id,
      title: product.title,
      price: product.price,
      size: selectedSize,
      largeQuantity: product.largeQuantity,
      mediumQuantity: product.mediumQuantity,
      smallQuantity: product.smallQuantity,
      quantity,
      image: product.images,
    };

    const existingItemIndex = cart.findIndex(
      (item) => item.id === cartItem.id && item.size === selectedSize
    );

    let updatedCart;

    if (existingItemIndex !== -1) {
      updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
    } else {
      updatedCart = [...cart, cartItem];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setErrorMessage(""); // ✅ Clear error message
    setSelectedSize(null); // ✅ Reset selected size
    setQuantity(1); // ✅ Reset quantity

    // ✅ Use setTimeout to ensure navigation happens correctly
    setTimeout(() => {
      navigate("/cart");
    }, 200); // Short delay ensures state updates properly
  };

  const handleCheckout = () => {
    if (!selectedSize) {
      setErrorMessage("Please select a size before adding to cart.");
      return;
    }

    const stock =
      selectedSize === "S"
        ? product.smallQuantity
        : selectedSize === "M"
        ? product.mediumQuantity
        : product.largeQuantity;

    if (quantity > stock) {
      setErrorMessage(`Only ${stock} items available in this size.`);
      return;
    }

    const cartItem = {
      id: product._id,
      title: product.title,
      price: product.price,
      size: selectedSize,
      largeQuantity: product.largeQuantity,
      mediumQuantity: product.mediumQuantity,
      smallQuantity: product.smallQuantity,
      quantity,
      image: product.images,
    };

    const existingItemIndex = cart.findIndex(
      (item) => item.id === cartItem.id && item.size === selectedSize
    );

    let updatedCart;

    if (existingItemIndex !== -1) {
      updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
    } else {
      updatedCart = [...cart, cartItem];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setErrorMessage(""); // ✅ Clear error message
    setSelectedSize(null); // ✅ Reset selected size
    setQuantity(1); // ✅ Reset quantity

    // ✅ Use setTimeout to ensure navigation happens correctly
    setTimeout(() => {
      navigate("/purchase");
    }, 200); // Short delay ensures state updates properly
  };

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <div className={`container ${styles.productDetails}`}>
        <Header />
        <div className="row">
          <div className="col-md-6">
            <img
              src={mainImage}
              alt={product.title}
              className={styles.mainImage}
            />
            <div className={styles.thumbnailContainer}>
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`${styles.thumbnail} ${
                    mainImage === image ? styles.selectedThumbnail : ""
                  }`}
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>
          </div>

          <div className="col-md-6">
            <span className={styles.category}>{product.category}</span>
            <h1 className={styles.title}>{product.title}</h1>
            <div className={styles.priceSection}>
              <span className={styles.price}>PKR {product.price}</span>
            </div>
            <p className={styles.description}>{product.description}</p>

            {/* Sizes Section */}
            <div className={styles.sizesContainer}>
              <div className={styles.sizes}>
                {["S", "M", "L"].map((size) => {
                  const stock =
                    size === "S"
                      ? product.smallQuantity
                      : size === "M"
                      ? product.mediumQuantity
                      : product.largeQuantity;
                  const isDisabled = stock === 0;

                  return (
                    <button
                      key={size}
                      className={`${styles.sizeButton} ${
                        selectedSize === size ? styles.selectedSize : ""
                      } ${isDisabled ? styles.disabledSize : ""}`}
                      onClick={() => handleSizeSelection(size)}
                      disabled={isDisabled}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
              <button
                className={styles.sizeGuideButton}
                onClick={() => setShowSizeGuide(true)}
              >
                Size Guide
              </button>
            </div>

            {/* Quantity Section */}
            <div className={styles.quantitySection}>
              <span>Quantity</span>
              <div className={styles.quantityControls}>
                <button onClick={() => handleQuantityChange("decrease")}>
                  -
                </button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange("increase")}>
                  +
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}

            {/* Buttons */}
            <button
              onClick={handleAddToCart}
              className={styles.addToCartButton}
            >
              ADD TO CART
            </button>

            <button onClick={handleCheckout} className={styles.checkoutButton}>
              CHECKOUT
            </button>
          </div>
        </div>
      </div>

      <Footer />

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className={styles.sizeGuideOverlay}>
          <div className={styles.sizeGuideModal}>
            <button
              className={styles.closeButton}
              onClick={() => setShowSizeGuide(false)}
            >
              ✖
            </button>
            <img
              src="/images/Sizechart.jpeg"
              alt="Size Guide"
              className={styles.sizeGuideImage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
