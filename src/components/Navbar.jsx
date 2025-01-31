import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">E-Commerce</Link>
          </li>
          <li>
            <Link className="center-item" to="/cart">
              Cart
              <FaCartShopping />
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
