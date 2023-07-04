import React from "react";
import Navbar from "../Navbar";
import ProductCard from "../product/ProductCard";
import Footer from "../footer/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <ProductCard />
      <Footer />
    </div>
  );
}
