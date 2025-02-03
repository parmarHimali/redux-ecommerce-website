import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: null,
  selectedProduct: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      return data;
    } catch (error) {
      return error;
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productDetail: (state, action) => {
      state.selectedProduct = state.products.find(
        (product) => product.id == action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { productDetail } = productSlice.actions;
export default productSlice.reducer;
