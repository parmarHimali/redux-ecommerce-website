import React from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { useDispatch } from "react-redux";
import {
  decrementCount,
  incrementCount,
  removeFromCart,
} from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartDetails = ({ cartData }) => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Product removed from the cart!", {
      position: "top-center",
      autoClose: 2000,
    });
  };
  return (
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
  );
};

export default CartDetails;
