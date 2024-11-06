import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkModeOn:
    JSON.parse(localStorage.getItem("weConnect"))?.isDarkModeOn || false,
};

const themeReducer = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.isDarkModeOn = action.payload;
      localStorage.setItem(
        "weConnect",
        JSON.stringify({ isDarkModeOn: action.payload })
      );
    },
  },
});

export const { setTheme } = themeReducer.actions;
export default themeReducer.reducer;
