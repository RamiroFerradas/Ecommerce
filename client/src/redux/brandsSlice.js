import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const url = `/brands`;

const initialState = {
  allBrands: [],
  loading: false,
  selectedBrands: [],
};

export const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    setAllBrands: (state, action) => {
      state.allBrands = action.payload;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    toggleBrandSelection: (state, action) => {
      const brand = action.payload;
      const index = state.selectedBrands.indexOf(brand);

      if (index === -1) {
        state.selectedBrands.push(brand);
      } else {
        state.selectedBrands.splice(index, 1);
      }
    },
  },
});

export const { setAllBrands, setLoading, toggleBrandSelection } =
  brandsSlice.actions;
export default brandsSlice.reducer;

const headers = {
  "Content-Type": "application/json",
  Authorization: "my-secret-token",
};

export const getBrands = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios(url);

    dispatch(setAllBrands(res.data));
  } catch (error) {
    console.error(error.message);
    dispatch(setLoading());
  }
};

export const addBrand = (brandData) => async (dispatch) => {
  try {
    const res = await axios.post(url, brandData, {
      headers,
    });

    dispatch(getBrands());
  } catch (error) {
    console.error(error.message);
  }
};

export const updateBrand = (id, updatedBrandData) => async (dispatch) => {
  try {
    const res = await axios.put(`${url}/${id}`, updatedBrandData, {
      headers,
    });

    dispatch(getBrands());
  } catch (error) {
    console.error(error.message);
  }
};

export const deleteBrand = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${url}/${id}`, {
      headers,
    });

    dispatch(getBrands());
  } catch (error) {
    console.error(error.message);
  }
};
