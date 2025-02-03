import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { emptyCart } from "../store/slices/cartSlice";
import { toast } from "react-toastify";

const Thankyou = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { cartData } = useSelector((state) => state.cart);
  useEffect(() => {
    if (cartData.length == 0) {
      navigateTo("/");
    }
    dispatch(emptyCart());
  }, []);
  return (
    <>
      <div className="order-container">
        <h2>Thank you for order!</h2>
        <Link to="/">Back to Home page</Link>
      </div>
    </>
  );
};

export default Thankyou;
