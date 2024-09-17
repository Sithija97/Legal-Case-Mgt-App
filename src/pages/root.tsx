import { db } from "@/config/firebase";
import { setCases } from "@/store/case-slice";
import { setStats } from "@/store/root-slice";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { setUsers } from "@/store/user-slice";
import { RootLayout } from "@/templates";
import { CourtCase, CourtCaseWithId, User } from "@/types";
import { format } from "date-fns";
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

    // Cases Count By Label
    const casesCountByLabel: { [label: string]: number } = {}; // Initialize object for counting cases by label
    courtCasesSnapshot.forEach((doc) => {
      const caseData = doc.data();

      // Add company name to the set
      companiesSet.add(caseData.CompanyName);

      // Count cases based on their labels
      let label = caseData.label || "Unlabeled"; // Use "Unlabeled" if label is missing
      label = label.replace(/\s+/g, "_"); // Replace any space with an underscore
      casesCountByLabel[label] = (casesCountByLabel[label] || 0) + 1;
    });

    // Fetch ongoing cases (assuming 'NextStep' exists for ongoing cases)
    const ongoingCasesQuery = query(
      collection(db, "courtCases"),
      where("label", "==", "Ongoing") // Adjust the criteria if needed
    );
    const ongoingCasesSnapshot = await getDocs(ongoingCasesQuery);
    const totalOngoingCases = ongoingCasesSnapshot.size; // Total ongoing cases

    // Fetch ongoing cases where 'NextStep' is greater than today and label is 'Ongoing'
    const today = format(new Date(), "dd.MM.yyyy"); // Format today's date as 'dd.MM.yyyy'
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

    dispatch(
      setStats({
        totalCompanies,
        totalCases,
        totalOngoingCases,
        totalUsers,
        totalOngoingCasesData,
        casesCountByLabel,
      })
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
