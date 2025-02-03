import React from "react";
import { useNavigate } from "react-router-dom";

const Chekout = ({ cartData }) => {
  const navigateTo = useNavigate();
  return (
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
                    .reduce((acc, cart) => acc + cart.price * cart.count, 0)
                    .toFixed(2)}
                </strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <button className="btn-checkout" onClick={() => navigateTo("/checkout")}>
        Checkout
      </button>
    </div>
  );
};

export default Chekout;
