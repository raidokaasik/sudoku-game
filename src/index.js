import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import GlobalTheme from "./theme/globalTheme";

ReactDOM.render(
  <React.StrictMode>
    <GlobalTheme />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
