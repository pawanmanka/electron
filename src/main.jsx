import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
 <React.StrictMode>
    <App />
</React.StrictMode>);
// Hide loader AFTER React mounts
window.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader')
  const app = document.getElementById('root')

  if (loader && app) {
    loader.style.display = 'none'
    app.style.display = 'block'
  }
})
