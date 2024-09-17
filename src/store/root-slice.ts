import { createSlice } from "@reduxjs/toolkit";
import { InitialRootState } from "../types";

const initialState: InitialRootState = {
  totalCompanies: 0,
  totalCases: 0,
  totalOngoingCases: 0,
  totalUsers: 0,
  totalOngoingCasesData: [],
  casesCountByLabel: {
    CHC: 0,
    DNMA: 0,
    MC_Matters: 0,
    Ongoing: 0,
    Outstation: 0,
    Settled: 0,
    Withdrawn: 0,
  },
};

const rootSlice = createSlice({
  name: "rootState",
  initialState,
  reducers: {
    setStats: (state, { payload }) => {
      state.totalCompanies = payload.totalCompanies;
      state.totalCases = payload.totalCases;
      state.totalOngoingCases = payload.totalOngoingCases;
      state.totalUsers = payload.totalUsers;
      state.totalOngoingCasesData = payload.totalOngoingCasesData;
      state.casesCountByLabel = payload.casesCountByLabel;
    },
  },
});

export const { setStats } = rootSlice.actions;
export default rootSlice.reducer;
