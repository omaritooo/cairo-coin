import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from ".";
import { HistorySlot } from "src/services/types/history";

interface HistoryState {
  history: HistorySlot[] | null;
}
const initialState: HistoryState = {
  history: null,
};

export const historySlice = createSlice({
  name: "historySlice",
  initialState,
  reducers: {
    modifyHistories: (
      state: HistoryState,
      action: PayloadAction<HistorySlot[]>
    ) => {
      if (state.history) {
        state.history = null;
      }

      const filteredDates = action.payload.map((el: HistorySlot) => {
        const date = new Date(el.Time);
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        return (el = {
          ...el,

          Time: formattedDate,
        });
      });
      state.history = filteredDates.reverse();
    },
  },
});

export const { modifyHistories } = historySlice.actions;

export const history = (state: RootState) => state.history.history;

export default historySlice.reducer;
