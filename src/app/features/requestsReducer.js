import { createSlice } from "@reduxjs/toolkit";

const initialState = { requests: 0 };

const requestsReducer = createSlice({
  name: "requests",
  initialState,
  reducers: {
    addRequests: (state, payload) => {
      state.requests = payload;
    },
  },
});

export const { addRequests } = requestsReducer.actions;
export default requestsReducer.reducer;
