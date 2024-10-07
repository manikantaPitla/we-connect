import { createSlice } from "@reduxjs/toolkit";

const weConnectTheme = JSON.parse(localStorage.getItem("weChatTheme"));
const initialState = {
  theme: weConnectTheme?.theme || "LIGHT",
};

const themeReducer = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeReducer.actions;
export default themeReducer.reducer;
