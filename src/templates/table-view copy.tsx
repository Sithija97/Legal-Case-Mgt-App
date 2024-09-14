import { TABLE_TYPE } from "@/enums";
import { columns, DataTable } from "@/organisms";
import { RootState, useAppSelector } from "@/store/store";

export const TableViewTemplateCopy = () => {
  const { cases } = useAppSelector((state: RootState) => state.caseState);
  return (
    <>
      <div className="flex-1 flex-col space-y-2 xl:p-6 2xl:p-8 md:flex">
        <DataTable data={cases} columns={columns} type={TABLE_TYPE.CASE} />
      </div>
    </>
  );
};
