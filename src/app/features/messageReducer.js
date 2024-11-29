import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  messageList: { createdAt: null, messages: [] },
};

const messageReducer = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setChatMessages: (state, action) => {
      state.messageList = action.payload;
    },

    addChatMessage: (state, action) => {
      state.messageList.messages.push(action.payload);
    },
    updateChatMessage: (state, action) => {
      const index = state.messageList.findIndex(
        (msg) => msg.id === action.payload.id
      );
      if (index !== -1) {
        state.messageList[index] = action.payload;
      }
    },
  },
});

export const { setChatMessages, addChatMessage, updateChatMessage } =
  messageReducer.actions;
export default messageReducer.reducer;
