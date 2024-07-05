import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { jwtDecode } from "jwt-decode";
import App from "./App";
import configureStore from "./configureStore";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import "./i18n";

// style section
import "./variable.css";
import "./index.css";

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));

// Check for token
if (localStorage.jwtToken) {
  // Decode token and get user info and exp
  const decoded = jwtDecode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
  }
}

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
