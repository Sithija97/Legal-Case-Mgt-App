import { createSlice } from "@reduxjs/toolkit";
import { InitialCaseState } from "../types";

const initialState: InitialCaseState = {
  cases: [],
};

const caseSlice = createSlice({
  name: "baseState",
  initialState,
  reducers: {
    setCases: (state, { payload }) => {
      state.cases = payload;
    },
    clearCases: (state) => {
      state.cases = initialState.cases;
    },
  },
});

export const { setCases, clearCases } = caseSlice.actions;
export default caseSlice.reducer;
