import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Role } from "@workspace/db";
import { ActionComp } from "./action";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { formatString } from "@/lib/utils";

export type Account = {
  role: Role;
  name: string;
  email: string;
  userId: string;
  createdAt: Date;
  mobileNo: number | null;
  imagePath: string | null;
};

export const columns: ColumnDef<Account>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
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
            <span className="truncate text-xs">{email}</span>
          </div>
        </div>
      );
    },
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
  {
    accessorKey: "mobileNo",
    header: "MobileNo",
    cell: ({ row }) => {
      const value = row.getValue("mobileNo");
      return value ? value : "Not Provided";
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          JoinAt
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt: Date = row.getValue("createdAt");
      const formattedDate = createdAt.toLocaleString(); // Example: "3/8/2025, 10:30:00 AM"

      return <div className="lowercase">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => <ActionComp row={row} />,
  },
];
