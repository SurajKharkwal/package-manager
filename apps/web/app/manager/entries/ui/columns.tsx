"use client";
import { ColumnDef } from "@tanstack/react-table";

export type EntryType = {
  eid: string;
  date: Date;
  noOfItemsIn: number;
  noOfItemsOut: number;
  qrcodeId: string;
  userId: string;
};

export const columns: ColumnDef<EntryType>[] = [
  { accessorKey: "eid", header: "Eid" },
  { accessorKey: "userId", header: "UserId" },
  { accessorKey: "noOfItemsIn", header: "NoOFItemsIn" },
  { accessorKey: "noOfItemsOut", header: "noOfItemsOut" },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => row.original.date.toUTCString(),
  },
  { accessorKey: "qrcodeId", header: "Qrcode" },
];
