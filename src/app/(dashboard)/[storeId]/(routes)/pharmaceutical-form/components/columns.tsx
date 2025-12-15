"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type PharmaceuticalFormColumn = {
  id: string;
  name: string;
  code: string;
  route: string;
  createdAt: string;
};

export const columns: ColumnDef<PharmaceuticalFormColumn>[] = [
  {
    accessorKey: "name",
    header: "Denumire",
  },
  {
    accessorKey: "code",
    header: "Cod",
  },
  {
    accessorKey: "route",
    header: "Cale administrare",
  },
  {
    accessorKey: "createdAt",
    header: "Data",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
