"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { ColumnDef } from "@tanstack/react-table";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { formatString } from "@/lib/utils";
import { Role } from "@workspace/db";

export type RecentEntriesType = {
  role: Role;
  name: string;
  email: string;
  userId: string;
  mobileNo: number | null;
  imagePath: string | null;
  productsSold: number;
  productsReceived: number;
};

export const columns: ColumnDef<RecentEntriesType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const { name, email, imagePath } = row.original;
      return (
        <div className="flex gap-2">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={String(imagePath)} alt={name} />
            <AvatarFallback className="rounded-lg">
              {name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{name}</span>
            <span className="truncate text-xs ">{email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "userId",
    header: "UserId",
    cell: ({ row }) => {
      const userId = row.original.userId;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{formatString(userId, 8)}</TooltipTrigger>
            <TooltipContent>
              <p>{userId}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "productsReceived",
    header: "Products Received",
  },
  {
    accessorKey: "productsSold",
    header: "Products Sold",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "mobileNo",
    header: "MobileNo",
    cell: ({ row }) =>
      row.original.mobileNo ? row.original.mobileNo.toString() : "N/A",
  },
];
