import { createSlice } from "@reduxjs/toolkit";
import { InitialUsersState } from "../types";

const initialState: InitialUsersState = {
  users: [],
};

const caseSlice = createSlice({
  name: "caseState",
  initialState,
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    clearUsers: (state) => {
      state.users = initialState.users;
    },
  },
});

export const { setUsers, clearUsers } = caseSlice.actions;
export default caseSlice.reducer;
