import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiPlus } from "react-icons/hi";
import { HiMinus } from "react-icons/hi2";

import {
  decrementCount,
  incrementCount,
  removeFromCart,
} from "../store/slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const { products } = useSelector((state) => state.products);
  const { cartData } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const navigateTo = useNavigate();
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartData));
  }, [cartData]);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Product removed from the cart!", {
      position: "top-center",
      autoClose: 2000,
    });
  };
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
          <div className="main-cart">
            {cartData.map((cart) => {
              return (
                <div className="cart-card" key={cart.id}>
                  <div className="cart-img">
                    <img
                      src={cart.image}
                      alt={cart.title}
                      onClick={() => navigateTo(`/details/${cart.id}`)}
                    />
                  </div>
                  <div className="cart-content">
                    <div>{cart.title}</div>
                    <h4>Price: ${cart.price}</h4>
                    <div className="counter">
                      <button
                        className="btn-count"
                        onClick={() => dispatch(decrementCount(cart.id))}
                        disabled={cart.count == 1}
                      >
                        <HiMinus />
                      </button>
                      <h3>{cart.count}</h3>
                      <button
                        className="btn-count"
                        onClick={() => dispatch(incrementCount(cart.id))}
                      >
                        <HiPlus />
                      </button>
                    </div>
                    <h4>Total Price: ${cart.count * cart.price}</h4>
                    <button
                      className="btn-remove"
                      style={{ alignSelf: "flex-start" }}
                      onClick={() => handleRemove(cart.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="checkout-container">
            <h2>Checkout</h2>
            <div className="checkout-detail">
              <table border="2">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.map((cart) => {
                    return (
                      <tr key={cart.id}>
                        <td>{cart.title}</td>
                        <td>
                          <strong>${cart.price * cart.count}</strong>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td>Total</td>
                    <td>
                      <strong>
                        $
                        {cartData
                          .reduce(
                            (acc, cart) => acc + cart.price * cart.count,
                            0
                          )
                          .toFixed(2)}
                      </strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <button className="btn-checkout">Checkout</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
