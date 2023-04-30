import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import axios from "axios";
import { store } from "./redux/store";
import Navbar from "./components/Navbar/Navbar";
import { RouterController } from "./routes/RouterController";
import { BrowserRouter } from "react-router-dom";
import App from "./app";

const baseURL = import.meta.env.DEV
  ? "http://localhost:3001"
  : import.meta.env.VITE_REACT_APP_API;
axios.defaults.baseURL = baseURL;

console.log(import.meta.env.VITE_REACT_APP_API);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
