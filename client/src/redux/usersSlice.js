import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: [],
  auxUsers: [],
  userDb: {},
  loading: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
      state.auxUsers = action.payload;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setUser: (state, action) => {
      state.userDb = action.payload;
    },
    searchUsers: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      if (searchTerm === "") {
        state.allUsers = state.auxUsers;
      } else {
        state.allUsers = state.allUsers.filter((user) =>
          user.name.toLowerCase().includes(searchTerm)
        );
      }
    },
    sortUsers: (state, action) => {
      const sortOrder = action.payload;
      const users = state.auxUsers;
      users.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (sortOrder === "a-z") {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      });
      state.allUsers = users;
    },

    filterUsersByRole: (state, action) => {
      const selectedRole = action.payload.toLowerCase();

      if (selectedRole === "all") {
        state.allUsers = state.auxUsers;
      } else {
        state.allUsers = state.auxUsers.filter(
          (user) => user.role === selectedRole
        );
      }
    },
  },
});

export const {
  setAllUsers,
  setLoading,
  setUser,
  searchUsers,
  sortUsers,
  filterUsersByRole,
} = usersSlice.actions;
export default usersSlice.reducer;

const url = `/users`;
const headers = {
  "Content-Type": "application/json",
  Authorization: "my-secret-token",
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(setLoading()); // Inicio de carga
    const res = await axios(url);
    dispatch(setAllUsers(res.data)); // Solicitud exitosa
  } catch (error) {
    console.error(error.message);
    dispatch(setLoading()); // Error de solicitud
  }
};

export const addUser = (userData) => async (dispatch) => {
  try {
    await axios
      .post(url, userData, {
        headers,
      })
      .then((r) => dispatch(setUser(r.data)));

    dispatch(getAllUsers());
  } catch (error) {
    console.error(error.message);
  }
};

export const updateUser = (updatedUserData) => async (dispatch) => {
  try {
    const res = await axios.put(
      `${url}/${updatedUserData.id}`,
      updatedUserData,
      {
        headers,
      }
    );

    dispatch(getAllUsers());
  } catch (error) {
    console.error(error.message);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${url}/${id}`, {
      headers,
    });
    dispatch(getAllUsers());
  } catch (error) {
    console.error(error.message);
  }
};
