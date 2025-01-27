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
  const [cartCount, setCartCount] = useState(0); // State for cart count
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
    // Fetch cart count from sessionStorage
    const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCartCount(storedCart.length);
  }, []);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        boxShadow: "none",
        backdropFilter: "blur(10px)",
        zIndex: "100",
        transition: "top 0.3s",
        top: visible ? 0 : "-80px",
        color: "black",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left Side: Logo */}
        <Box
          sx={{
            fontFamily: "Futura",
            fontWeight: "bold",
            fontSize: "1.5rem",
            letterSpacing: "2px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          Rafia & Sumbal
        </Box>

        {/* Center: Navigation Links */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            gap: "2rem",
            textTransform: "uppercase",
            fontSize: "0.9rem",
            fontWeight: "bold",
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

        {/* Right Side: Icons */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            sx={{ marginRight: "1rem" }}
            onClick={() => navigate("/cart")}
          >
            <Badge
              badgeContent={cartCount}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
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
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Box>

        {/* Mobile Menu Icon */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: "block", sm: "none" } }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button onClick={() => navigate("/")}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => navigate("/products")}>
              <ListItemText primary="Shop" />
            </ListItem>
            <ListItem button onClick={() => navigate("/cart")}>
              <ListItemText primary="Cart" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
