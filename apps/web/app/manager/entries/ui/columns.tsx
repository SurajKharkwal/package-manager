"use client";
import { formatString } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";

export type EntryType = {
  eid: string;
  date: Date;
  noOfItemsIn: number;
  noOfItemsOut: number;
  qrcodeId: string;
  userId: string;
};

export const columns: ColumnDef<EntryType>[] = [
  {
    accessorKey: "eid",
    header: "Eid",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{formatString(row.original.eid, 10)}</TooltipTrigger>
          <TooltipContent>
            <p>{row.original.eid}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "userId",
    header: "UserId",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {formatString(row.original.userId, 10)}
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.original.userId}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  { accessorKey: "noOfItemsIn", header: "NoOFItemsIn" },
  { accessorKey: "noOfItemsOut", header: "noOfItemsOut" },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => row.original.date.toUTCString(),
  },
  { accessorKey: "qrcodeId", header: "Qrcode" },
];
