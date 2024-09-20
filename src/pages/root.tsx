import { RootState, useAppSelector } from "@/store/store";
import { RootLayout } from "@/templates";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
