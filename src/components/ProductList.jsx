import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/productSlice";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const { loading, products, error } = useSelector((state) => state.products);
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  if (error) {
    return <h1>Error: {error}</h1>;
  }
  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };
  return (
    <>
      {loading ? (
        <h1 className="loading">Loading...</h1>
      ) : (
        <>
          <div className="heading-container">
            <h2>Products List</h2>
            <input
              type="text"
              placeholder="Search Products"
              value={query}
              onChange={handleSearch}
            />
          </div>
          <div className="product-container">
            {filteredProducts.length === 0 ? (
              <h2>No products found!</h2>
            ) : (
              filteredProducts.map((product) => {
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
              })
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ProductList;
