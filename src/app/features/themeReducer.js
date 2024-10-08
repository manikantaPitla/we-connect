import { createSlice } from "@reduxjs/toolkit";

const weConnectTheme = JSON.parse(localStorage.getItem("weConnectTheme"));
const initialState = {
  isDarkModeOn: weConnectTheme?.isDarkModeOn || false,
};

const themeReducer = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.isDarkModeOn = action.payload;
      localStorage.setItem(
        "weConnectTheme",
        JSON.stringify({ isDarkModeOn: action.payload })
      );
    },
  },
});

export const { setTheme } = themeReducer.actions;
export default themeReducer.reducer;
