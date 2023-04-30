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
      const selectedBrands = action.payload;
      if (selectedBrands.length === 0) {
        state.allProducts = state.auxProducts;
      } else {
        state.allProducts = state.allProducts.filter((product) =>
          selectedBrands.includes(product.brand.name)
        );
      }
    },
    sortProducts: (state, action) => {
      const { alphabetically, price } = action.payload;

      if (alphabetically === "a-z") {
        state.allProducts = state.allProducts.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else if (alphabetically === "z-a") {
        state.allProducts = state.allProducts.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      } else if (price === "price-high") {
        state.allProducts = state.allProducts.sort((a, b) => b.price - a.price);
      } else if (price === "price-low") {
        state.allProducts = state.allProducts.sort((a, b) => a.price - b.price);
      } else {
        state.allProducts = state.auxProducts;
      }
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
    console.log(res.data);
    dispatch(getProducts());
  } catch (error) {
    console.error(error.message);
  }
};

export const updateProduct = (id, updatedProductData) => async (dispatch) => {
  try {
    const res = await axios.put(`${url}/${id}`, updatedProductData, {
      headers,
    });
    console.log(res.data);
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
    console.log(res.data);
    dispatch(getProducts());
  } catch (error) {
    console.error(error.message);
  }
};
