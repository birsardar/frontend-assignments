import React, { useState } from "react";
import { fetchProducts } from "../api/Api";
import "./productcard.css";
import { useQuery } from "react-query";
import ProductDetails from "./ProductDetail";

export default function ProductCard() {
  const { data, isLoading, isError } = useQuery("products", fetchProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  const handleDetailClick = (product) => {
    setSelectedProduct(product);
  };

  const handleBackClick = () => {
    setSelectedProduct(null);
  };
  

  return (
    <div className="container my-3">
      {selectedProduct ? (
        <ProductDetails product={selectedProduct} onBack={handleBackClick} />
      ) : (
        <div className="row">
          {data.map((item) => (
            <div key={item.id} className="col-md-4 mb-3">
              <div className="card">
                <img
                  className="card-img-top img-card"
                  src={item.image}
                  alt="Card cap"
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">${item.price}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleDetailClick(item)}
                  >
                    Detail Here
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
