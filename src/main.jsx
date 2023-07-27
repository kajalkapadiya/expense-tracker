import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
// import Store from "./component/auth/xtra.jsx";
import store from "./component/Store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
