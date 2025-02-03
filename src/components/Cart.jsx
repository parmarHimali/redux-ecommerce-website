import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Chekout from "./Chekout";
import CartDetails from "./CartDetails";

const Cart = () => {
  const { cartData } = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartData));
  }, [cartData]);

  return (
    <>
      <h2 className="heading">Shopping Cart</h2>
      {cartData.length === 0 ? (
        <div className="not-found">
          <h2>No products available in Cart</h2>
          <Link to="/">Back to Home</Link>
        </div>
      ) : (
        <div className="cart-container">
          <CartDetails cartData={cartData} />
          <Chekout cartData={cartData} />
        </div>
      )}
    </>
  );
};

export default Cart;
