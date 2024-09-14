import { ChevronRight, House, NotebookPen, UsersRound } from "lucide-react";
import { useState } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import { NavBar } from "../molecules";
import { Button } from "../atoms/button";
import { useNavigate } from "react-router-dom";

export const SideNavBar = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  const navigateToHome = () => navigate("/");
  const navigateToCases = () => navigate("/cases");
  const navigateToUsers = () => navigate("/users");

  return (
    <div className={`relative px-3 pb-10 pt-24 ${!isCollapsed && "min-w-64"}`}>
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className=" rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <NavBar
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Home",
            href: "#",
            icon: House,
            variant: "default",
            onclick: navigateToHome,
          },
          {
            title: "Cases",
            href: "#",
            icon: NotebookPen,
            variant: "ghost",
            onclick: navigateToCases,
          },
          {
            title: "Users",
            href: "#",
            icon: UsersRound,
            variant: "ghost",
            onclick: navigateToUsers,
          },
        ]}
      />
    </div>
  );
};
