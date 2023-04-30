import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const url = `/products`;

const initialState = {
  allProducts: [],
  auxProducts: [],
  loading: false,
  searchResults: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
      state.auxProducts = action.payload;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    searchProducts: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.allProducts = state.allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
      );
    },
    filterProductsByBrand: (state, action) => {
      const selectedBrands = action.payload;
      if (selectedBrands.length === 0) {
        state.allProducts = state.auxProducts;
      } else {
        state.allProducts = state.allProducts.filter((product) =>
          selectedBrands.includes(product.brand.name)
        );
      }
    },
  },
});

export const {
  setAllProducts,
  setLoading,
  searchProducts,
  filterProductsByBrand,
} = productsSlice.actions;
export default productsSlice.reducer;

export const getProducts = () => async (dispatch) => {
  try {
    dispatch(setLoading()); // Inicio de carga
    const res = await axios(url);
    dispatch(setAllProducts(res.data)); // Solicitud exitosa
  } catch (error) {
    console.error(error.message);
    dispatch(setLoading()); // Error de solicitud
  }
};
