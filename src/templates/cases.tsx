import { TABLE_TYPE } from "@/enums";
import { Spinner } from "@/molecules";
import { columns, DataTable } from "@/organisms";
import { RootState, useAppSelector } from "@/store/store";

export const CasesTemplate = () => {
  const { cases, isCasesDataLoading } = useAppSelector(
    (state: RootState) => state.caseState
  );

  if (isCasesDataLoading)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Spinner color="text-blue-700" size="8" />
      </div>
    );

  return (
    <>
      <div className="flex-1 flex-col space-y-2 xl:p-6 2xl:p-8 md:flex">
        <DataTable data={cases} columns={columns} type={TABLE_TYPE.CASE} />
      </div>
    </>
  );
};
