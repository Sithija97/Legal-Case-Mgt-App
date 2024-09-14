import { useAppDispatch } from "@/store/store";
import { HomeTemplate } from "@/templates";
import { useEffect } from "react";
import {
  fetchCasesFromFirestore,
  fetchDashboardData,
  fetchUsersFromFirestore,
} from "./root";

export const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchDashboardData(dispatch);
    fetchCasesFromFirestore(dispatch);
    fetchUsersFromFirestore(dispatch);
  }, []);

  return (
    <div className="h-screen p-8">
      <HomeTemplate />
    </div>
  );
};
