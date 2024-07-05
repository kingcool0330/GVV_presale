import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import loadingReducer from "./reducers/loadingReducer";
import authReducer from "./reducers/authReducer";

const initialState = {};

const middleware = [thunk];

const rootReducer = combineReducers({
  loading: loadingReducer,
  auth: authReducer,
});

const configureStore = () => {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware)
      // window.__REDUX_DEVTOOLS_EXTENSION__ &&
      //   window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
};

export default configureStore;
