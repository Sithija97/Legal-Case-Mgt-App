import { Cases, Home, Root, SignIn, Users } from "@/pages";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  { path: "/sign-in/*", element: <SignIn /> },
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Cases /> },
      { path: "/home", element: <Home /> },
      { path: "/users", element: <Users /> },
    ],
  },
]);
