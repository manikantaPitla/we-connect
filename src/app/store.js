import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authReducer";
import themeReducer from "./features/themeReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
  },
});

export default store;
