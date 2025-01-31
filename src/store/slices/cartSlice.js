import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartData: JSON.parse(localStorage.getItem("cart")) || [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart: (state, action) => {
      state.cartData.push({ ...action.payload, count: 1 });
      state.cartData = state.cartData.reverse();
    },
    removeFromCart: (state, action) => {
      state.cartData = state.cartData.filter((cart) => {
        return cart.id != action.payload;
      });
    },
    incrementCount: (state, action) => {
      state.cartData = state.cartData.map((cart) =>
        cart.id == action.payload ? { ...cart, count: cart.count + 1 } : cart
      );
    },
    decrementCount: (state, action) => {
      state.cartData = state.cartData.map((cart) =>
        cart.id == action.payload ? { ...cart, count: cart.count - 1 } : cart
      );
    },
  },
});

export const { addTocart, removeFromCart, incrementCount, decrementCount } =
  cartSlice.actions;
export default cartSlice.reducer;
