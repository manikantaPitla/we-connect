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
    removeChatMessages: (state) => {
      state.messageList = { createdAt: null, messages: [] };
    },
    updateChatMessage: (state, action) => {
      const index = state.messageList.messages.findIndex(
        (msg) => msg.messageId === action.payload.messageId
      );
      if (index !== -1) {
        state.messageList.messages[index].status = action.payload.status;
      }
    },
  },
});

export const {
  setChatMessages,
  addChatMessage,
  updateChatMessage,
  removeChatMessages,
} = messageReducer.actions;
export default messageReducer.reducer;
