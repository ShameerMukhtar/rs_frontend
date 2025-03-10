// import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./home.css";
// import Footer from "./Footer";
import Header from "./Header";
import ResponsiveCardGrid from "./Cards/Cards";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Footer from "./Footer";
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CallIcon from "@mui/icons-material/Call";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Blogs from "./Blogs/Blogs";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

// Fetch latest 4 products from API

const cardData = [
  {
    id: 1,
    icon: <ThumbUpIcon sx={{ fontSize: "40px", color: "#FFF" }} />,
    title: "100% Satisfaction Guaranteed",
    description:
      "Lorem ipsum dolor sit amet consectetur. Suspendisse laoreet scelerisque morbi vulputate. Quisque bibendum eget id diam elementum fringilla dui.",
  },
  {
    id: 2,
    icon: <CallIcon sx={{ fontSize: "40px", color: "#FFF" }} />,
    title: "24/7 Online Service",
    description:
      "Lorem ipsum dolor sit amet consectetur. Suspendisse laoreet scelerisque morbi vulputate. Quisque bibendum eget id diam elementum fringilla dui.",
  },
  {
    id: 3,
    icon: <RocketLaunchIcon sx={{ fontSize: "40px", color: "#FFF" }} />,
    title: "Fast Delivery",
    description:
      "Lorem ipsum dolor sit amet consectetur. Suspendisse laoreet scelerisque morbi vulputate. Quisque bibendum eget id diam elementum fringilla dui.",
  },
  {
    id: 4,
    icon: <CreditCardIcon sx={{ fontSize: "40px", color: "#FFF" }} />,
    title: "Payment With Secure System",
    description:
      "Lorem ipsum dolor sit amet consectetur. Suspendisse laoreet scelerisque morbi vulputate. Quisque bibendum eget id diam elementum fringilla dui.",
  },
];

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/product/latest-product`
        );
        const data = await response.json();
        setProducts(data.products); // Store latest products in state
      } catch (error) {
        console.error("Error fetching latest products:", error);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="container-fluid p-0">
      {/* Hero Section */}
      <section className="">
        <div className="home__main">
          <Header />

          {/* <img
            src="/images/hero.svg"
            alt="/"
            className=""
            style={{ width: "100%" }}
          /> */}
          {/* <h1>DISCOVER THE ART OF DRESSING UP</h1> */}
        </div>
      </section>

      {/* Categories Section */}
      <ResponsiveCardGrid />

      {/* Products Section */}
      <Box sx={{ padding: "40px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          THE BEST DRESS FOR THE BEST WOMAN
        </Typography>

        {/* Handle Loading & Error */}
        {loading ? (
          <Typography variant="h6" align="center">
            Loading latest products...
          </Typography>
        ) : error ? (
          <Typography variant="h6" align="center" color="error">
            {error}
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product._id}>
                <Card
                  sx={{
                    borderRadius: "8px",
                    boxShadow: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/details/${product._id}`)} // Navigate to product details page
                >
                  <CardMedia
                    component="img"
                    height="400"
                    image={product.images[0]} // Use product image from API
                    alt={product.title}
                  />
                  <CardContent
                    sx={{ backgroundColor: "transparent", boxShadow: "none" }}
                  >
                    <Typography variant="caption" color="textSecondary">
                      {product.category}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      PKR {product.price.toLocaleString()} {/* Format price */}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* "See More" Button */}
        <Box mt={4}>
          <Button
            onClick={() => navigate("/products")}
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#D7A7AA",
              padding: "16px",
              fontWeight: "500",
              boxShadow: "none",
            }}
            endIcon={<ArrowForwardIcon />}
          >
            SEE MORE
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ padding: "20px", backgroundColor: "transparent" }}>
        <Grid container spacing={3} alignItems="stretch">
          {/* First card */}
          <Grid item xs={12} md={3.5} sx={{ display: "flex" }}>
            <Card
              sx={{
                border: "24px solid #FFEBEB",
                borderRadius: "12px",
                textAlign: "center",
                padding: "20px",
                backgroundColor: "#FFFFFF",
                boxShadow: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    backgroundColor: "#D7A7AA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    marginBottom: "20px",
                  }}
                >
                  {cardData[0].icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "'Urbanist', sans-serif",
                    fontWeight: "600",
                  }}
                  gutterBottom
                >
                  {cardData[0].title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "'Urbanist', sans-serif",
                    color: "#666666",
                  }}
                >
                  {cardData[0].description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Middle column with two stacked cards */}
          <Grid item xs={12} md={5}>
            <Grid container spacing={3} direction="column" alignItems="stretch">
              {cardData.slice(1, 3).map((card) => (
                <Grid item key={card.id} sx={{ display: "flex" }}>
                  <Card
                    sx={{
                      border: "24px solid #FFEBEB",
                      borderRadius: "12px",
                      textAlign: "center",
                      padding: "20px",
                      backgroundColor: "#FFFFFF",
                      boxShadow: "none",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%", // Ensures cards stretch equally
                    }}
                  >
                    <CardContent
                      sx={{
                        display: { xs: "block", md: "flex" },
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          width: "80px",
                          height: "75px",
                          borderRadius: "50%",
                          backgroundColor: "#D7A7AA",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto",
                          marginBottom: { xs: "20px", md: "0px" },
                        }}
                      >
                        {card.icon}
                      </Box>
                      <Box sx={{ width: "100%" }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontFamily: "'Urbanist', sans-serif",
                            fontWeight: "600",
                            textAlign: { xs: "center", md: "left" },
                          }}
                          gutterBottom
                        >
                          {card.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: "'Urbanist', sans-serif",
                            color: "#666666",
                            textAlign: { xs: "center", md: "left" },
                          }}
                        >
                          {card.description}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Last card */}
          <Grid item xs={12} md={3.5} sx={{ display: "flex" }}>
            <Card
              sx={{
                border: "24px solid #FFEBEB",
                borderRadius: "12px",
                textAlign: "center",
                padding: "20px",
                backgroundColor: "#FFFFFF",
                boxShadow: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    backgroundColor: "#D7A7AA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    marginBottom: "20px",
                  }}
                >
                  {cardData[3].icon}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "'Urbanist', sans-serif",
                    fontWeight: "600",
                  }}
                  gutterBottom
                >
                  {cardData[3].title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "'Urbanist', sans-serif",
                    color: "#666666",
                  }}
                >
                  {cardData[3].description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <section className="" style={{ marginTop: "100px" }}>
        <img src="/images/last.svg" style={{ width: "100%" }} />
      </section>
      <Blogs />
      <Footer />
    </div>
  );
}

export default App;
