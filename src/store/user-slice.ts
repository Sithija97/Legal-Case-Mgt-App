import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { InitialUsersState, User } from "../types";
import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

export const fetchUsersData = createAsyncThunk(
  "users/fetchUsersData",
  async (_, { dispatch, rejectWithValue }) => {
    const usersCollectionRef = collection(db, "users");
    try {
      const querySnapshot = await getDocs(usersCollectionRef);

      const fetchedUsersData: User[] = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Extract the document ID here
        ...(doc.data() as User), // Spread the user data
      }));
      return fetchedUsersData;
    } catch (error: any) {
      console.error("Error fetching documents: ", error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState: InitialUsersState = {
  users: [],
  loggedInUser: null,
  selectedUser: null,
  isUsersDataLoading: false,
  isUsersDataError: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersData.pending, (state) => {
        state.isUsersDataLoading = true;
        state.isUsersDataError = null;
      })
      .addCase(fetchUsersData.fulfilled, (state, { payload }) => {
        state.isUsersDataLoading = false;
        state.users = payload;
      })
      .addCase(fetchUsersData.rejected, (state, { payload }) => {
        state.isUsersDataLoading = false;
        state.isUsersDataError = payload as string;
      });
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
