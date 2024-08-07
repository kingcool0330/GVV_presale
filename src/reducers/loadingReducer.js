import {
  GET_AUTHLOADING_DATA,
  GET_LANGLOADING_DATA,
  GET_LOADING_DATA,
} from "../actions/constants";

const initialState = {
  loading: false,
  langLoading: false,
  authLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LANGLOADING_DATA:
      return {
        ...state,
        langLoading: action.payload,
      };
    case GET_LOADING_DATA:
      return {
        ...state,
        loading: action.payload,
      };
    case GET_AUTHLOADING_DATA:
      return {
        ...state,
        authLoading: action.payload,
      };
    default:
      return state;
  }
}
