import { Toaster } from "@/atoms/toaster";
import { cn } from "@/lib/utils";
import { SideNavBar } from "@/organisms/sidebar";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <section className={cn("min-h-screen w-full flex")}>
      {/* sidebar */}
      <div className=" bg-slate-50">
        <SideNavBar />
      </div>

      {/* main page */}
      <div className="w-full h-full">
        <Outlet />
        <Toaster />
      </div>
    </section>
  );
};
