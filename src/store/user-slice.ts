import { createSlice } from "@reduxjs/toolkit";
import { InitialUsersState } from "../types";

const initialState: InitialUsersState = {
  users: [],
  loggedInUser: null,
  selectedUser: null,
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
    setSelectedUser: (state, { payload }) => {
      state.selectedUser = payload;
    },
    clearUsers: (state) => {
      state.users = initialState.users;
    },
    logoutUser: (state) => {
      state.loggedInUser = initialState.loggedInUser;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = initialState.selectedUser;
    },
  },
});

export const {
  setUsers,
  setLoggedInUser,
  clearUsers,
  logoutUser,
  setSelectedUser,
  clearSelectedUser,
} = caseSlice.actions;
export default caseSlice.reducer;
