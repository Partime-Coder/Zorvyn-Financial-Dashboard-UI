import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  const stored = localStorage.getItem("theme");
  return stored ? JSON.parse(stored) : false;
};

const initialState = {
  theme: getInitialTheme(),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = !state.theme;
      localStorage.setItem("theme", JSON.stringify(state.theme));
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;