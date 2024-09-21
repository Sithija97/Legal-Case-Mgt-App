import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CourtCase, CourtCaseWithId, InitialCaseState } from "../types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

export const fetchCasesData = createAsyncThunk(
  "cases/fetchCasesData",
  async (_, { rejectWithValue }) => {
    const courtCasesCollectionRef = collection(db, "courtCases");
    try {
      const querySnapshot = await getDocs(courtCasesCollectionRef);
      const fetchedCases: CourtCaseWithId[] = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Extract the document ID here
        ...(doc.data() as CourtCase), // Spread the case data
      }));
      return fetchedCases;
    } catch (error: any) {
      console.error("Error fetching documents: ", error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState: InitialCaseState = {
  cases: [],
  selectedCase: null,
  isCasesDataLoading: false,
  isCasesDataError: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchCasesData.pending, (state) => {
        state.isCasesDataLoading = true;
        state.isCasesDataError = null;
      })
      .addCase(fetchCasesData.fulfilled, (state, { payload }) => {
        state.isCasesDataLoading = false;
        state.cases = payload;
      })
      .addCase(fetchCasesData.rejected, (state, { payload }) => {
        state.isCasesDataLoading = false;
        state.isCasesDataError = payload as string;
      });
  },
});

export const { setCases, clearCases, setSelectedCase, clearSelectedCase } =
  caseSlice.actions;
export default caseSlice.reducer;
