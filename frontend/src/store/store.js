import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { reducer as authReducer } from "./auth/reducer";

// Combine all the individual reducers into one root reducer
const rootReducer = combineReducers({
  auth: authReducer,
});

// Create the Redux store using the root reducer and apply the Redux thunk middleware for async actions
export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    // This allows to use the Redux dev tools in browser
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
