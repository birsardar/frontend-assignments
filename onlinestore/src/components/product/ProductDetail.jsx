import React from "react";
import "./detail.css";

import { FaArrowLeft } from "react-icons/fa";

const ProductDetails = ({ product, onBack }) => {
  return (
    <div>
      {/* <button className="btn btn-primary" onClick={onBack}>
        Back
      </button>
      <h2>{product.title}</h2>
      <p>${product.price}</p>
      <p>{product.description}</p>
      Add any other product details you want to display */}
      <div className="container">
        <button className="btn btn-primary" onClick={onBack}>
          <FaArrowLeft />
        </button>
        <div className="desc">
          <img className="detail-img" src={product.image} alt="" />
          <h1>{product.title}</h1>
          <p>${product.price}</p>
          <div className="description">
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
