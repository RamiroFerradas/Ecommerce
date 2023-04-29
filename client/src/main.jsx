import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/home/home";
import { Provider } from "react-redux";
import axios from "axios";
import { store } from "./redux/store";

const baseURL = import.meta.env.DEV
  ? "http://localhost:3001"
  : import.meta.env.VITE_REACT_APP_API;
axios.defaults.baseURL = baseURL;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Home />
    </Provider>
  </React.StrictMode>
);
