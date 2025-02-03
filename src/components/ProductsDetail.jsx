import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProducts, productDetail } from "../store/slices/productSlice";
import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { addTocart, removeFromCart } from "../store/slices/cartSlice";
import { toast } from "react-toastify";
const ProductsDetail = () => {
  const { products, loading, selectedProduct } = useSelector(
    (state) => state.products
  );
  const { cartData } = useSelector((state) => state.cart);
  const { pid } = useParams();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(productDetail(pid));
  }, []);

  useEffect(() => {
    dispatch(productDetail(pid));
  }, [products, pid]);
  console.log(loading);
  if (!loading && !selectedProduct) {
    return <h1 className="not-found">Product not found!</h1>;
  }
  const handleAddcart = () => {
    dispatch(addTocart(selectedProduct));
    toast.success("Product Added to cart successfully!", {
      position: "top-center",
      autoClose: 2000,
      limit: 1,
    });
    navigateTo("/cart");
  };
  const handleRemovecart = () => {
    dispatch(removeFromCart(selectedProduct.id));
    toast.success("Product removed from the cart!", {
      position: "top-center",
      autoClose: 2000,
      limit: 1,
    });
  };
  return (
    <>
      <div className="main-container">
        <h1 className="heading">Products detail</h1>
        <div className="detail-container">
          {selectedProduct ? (
            <div className="detail-card">
              <div className="detail-img">
                <img src={selectedProduct.image} alt={selectedProduct.title} />
              </div>
              <div className="detail-content">
                <h2>{selectedProduct.title}</h2>
                <p className="category">
                  <strong>{selectedProduct.category}</strong>
                </p>
                <p>
                  <strong>Product description: </strong>
                  {selectedProduct.description}
                </p>
                <h4>
                  <strong>Price: </strong>${selectedProduct.price}
                </h4>
                <div className="stars">
                  <span>{selectedProduct.rating.rate}</span>
                  <div>
                    {Array.from({ length: 5 }, (_, idx) => {
                      if (idx < Math.floor(selectedProduct.rating.rate)) {
                        return <FaStar key={idx} color="gold" />;
                      } else if (
                        idx === Math.floor(selectedProduct.rating.rate) &&
                        selectedProduct.rating.rate % 1 >= 0.5
                      ) {
                        return <FaRegStarHalfStroke key={idx} color="gold" />;
                      } else {
                        return <FaStar key={idx} color="gray" />;
                      }
                    })}
                  </div>
                </div>

                {cartData.some((cart) => cart.id == pid) ? (
                  <button className="btn-remove" onClick={handleRemovecart}>
                    Cancel Order
                  </button>
                ) : (
                  <button className="btn-cart" onClick={handleAddcart}>
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsDetail;
