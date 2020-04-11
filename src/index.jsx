import React from "react";
import ReactDOM from "react-dom";
import App from "./app.jsx";
import "styles/main.scss";
import AppContext from "./app-context.jsx";

ReactDOM.render(
  <AppContext>
    <App />
  </AppContext>,
  document.getElementById("root")
);
