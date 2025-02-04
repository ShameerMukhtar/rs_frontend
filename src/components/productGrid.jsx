import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./ProductGrid.module.css";
import { useNavigate } from "react-router-dom";

const ProductGrid = () => {
  const [products, setProducts] = useState([]); // All products
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/product/get-all-products`
        );
        const data = await response.json();
        setProducts(data.products); // Assuming API response has a "products" array
        setFilteredProducts(data.products); // Initially show all products
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilter = (filter) => {
    if (filter === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category.toLowerCase() === filter
      );
      setFilteredProducts(filtered);
    }
  };

  if (loading) {
    return <p className={styles.loading}>Loading products...</p>;
  }

  return (
    <>
      <Header />

      {/* Filter Section */}
      <div className={styles.filterSection}>
        <button onClick={() => handleFilter("all")}>All Products</button>
        <button onClick={() => handleFilter("spring collection")}>
          Spring Collection
        </button>
        <button onClick={() => handleFilter("summer collection")}>
          Summer Collection
        </button>

        <button onClick={() => handleFilter("fall collection")}>
          Fall Collection
        </button>
        <button onClick={() => handleFilter("winter collection")}>
          Winter Collection
        </button>
      </div>

      {/* Product Grid */}
      <div className={styles.productGrid}>
        <div className="container">
          <div className={styles.row}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  className={styles.productCard}
                  key={product._id}
                  onClick={() => navigate(`/details/${product._id}`)}
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className={styles.productImage}
                  />
                  <div className={styles.productDetails}>
                    <span className={styles.category}>{product.category}</span>
                    <h5 className={styles.productName}>{product.title}</h5>
                    <p className={styles.price}>PKR {product.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noProducts}>No products to display</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductGrid;
