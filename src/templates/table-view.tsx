import { defaultColumns, DataTable } from "@/organisms";
import tasks from "../data/tasks.json";
import { TABLE_TYPE } from "@/enums";
// import { TablePageHeader } from "@/molecules";

export const TableViewTemplate = () => {
  return (
    <div className="flex-1 flex-col space-y-2 xl:p-6 2xl:p-8 md:flex">
      {/* <TablePageHeader title={`Here's a list of your cases.`} /> */}
      <DataTable data={tasks} columns={defaultColumns} type={TABLE_TYPE.USER} />
    </div>
  );
};
