import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import axios from "axios";
import { store } from "./redux/store";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import App from "./app";

const baseURL = import.meta.env.DEV
  ? "http://localhost:3001"
  : import.meta.env.VITE_REACT_APP_API;
axios.defaults.baseURL = baseURL;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={"dev-mp-bx1eb.us.auth0.com"}
      clientId={"76Ay3d5HxpOcYra2B2cMxTlFmWiMhRRO"}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      useRefreshTokens
      cacheLocation="localstorage"
    >
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
