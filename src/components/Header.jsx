import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(storedCart.length);
  }, []);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "transparent",
        backdropFilter: "blur(12px)",
        boxShadow: "none",
        zIndex: "100",
        transition: "top 0.3s",
        top: visible ? 0 : "-80px",
        color: "#000",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
        }}
      >
        {/* Left Side: Logo (Always Stays Left) */}
        <Box
          sx={{
            fontFamily: "Futura",
            fontWeight: "bold",
            fontSize: "1.5rem",
            letterSpacing: "2px",
            cursor: "pointer",
            color: "#000",
            flex: "1", // Ensure it stays on the left
            textAlign: "left",
            whiteSpace: "nowrap", // Prevent wrapping
          }}
          onClick={() => navigate("/")}
        >
          RAFIA AND SUMBAL
        </Box>

        {/* Center: Navigation Links */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            gap: "2rem",
            textTransform: "uppercase",
            fontSize: "0.9rem",
            fontWeight: "bold",
            color: "#000",
            flex: "1", // Takes equal space for center alignment
            justifyContent: "center", // Keep it exactly in the center
          }}
        >
          <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            Home
          </span>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/products")}
          >
            Shop
          </span>
        </Box>

        {/* Right Side: Icons (Cart & Profile) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flex: "1",
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            sx={{ marginRight: "1rem", color: "#000" }}
            onClick={() => navigate("/cart")}
          >
            <Badge
              badgeContent={cartCount}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#D7A7AA",
                  color: "#fff",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  minWidth: "20px",
                  height: "20px",
                },
              }}
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* Profile Icon */}
          <IconButton
            sx={{ color: "#000" }}
            onClick={() => navigate("/my-account")}
          >
            <AccountCircleIcon />
          </IconButton>

          {/* Mobile Menu Icon */}
          <IconButton
            edge="start"
            aria-label="menu"
            sx={{
              display: { xs: "block", sm: "none" },
              color: "#000",
              position: "relative", // Ensures it moves within toolbar
              top: "-3px",
              right: "-8px",
              // Moves it up slightly
            }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            height: "100vh",
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button onClick={() => navigate("/")}>
              <ListItemText
                primary="Home"
                sx={{ color: "#000", fontWeight: "bold" }}
              />
            </ListItem>
            <ListItem button onClick={() => navigate("/products")}>
              <ListItemText
                primary="Shop"
                sx={{ color: "#000", fontWeight: "bold" }}
              />
            </ListItem>
            <ListItem button onClick={() => navigate("/cart")}>
              <ListItemText
                primary="Cart"
                sx={{ color: "#000", fontWeight: "bold" }}
              />
            </ListItem>
            <ListItem button onClick={() => navigate("/login")}>
              <ListItemText
                primary="Login"
                sx={{ color: "#000", fontWeight: "bold" }}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
