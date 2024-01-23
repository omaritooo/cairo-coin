import { configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "./theme";
import { calculatorSlice } from "./calculator";
import { historySlice } from "./history";

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    calculator: calculatorSlice.reducer,
    history: historySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
