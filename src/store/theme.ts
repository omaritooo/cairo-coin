import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from ".";

interface ThemeState {
  darkMode: boolean;
  mobileSidebarToggle: boolean;
}

const initialState: ThemeState = {
  darkMode: false || localStorage.getItem("theme") === "false" ? true : false,
  mobileSidebarToggle: false,
};

export const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    toggleDarkMode: (state: ThemeState) => {
      state.darkMode = !state.darkMode;
    },
    toggleSidebar: (state: ThemeState) => {
      state.mobileSidebarToggle = !state.mobileSidebarToggle;
    },
  },
});

export const { toggleDarkMode, toggleSidebar } = themeSlice.actions;

export const darkMode = (state: RootState) => state.theme.darkMode;
export const mobileSidebartoggle = (state: RootState) =>
  state.theme.mobileSidebarToggle;
export default themeSlice.reducer;
