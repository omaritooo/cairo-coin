import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from ".";
import { HistorySlot } from "src/services/types/history";

interface HistoryState {
  history: HistorySlot[] | null;
}
const initialState: HistoryState = {
  history: null,
};
/*
function formatDate(d: string) {
  const date = new Date(d);
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return (d = dd + "/" + mm + "/" + yyyy.toString().slice(-2));
}
*/
export const historySlice = createSlice({
  name: "historySlice",
  initialState,
  reducers: {
    modifyHistories: (
      state: HistoryState,
      action: PayloadAction<{
        history: HistorySlot[];
        date: boolean;
      }>
    ) => {
      if (state.history) {
        state.history = null;
      }
      const { history, date } = action.payload;

      const filteredDates = history.map((el: HistorySlot) => {
        if (!date) {
          const date = new Date(el.Time);
          const formattedDate = `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`;
          ``;
          return (el = {
            ...el,

            Time: formattedDate,
          });
        } else {
          console.log(el.Time);
          return {
            Value: el.Value,
            Time: el.Time,
          };
        }
      });
      state.history = filteredDates.reverse();
    },
  },
});

export const { modifyHistories } = historySlice.actions;

export const history = (state: RootState) => state.history.history;

export default historySlice.reducer;
