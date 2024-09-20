import { useAppDispatch } from "@/store/store";
import { HomeTemplate } from "@/templates";
import { useEffect } from "react";
import { fetchDashboardData } from "@/store/root-slice";
import { fetchCasesData } from "@/store/case-slice";
import { fetchUsersData } from "@/store/user-slice";

export const Home = () => {
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    await dispatch(fetchDashboardData());
    await dispatch(fetchCasesData());
    await dispatch(fetchUsersData());
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-screen p-8 2xl:p-10">
      <HomeTemplate />
    </div>
  );
};
