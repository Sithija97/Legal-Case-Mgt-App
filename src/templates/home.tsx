import React from "react";
import { CourtCase, CourtCaseWithId } from "@/types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { setCases } from "@/store/case-slice";
import { useAppDispatch } from "@/store/store";

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

export const HomeTemplate = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    fetchCasesFromFirestore(dispatch);
  }, []);

  return <div>Home</div>;
};
