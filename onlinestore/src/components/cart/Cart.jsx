import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./cart.css";
export default function Cart({ cartItems, removeFromCart, setCartItems }) {
  // const handleIncreaseQuantity = (item) => {
  //   const updatedCartItems = cartItems.map((cartItem) => {
  //     if (cartItem.id === item.id) {
  //       return { ...cartItem, quantity: cartItem.quantity + 1 };
  //     }
  //     return cartItem;
  //   });
  //   setCartItems([...updatedCartItems]);
  // };

  // const handleDecreaseQuantity = (item) => {
  //   const updatedCartItems = cartItems.map((cartItem) => {
  //     if (cartItem.id === item.id && cartItem.quantity > 1) {
  //       return { ...cartItem, quantity: cartItem.quantity - 1 };
  //     }
  //     return cartItem;
  //   });
  //   setCartItems([...updatedCartItems]);
  // };

  const handleRemove = (item) => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(updatedCartItems);
  };

  // Create a map to track the quantity of each unique cart item
  const itemCountMap = cartItems.reduce((map, item) => {
    if (map.has(item.id)) {
      map.set(item.id, map.get(item.id) + 1);
    } else {
      map.set(item.id, 1);
    }
    return map;
  }, new Map());
  // Calculate the total price
  const uniqueCartItems = Array.from(
    new Set(cartItems.map((item) => item.id))
  ).map((id) => {
    return cartItems.find((item) => item.id === id);
  });

  const totalPrice = uniqueCartItems.reduce((total, cartItem) => {
    const count = itemCountMap.get(cartItem.id);
    const itemTotalPrice = cartItem.price * count;
    return total + itemTotalPrice;
  }, 0);
  const roundedPrice = Math.ceil(totalPrice);

  return (
    <div>
      <div className="container my-3">
        <Link to="/" className="btn btn-primary">
          <FaArrowLeft /> Back
        </Link>
        <div className="mt-3">
          <h3>Cart Items</h3>
          {cartItems.length === 0 ? (
            <div className="noitem">
              <p>No items in the cart.</p>
              <p>Please add Some Item </p>
            </div>
          ) : (
            <div className="row">
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[...itemCountMap.entries()].map(([itemId, count]) => {
                    const item = cartItems.find((item) => item.id === itemId);
                    return (
                      <tr key={`${itemId}`}>
                        <td>
                          {item.title.length > 50
                            ? item.title.slice(0, 50)
                            : item.title}
                        </td>
                        <td>
                          {/* <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleDecreaseQuantity(item)}
                          >
                            -
                          </button> */}
                          {count}
                          {/* <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleIncreaseQuantity(item)}
                          >
                            +
                          </button> */}
                        </td>
                        <td>${item.price * count}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleRemove(item)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td colSpan="2">Total Price:</td>
                    <td>${roundedPrice}</td>
                    <td>
                      <button className="btn btn-success">Pay</button>
                    </td>
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
