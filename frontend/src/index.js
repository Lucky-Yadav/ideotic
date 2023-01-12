import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

// Create a root element in the DOM
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application inside the root element
root.render(
  <BrowserRouter>
    {/* Provider component is used to provide the store to the entire application */}
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

// Report web vitals
reportWebVitals();
