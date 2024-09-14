import { createSlice } from "@reduxjs/toolkit";
import { InitialUsersState } from "../types";

const initialState: InitialUsersState = {
  users: [],
  loggedInUser: null,
};

const caseSlice = createSlice({
  name: "caseState",
  initialState,
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    setLoggedInUser: (state, { payload }) => {
      state.loggedInUser = payload;
    },
    clearUsers: (state) => {
      state.users = initialState.users;
    },
    logoutUser: (state) => {
      state.loggedInUser = initialState.loggedInUser;
    },
  },
});

export const { setUsers, setLoggedInUser, clearUsers, logoutUser } =
  caseSlice.actions;
export default caseSlice.reducer;
