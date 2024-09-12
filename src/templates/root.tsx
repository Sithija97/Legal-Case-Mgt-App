import { Toaster } from "@/atoms/toaster";
import { cn } from "@/lib/utils";
import { SideNavBar } from "@/organisms";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <section className={cn("min-h-screen w-full flex")}>
      {/* sidebar */}
      <div className=" bg-blue-800">
        <SideNavBar />
      </div>

      {/* main page */}
      <div className="w-full h-full overflow-x-auto">
        <Outlet />
        <Toaster />
      </div>
    </section>
  );
};
