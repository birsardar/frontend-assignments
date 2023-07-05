// ProductCard.js

import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { fetchProducts } from "../api/Api";
import "./productcard.css";
import { useQuery } from "react-query";

export default function ProductCard() {
  const { data, isLoading, isError } = useQuery("products", fetchProducts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  return (
    <div className="container my-3">
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
                <Link to={`/productdetail/${item.id}`}>click here</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
