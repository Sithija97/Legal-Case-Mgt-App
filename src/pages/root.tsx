import { db } from "@/config/firebase";
import { setCases } from "@/store/case-slice";
import { useAppDispatch } from "@/store/store";
import { setUsers } from "@/store/user-slice";
import { RootLayout } from "@/templates";
import { CourtCase, CourtCaseWithId, User } from "@/types";
import { collection, getDocs } from "firebase/firestore";

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

export const Root = () => {
  return <RootLayout />;
};
