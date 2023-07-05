import React from "react";
import "./productdetail.css";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchProductById } from "../api/Api";
import { FaArrowLeft } from "react-icons/fa";

const ProductDetail = ({ onBack }) => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery(["product", id], () =>
    fetchProductById(id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  return (
    <div>
      <div className="container my-3">
        <Link to="/" className="btn btn-primary">
          <FaArrowLeft /> Back
        </Link>
        <div className="product">
          <img src={data.image} className="detail-img" alt={data.title} />
          <div className="product-details">
            <h1>{data.title}</h1>
            <p>${data.price}</p>
            <p>{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
