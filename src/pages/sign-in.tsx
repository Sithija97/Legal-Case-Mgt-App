import { useAppDispatch } from "@/store/store";
import { SignInTemplate } from "@/templates";
import { useEffect } from "react";
import { fetchUsersData } from "@/store/user-slice";

export const SignIn = () => {
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    await dispatch(fetchUsersData());
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <SignInTemplate />;
};
