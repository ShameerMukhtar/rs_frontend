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
  const [showSizeGuide, setShowSizeGuide] = useState(false); // State for size guide modal

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/product/product-details/${id}`
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
    const savedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const handleSizeSelection = (size) => {
    const isDisabled =
      (size === "S" && product.smallQuantity === 0) ||
      (size === "M" && product.mediumQuantity === 0) ||
      (size === "L" && product.largeQuantity === 0);

    if (!isDisabled) {
      setSelectedSize(size);
    }
  };

  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity(quantity + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    const cartItem = {
      id: product._id,
      title: product.title,
      price: product.price,
      size: selectedSize,
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
      alert("Product quantity updated in cart!");
    } else {
      updatedCart = [...cart, cartItem];
      alert("Product added to cart!");
    }

    setCart(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleThumbnailClick = (image) => {
    setMainImage(image);
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
                  onClick={() => handleThumbnailClick(image)}
                />
              ))}
            </div>
          </div>

          <div className="col-md-6">
            <span className={styles.category}>{product.category}</span>
            <h1 className={styles.title}>{product.title}</h1>
            <div className={styles.priceSection}>
              <span className={styles.originalPrice}>PKR {product.price}</span>
            </div>
            <p className={styles.description}>{product.description}</p>

            <div className={styles.sizesContainer}>
              <div className={styles.sizes}>
                {["S", "M", "L"].map((size) => {
                  const isDisabled =
                    (size === "S" && product.smallQuantity === 0) ||
                    (size === "M" && product.mediumQuantity === 0) ||
                    (size === "L" && product.largeQuantity === 0);

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
