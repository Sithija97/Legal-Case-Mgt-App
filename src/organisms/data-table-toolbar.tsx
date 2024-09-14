import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/atoms/button";
import { DataTableViewOptions } from "./data-table-view-options";
import { Input } from "@/atoms/input";
import { TABLE_TYPE } from "@/enums";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  type: TABLE_TYPE;
}

export function DataTableToolbar<TData>({
  table,
  type,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {type === TABLE_TYPE.CASE ? (
          <Input
            placeholder="Search by case number..."
            value={
              (table.getColumn("CaseNumber")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("CaseNumber")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[250px] lg:w-[450px]"
          />
        ) : (
          <Input
            placeholder="Filter tasks..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}

        {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} type={type} />
    </div>
  );
}
