import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
// import Register from "./components/Register";
import Home from "./components/Home";
// import Footer from "./components/Footer";
// import Header from "./components/Header";
import ProductGrid from "./components/productGrid";
import Cart from "./components/cart";
import ProductDetails from "./components/ProductDetails";

import Splash from "./components/Splash/Splash";
import CompingSoon from "./components/Splash/ComingSoon";
import Purchase from "./components/purchase";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgetPassword";
import MyAccount from "./components/MyAccount";
import Blogs from "./components/Blogs/Blogs";
import OrderSuccess from "./components/OrderSuccess";
import ResetPassword from "./components/ResetPassword";
const App = () => {
  return (
    <>
      <Router>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>

        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          {/* <Route path="/login" element={<Login />} />*/}
          <Route path="/ComingSoon" element={<CompingSoon />} />
          <Route path="/landingpage" element={<Home />} />
          <Route path="/" element={<Splash />} />
          <Route path="/products" element={<ProductGrid />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          {/* <Route path="/register" element={<Register />} /> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
