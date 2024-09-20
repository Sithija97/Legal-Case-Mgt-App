import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs, query, where, collection } from "firebase/firestore";
import { createSlice } from "@reduxjs/toolkit";
import { InitialRootState } from "../types";
import { format } from "date-fns";
import { db } from "@/config/firebase";

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // Fetch total cases
      const courtCasesSnapshot = await getDocs(collection(db, "courtCases"));
      const totalCases = courtCasesSnapshot.size; // Total number of cases

      // Extract unique company names
      const companiesSet = new Set<string>();
      courtCasesSnapshot.forEach((doc) => {
        const caseData = doc.data();
        companiesSet.add(caseData.CompanyName);
      });
      const totalCompanies = companiesSet.size; // Total number of companies

      // Cases Count By Label
      const casesCountByLabel: { [label: string]: number } = {};
      courtCasesSnapshot.forEach((doc) => {
        const caseData = doc.data();
        let label = caseData.label || "Unlabeled"; // Use "Unlabeled" if label is missing
        label = label.replace(/\s+/g, "_"); // Replace spaces with underscores
        casesCountByLabel[label] = (casesCountByLabel[label] || 0) + 1;
      });

      // Fetch ongoing cases (assuming 'NextStep' exists for ongoing cases)
      const ongoingCasesQuery = query(
        collection(db, "courtCases"),
        where("label", "==", "Ongoing")
      );
      const ongoingCasesSnapshot = await getDocs(ongoingCasesQuery);
      const totalOngoingCases = ongoingCasesSnapshot.size; // Total ongoing cases

      // Fetch ongoing cases where 'NextStep' is greater than today
      const today = format(new Date(), "dd.MM.yyyy"); // Format today's date
      const ongoingCasesDataQuery = query(
        collection(db, "courtCases"),
        where("label", "==", "Ongoing"),
        where("NextDate", ">", today) // Assuming 'NextStep' is a string in 'dd.MM.yyyy' format
      );
      const ongoingCasesDataSnapshot = await getDocs(ongoingCasesDataQuery);
      const totalOngoingCasesData = ongoingCasesDataSnapshot.docs.map((doc) =>
        doc.data()
      );

      // Fetch total users
      const usersSnapshot = await getDocs(collection(db, "users"));
      const totalUsers = usersSnapshot.size; // Total number of users

      // Return the data for UI if needed
      return {
        totalCompanies,
        totalCases,
        totalOngoingCases,
        totalUsers,
        totalOngoingCasesData,
        casesCountByLabel,
      };
    } catch (error: any) {
      console.error("Error fetching dashboard data: ", error);
      return rejectWithValue(error.message);
    }
  }
);

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
  isDashboardDataLoading: false,
  isDashboardDataError: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.isDashboardDataLoading = true;
        state.isDashboardDataError = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, { payload }) => {
        state.isDashboardDataLoading = false;
        state.totalCompanies = payload.totalCompanies;
        state.totalCases = payload.totalCases;
        state.totalOngoingCases = payload.totalOngoingCases;
        state.totalUsers = payload.totalUsers;
        state.totalOngoingCasesData = payload.totalOngoingCasesData;
        state.casesCountByLabel = payload.casesCountByLabel;
      })
      .addCase(fetchDashboardData.rejected, (state, { payload }) => {
        state.isDashboardDataLoading = false;
        state.isDashboardDataError = payload as string;
      });
  },
});

export const { setStats } = rootSlice.actions;
export default rootSlice.reducer;
