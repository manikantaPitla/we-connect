import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import GlobalStyles from "./styles/Globalstyles.js";
import { Provider } from "react-redux";
import store from "./app/store.js";

createRoot(document.getElementById("root")).render(
  //   <StrictMode>
  <Provider store={store}>
    <GlobalStyles />
    <App />
  </Provider>
  //   </StrictMode>
);
