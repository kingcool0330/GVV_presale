import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { apiUrl } from "../config/config";
import { SET_USERS, GET_AUTHLOADING_DATA } from "./constants";

// Sign - Get User Token
export const signUser = (userData) => (dispatch) => {
  dispatch(setAuthLoading(true));
  const headers = { "ngrok-skip-browser-warning": "69420" };
  axios
    .post(apiUrl + "/api/user/sign", userData, {
      headers: headers,
    })
    .then((res) => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Decode token to get user data
      const decoded = jwtDecode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));

      dispatch(setAuthLoading(false));
    })
    .catch((err) => {
      dispatch(setAuthLoading(false));
    });
};

// Set singned in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_USERS,
    payload: decoded,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// Set Auth loading variable
export const setAuthLoading = (flag) => {
  return {
    type: GET_AUTHLOADING_DATA,
    payload: flag,
  };
};
