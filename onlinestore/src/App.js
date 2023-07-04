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

const App = () => {
  const products = fetchProducts(); // Fetch products using your API function

  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              path="/productcard"
              element={<ProductCard products={products} />}
            />
            <Route path="/productdetail/:id" element={ProductDetail} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
