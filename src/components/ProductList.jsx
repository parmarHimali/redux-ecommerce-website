import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/productSlice";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
  const { loading, products, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  if (error) {
    return <h1>Error: {error}</h1>;
  }
  return (
    <>
      <h2 className="heading">Products List</h2>
      {loading ? (
        <h1 style={{ textAlign: "center" }}>Loading...</h1>
      ) : (
        <>
          <div className="product-container">
            {products.map((product) => {
              return (
                <div
                  className="product-card"
                  key={product.id}
                  onClick={() => navigateTo(`/details/${product.id}`)}
                >
                  <img src={product.image} alt="" />
                  <div>{product.title}</div>
                  <div className="product-price">
                    <h4>Price: ${product.price}</h4>
                    {/* <Link to={`/details/${product.id}`}>More Details</Link> */}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default ProductList;
