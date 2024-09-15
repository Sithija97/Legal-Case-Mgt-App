import { Cases, Home, Root, SignIn, Users } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

export const ROOT = "/";
export const SIGN_IN = "/sign-in";
export const CASES = "/cases";
export const USERS = "/users";

export const router = createBrowserRouter([
  { path: SIGN_IN, element: <SignIn /> },
  {
    path: ROOT,
    element: <Root />,
    children: [
      { path: ROOT, element: <Home /> },
      { path: CASES, element: <Cases /> },
      { path: USERS, element: <Users /> },
    ],
  },
]);
