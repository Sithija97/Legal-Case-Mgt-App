import { useAppDispatch } from "@/store/store";
import { SignInTemplate } from "@/templates";
import { useEffect } from "react";
import { fetchUsersFromFirestore } from "./root";

export const SignIn = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    fetchUsersFromFirestore(dispatch);
  }, []);
  return <SignInTemplate />;
};
