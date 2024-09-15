import { createSlice } from "@reduxjs/toolkit";
import { InitialCaseState } from "../types";

const initialState: InitialCaseState = {
  cases: [],
  selectedCase: null,
};

const caseSlice = createSlice({
  name: "caseState",
  initialState,
  reducers: {
    setCases: (state, { payload }) => {
      state.cases = payload;
    },
    setSelectedCase: (state, { payload }) => {
      state.selectedCase = payload;
    },
    clearCases: (state) => {
      state.cases = initialState.cases;
    },
    clearSelectedCase: (state) => {
      state.selectedCase = initialState.selectedCase;
    },
  },
});

export const { setCases, clearCases, setSelectedCase, clearSelectedCase } =
  caseSlice.actions;
export default caseSlice.reducer;
