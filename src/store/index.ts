import { configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "./theme";
import { calculatorSlice } from "./calculator";
import { historySlice } from "./history";
import storage from "redux-persist/lib/storage";
import { homeSlice } from "./home";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const homeReducer = persistReducer(persistConfig, homeSlice.reducer);
const calculatorReducer = persistReducer(
  persistConfig,
  calculatorSlice.reducer
);

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    calculator: calculatorReducer,
    history: historySlice.reducer,
    home: homeReducer,
  },
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
