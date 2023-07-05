import React from "react";
import { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetail from "./components/product/ProductDetail";
import Cart from "./components/cart/Cart";
import ProductCard from "./components/product/ProductCard";
import Navbar from "./components/Navbar";
import Footer from "./components/footer/Footer";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  return (
    <>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <ProductCard
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
              }
            />
            <Route path="/productcard" />
            <Route path="/productdetail/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
};

export default App;
