import { Button } from "@/atoms/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/atoms/dropdown-menu";
import { CASES, USERS } from "@/router";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { AddCaseModal } from "./add-case-modal";
import { AddUserModal } from "./add-user-modal";
import { useLocation } from "react-router-dom";
import { MODAL_TYPE } from "@/enums";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const location = useLocation();
  const lastRoute = location.pathname.split("/").filter(Boolean).pop();

  const [openCase, setOpenCase] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [caseData, setCaseData] = useState<any>({});
  const [userData, setUserData] = useState<any>({});

  const handleEditRow = () => {
    switch (`/${lastRoute}`) {
      case CASES:
        setOpenCase(!openCase);
        setCaseData(row.original);
        break;

      case USERS:
        setOpenUser(!openUser);
        setUserData(row.original);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={handleEditRow}>Edit</DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem disabled>
            Delete
            <DropdownMenuShortcut>⌘</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AddCaseModal
        isOpen={openCase}
        type={MODAL_TYPE.EDIT}
        onClose={() => setOpenCase(!openCase)}
        data={caseData}
      />
      <AddUserModal
        isOpen={openUser}
        type={MODAL_TYPE.EDIT}
        onClose={() => setOpenUser(!openUser)}
        data={userData}
      />
    </>
  );
}
