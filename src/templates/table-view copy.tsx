import { columns, DataTable } from "@/organisms";
import tasks from "../data/tasks.json";
import { RootState, useAppSelector } from "@/store/store";
// import { TablePageHeader } from "@/molecules";

export const TableViewTemplateCopy = () => {
  const { cases } = useAppSelector((state: RootState) => state.caseState);
  return (
    <div className="flex-1 flex-col space-y-2 xl:p-6 2xl:p-8 md:flex">
      {/* <TablePageHeader title={`Here's a list of your cases.`} /> */}
      <DataTable data={cases} columns={columns} />
    </div>
  );
};
