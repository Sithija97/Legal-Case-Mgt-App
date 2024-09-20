import { userColumns, DataTable } from "@/organisms";
import { TABLE_TYPE } from "@/enums";
import { RootState, useAppSelector } from "@/store/store";
import { Spinner } from "@/molecules";

export const UsersTemplate = () => {
  const { users, isUsersDataLoading } = useAppSelector(
    (state: RootState) => state.usersState
  );

  if (isUsersDataLoading)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Spinner color="text-blue-700" size="8" />
      </div>
    );

  return (
    <div className="flex-1 flex-col space-y-2 xl:p-6 2xl:p-8 md:flex">
      <DataTable data={users} columns={userColumns} type={TABLE_TYPE.USER} />
    </div>
  );
};
