import React from "react";
import { fetchCasesFromFirestore, fetchUsersFromFirestore } from "@/pages";
import { useAppDispatch } from "@/store/store";

export const HomeTemplate = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    fetchCasesFromFirestore(dispatch);
    fetchUsersFromFirestore(dispatch);
  }, []);

  return <div>Home</div>;
};
