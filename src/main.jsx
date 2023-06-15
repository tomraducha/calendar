/* BTIB */
import App from "./App.jsx";
import "./index.css";
/* Libs & plugins */
import React from "react";
import ReactDOM from "react-dom/client";

//vérifier si strictmode est utile
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
