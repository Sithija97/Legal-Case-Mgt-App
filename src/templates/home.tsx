import { SummaryCard } from "@/molecules";
import { DashboardPieChart, DashboardTable } from "@/organisms";
import { RootState, useAppSelector } from "@/store/store";
import { BriefcaseBusiness, File, FilePen, UsersRound } from "lucide-react";

export const HomeTemplate = () => {
  const { totalCompanies, totalCases, totalOngoingCases, totalUsers } =
    useAppSelector((state: RootState) => state.rootState);
  return (
    <div className="xl:space-y-6 2xl:space-y-10 ">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <SummaryCard
          title="Total Companies"
          value={totalCompanies}
          comparison="Partnerships remain steady. "
          icon={BriefcaseBusiness}
        />
        <SummaryCard
          title="Total Cases"
          value={totalCases}
          comparison="Growing due to new clients."
          icon={File}
        />
        <SummaryCard
          title="Total Ongoing Cases"
          value={totalOngoingCases}
          comparison="Active cases progressing well."
          icon={FilePen}
        />
        <SummaryCard
          title="No. of Users"
          value={totalUsers}
          comparison="User activity consistent."
          icon={UsersRound}
        />
      </div>
      <div className="grid xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2  py-4">
          <DashboardTable />
        </div>

        <div className="py-4">
          <DashboardPieChart />
        </div>
      </div>
    </div>
  );
};
