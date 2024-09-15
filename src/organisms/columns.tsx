import { Checkbox } from "@/atoms/checkbox";
import { Case } from "@/data/schema";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { labels } from "@/data/data";
import { Badge } from "@/atoms/badge";
import { formatId } from "@/utils";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Case>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Case ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[60px]">{formatId("CASE", row.getValue("id"))}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Nature",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nature" />
    ),
    cell: ({ row }) => <div className="w-[50px]">{row.getValue("Nature")}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "CompanyName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("CompanyName")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "Year",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Year" />
    ),
    cell: ({ row }) => <div className="w-[40px]">{row.getValue("Year")}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "CaseNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Case No." />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.label.toLowerCase()
      );

      return (
        <div className="flex space-x-2">
          <span className="max-w-[480px] truncate font-medium">
            {row.getValue("CaseNumber")}
          </span>
          {label && <Badge variant="outline">{label.label}</Badge>}
        </div>
      );
    },
  },
  {
    accessorKey: "CourtHouse",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Court" />
    ),
    cell: ({ row }) => (
      <div className="w-[110px]">{row.getValue("CourtHouse")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "FacilityNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Facility No." />
    ),
    cell: ({ row }) => (
      <div className="w-[115px]">{row.getValue("FacilityNumber")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Value",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Value (Rs.)" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("Value")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "FirstDefendantName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Defendant Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px]">{row.getValue("FirstDefendantName")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "FiledOn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Filed On" />
    ),
    cell: ({ row }) => (
      <div className="w-[60px]">{row.getValue("FiledOn")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "SupportDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Support Date" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px]">{row.getValue("SupportDate")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "PreviousDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Previous Date" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px]">{row.getValue("PreviousDate")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "PreviousStep",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Previous Step" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px]">{row.getValue("PreviousStep")}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "NextDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Next Date" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px]">{row.getValue("NextDate")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "NextStep",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Next Step" />
    ),
    cell: ({ row }) => (
      <div className="w-[120px]">{row.getValue("NextStep")}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "Remark",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Remarks" />
    ),
    cell: ({ row }) => (
      <div className="w-[200px]">{row.getValue("Remark")}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  // {
  //   accessorKey: "status",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Status" />
  //   ),
  //   cell: ({ row }) => {
  //     const status = statuses.find(
  //       (status) => status.value === row.getValue("status")
  //     );

  //     if (!status) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex w-[100px] items-center">
  //         {status.icon && (
  //           <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{status.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  // {
  //   accessorKey: "priority",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Priority" />
  //   ),
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       (priority) => priority.value === row.getValue("priority")
  //     );

  //     if (!priority) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex items-center">
  //         {priority.icon && (
  //           <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{priority.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} key={row.id} />,
  },
];
