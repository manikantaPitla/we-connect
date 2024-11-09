import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authReducer";
import themeReducer from "./features/themeReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["auth/addUser"],
        ignoredPaths: ["auth.user.lastLogin", "auth.user.createdAt"],
      },
    }),
});

export default store;
