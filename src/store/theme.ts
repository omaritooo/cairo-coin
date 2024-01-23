import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from ".";

interface ThemeState {
  darkMode: boolean;
}

const initialState: ThemeState = {
  darkMode: false || localStorage.getItem("theme") === "false" ? true : false,
};

export const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    toggleDarkMode: (state: ThemeState) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;

export const darkMode = (state: RootState) => state.theme.darkMode;
export default themeSlice.reducer;
