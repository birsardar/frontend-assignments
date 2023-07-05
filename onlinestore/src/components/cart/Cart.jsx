import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
export default function Cart({ cartItems }) {
  const totalPrice = cartItems.reduce(
    (total, cartItem) => total + cartItem.price,
    0
  );
  return (
    <div>
      <div className="container my-3">
        <Link to="/" className="btn btn-primary">
          <FaArrowLeft /> Back
        </Link>
        <div className="mt-3">
          <h3>Cart Items</h3>
          {cartItems.length === 0 ? (
            <p>No items in the cart.</p>
          ) : (
            <div className="row">
              <table class=" table table-dark">
                <thead>
                  <tr>
                    <th scope="col">S.N</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                {cartItems.map((cartItem, key) => (
                  <tbody>
                    <tr>
                      <td>{key + 1}</td>
                      <td>{cartItem.title}</td>
                      <td>{cartItem.price}</td>
                    </tr>
                  </tbody>
                ))}

                <tbody>
                  <tr>
                    <td></td>
                    <td>Total Price</td>
                    <td>{totalPrice}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
