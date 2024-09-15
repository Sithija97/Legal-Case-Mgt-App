import { db } from "@/config/firebase";
import { setCases } from "@/store/case-slice";
import { setStats } from "@/store/root-slice";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { setUsers } from "@/store/user-slice";
import { RootLayout } from "@/templates";
import { CourtCase, CourtCaseWithId, User } from "@/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Exportable function to fetch court cases from Firestore
export const fetchCasesFromFirestore = async (
  dispatch: ReturnType<typeof useAppDispatch>
) => {
  const courtCasesCollectionRef = collection(db, "courtCases");
  try {
    const querySnapshot = await getDocs(courtCasesCollectionRef);

    const fetchedCasesData: CourtCaseWithId[] = querySnapshot.docs.map(
      (doc) => ({
        id: doc.id, // Extract the document ID here
        ...(doc.data() as CourtCase), // Spread the case data
      })
    );

    dispatch(setCases(fetchedCasesData)); // Update redux state with the fetched cases including IDs
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
};

export const fetchUsersFromFirestore = async (
  dispatch: ReturnType<typeof useAppDispatch>
) => {
  const usersCollectionRef = collection(db, "users");
  try {
    const querySnapshot = await getDocs(usersCollectionRef);

    const fetchedUsersData: User[] = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Extract the document ID here
      ...(doc.data() as User), // Spread the user data
    }));

    dispatch(setUsers(fetchedUsersData)); // Update redux state with the fetched users including IDs
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
};

// Function to fetch the data for the dashboard
export const fetchDashboardData = async (
  dispatch: ReturnType<typeof useAppDispatch>
) => {
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

    // Fetch ongoing cases (assuming 'NextStep' exists for ongoing cases)
    const ongoingCasesQuery = query(
      collection(db, "courtCases"),
      where("label", "==", "Ongoing") // Adjust the criteria if needed
    );
    const ongoingCasesSnapshot = await getDocs(ongoingCasesQuery);
    const totalOngoingCases = ongoingCasesSnapshot.size; // Total ongoing cases

    // Fetch total users
    const usersSnapshot = await getDocs(collection(db, "users"));
    const totalUsers = usersSnapshot.size; // Total number of users

    dispatch(
      setStats({ totalCompanies, totalCases, totalOngoingCases, totalUsers })
    );

    // Return the data if you want to use it in the UI
    return { totalCompanies, totalCases, totalOngoingCases, totalUsers };
  } catch (error) {
    console.error("Error fetching dashboard data: ", error);
    throw error;
  }
};

export const Root = () => {
  const navigate = useNavigate();
  const { loggedInUser } = useAppSelector(
    (state: RootState) => state.usersState
  );

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/sign-in");
    }
  }, []);

  return <RootLayout />;
};
