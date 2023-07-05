// import React from "react";
// import "./App.css";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
// import Home from "./components/pages/Home";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// export default function App() {
//   return (
//     <div>
//       <Home/>
//     </div>
//   );
// }

// App.js
import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductCard from "./components/product/ProductCard";
import ProductDetail from "./components/product/ProductDetail";
import { fetchProducts } from "./components/api/Api"; // Adjust the path to your API functions
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Cart from "./components/cart/Cart";

const App = () => {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/productcard" />
            <Route path="/productdetail/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
