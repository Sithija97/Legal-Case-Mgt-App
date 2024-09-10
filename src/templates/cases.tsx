import { columns, DataTable } from "@/organisms";
import tasks from "../data/tasks.json";
// import { TablePageHeader } from "@/molecules";

export const CasesTemplate = () => {
  return (
    <div className="flex-1 flex-col space-y-2 p-6 md:flex">
      {/* <TablePageHeader title={`Here's a list of your cases.`} /> */}
      <DataTable data={tasks} columns={columns} />
    </div>
  );
};
