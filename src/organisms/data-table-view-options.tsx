import { Table } from "@tanstack/react-table";
import { Button } from "@/atoms/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/atoms/dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { FileUp, MonitorDown, UserRoundPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { ImportFileModal } from "./import-file-modal";
import { TABLE_TYPE } from "@/enums";
import { AddUserModal } from "./add-user-modal";
import { LogoutAvatar } from "@/molecules/logout-avatar";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  type: TABLE_TYPE;
}

export function DataTableViewOptions<TData>({
  table,
  type,
}: DataTableViewOptionsProps<TData>) {
  const [open, setOpen] = useState<boolean>(false);
  const [openAddUser, setAddUserOpen] = useState<boolean>(false);

  useEffect(() => {
    const hiddenColumns = ["NextDate", "NextStep", "Remark"];

    table.getAllColumns().forEach((column) => {
      if (hiddenColumns.includes(column.id)) {
        column.toggleVisibility(false);
      }
    });
  }, []);

  const handleFileImportModal = () => setOpen(!open);
  const handleAddUserModal = () => setAddUserOpen(!openAddUser);

  return (
    <>
      <div className="flex items-center gap-2">
        {type === TABLE_TYPE.CASE ? (
          <>
            <Button
              type="button"
              size={"sm"}
              onClick={handleFileImportModal}
              className="bg-blue-800 hover:bg-blue-700 text-slate-200 hover:text-white"
            >
              <FileUp className="mr-2 h-4 w-4" /> Import File
            </Button>
            <Button
              type="button"
              size={"sm"}
              variant={"ghost"}
              // onClick={handleFileImportModal}
              className="bg-slate-100 hover:bg-slate-200 "
            >
              <MonitorDown className="mr-2 h-4 w-4" /> Export File
            </Button>
          </>
        ) : (
          <Button
            type="button"
            size={"sm"}
            onClick={handleAddUserModal}
            className="bg-blue-800 hover:bg-blue-700 text-slate-200 hover:text-white"
          >
            <UserRoundPlus className="mr-2 h-4 w-4" /> Add User
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
            >
              <MixerHorizontalIcon className="mr-2 h-4 w-4" />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== "undefined" &&
                  column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <LogoutAvatar />
      </div>
      <ImportFileModal isOpen={open} onClose={() => setOpen(!open)} />
      <AddUserModal
        isOpen={openAddUser}
        onClose={() => setAddUserOpen(!openAddUser)}
      />
    </>
  );
}
