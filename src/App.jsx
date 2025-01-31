import React from "react";
import ProductList from "./components/ProductList";
import { Route, Routes } from "react-router-dom";
import ProductsDetail from "./components/ProductsDetail";
import Cart from "./components/Cart";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" Component={Navbar}>
          <Route path="/" Component={ProductList} />
          <Route path="/details/:pid" Component={ProductsDetail} />
          <Route path="/cart" Component={Cart} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
