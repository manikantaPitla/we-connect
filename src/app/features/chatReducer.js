import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentChatUser: null,
};

const chatReducer = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addCurrentChat: (state, action) => {
      state.currentChatUser = action.payload;
    },

    removeCurrentChat: (state) => {
      state.currentChatUser = null;
    },
  },
});

export const { addCurrentChat, removeCurrentChat } = chatReducer.actions;
export default chatReducer.reducer;
