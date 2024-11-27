import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authReducer";
import themeReducer from "./features/themeReducer";
import chatReducer from "./features/chatReducer";
import messageReducer from "./features/messageReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    chat: chatReducer,
    messages: messageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["auth/addUser", "chat/addCurrentChat"],
        ignoredPaths: [
          "auth.user.lastSeen",
          "auth.user.createdAt",
          "chat.currentChatUser.createdAt",
          "chat.currentChatUser.lastMessageTimeStamp",
        ],
      },
    }),
});

export default store;
