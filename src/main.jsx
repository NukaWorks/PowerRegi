import React from "react";
import ReactDOM from "react-dom/client";
import "@powerws/uikit/styling"; // Import UiKit styling
import "./Common/Styles/app.scss";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
       <App/>
    </React.StrictMode>
);
