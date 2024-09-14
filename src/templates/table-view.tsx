import { userColumns, DataTable } from "@/organisms";
import { TABLE_TYPE } from "@/enums";
import { RootState, useAppSelector } from "@/store/store";

export const TableViewTemplate = () => {
  const { users } = useAppSelector((state: RootState) => state.usersState);
  return (
    <div className="flex-1 flex-col space-y-2 xl:p-6 2xl:p-8 md:flex">
      <DataTable data={users} columns={userColumns} type={TABLE_TYPE.USER} />
    </div>
  );
};
