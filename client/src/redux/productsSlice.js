import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { getBrands } from "./brandsSlice";

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
      if (searchTerm === "") {
        state.allProducts = state.auxProducts;
      } else {
        state.allProducts = state.allProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
      }
    },
    filterProductsByBrand: (state, action) => {
      const selectedBrand = action.payload;

      if (selectedBrand === "all") {
        state.allProducts = state.auxProducts;
      } else {
        state.allProducts = state.auxProducts.filter(
          (product) => product.brand.name === selectedBrand
        );
      }
    },
    sortProducts: (state, action) => {
      const { price, alphabetically } = action.payload;

      let currentProducts = [...state.allProducts];
      if (alphabetically === "a-z") {
        currentProducts.sort((a, b) => (a.name < b.name ? -1 : 1));
      } else if (alphabetically === "z-a") {
        currentProducts.sort((a, b) => (a.name > b.name ? -1 : 1));
      }

      if (price === "low") {
        currentProducts.sort((a, b) => (a.price < b.price ? -1 : 1));
      } else if (price === "high") {
        currentProducts.sort((a, b) => (a.price > b.price ? -1 : 1));
      }

      state.allProducts = currentProducts;
    },
  },
});

export const {
  setAllProducts,
  setLoading,
  searchProducts,
  filterProductsByBrand,
  sortProducts,
} = productsSlice.actions;
export default productsSlice.reducer;

const headers = {
  "Content-Type": "application/json",
  Authorization: "my-secret-token",
};

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

export const addProduct = (productData) => async (dispatch) => {
  try {
    const res = await axios.post(url, productData, {
      headers,
    });

    dispatch(getProducts());
    dispatch(getBrands());
  } catch (error) {
    console.error(error.message);
  }
};

export const updateProduct = (id, updatedProductData) => async (dispatch) => {
  try {
    const res = await axios.put(`${url}/${id}`, updatedProductData, {
      headers,
    });

    dispatch(getProducts());
  } catch (error) {
    console.error(error.message);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${url}/${id}`, {
      headers,
    });
    dispatch(getProducts());
  } catch (error) {
    console.error(error.message);
  }
};
