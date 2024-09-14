import { createSlice } from "@reduxjs/toolkit";
import { InitialRootState } from "../types";

const initialState: InitialRootState = {
  totalCompanies: 0,
  totalCases: 0,
  totalOngoingCases: 0,
  totalUsers: 0,
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
    },
  },
});

export const { setStats } = rootSlice.actions;
export default rootSlice.reducer;
