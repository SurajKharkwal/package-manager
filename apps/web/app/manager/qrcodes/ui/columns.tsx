import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { Button } from "@workspace/ui/components/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { formatString } from "@/lib/utils";
import ActionComp from "./action";

export type Qrcode = {
  name: string;
  code: string;
  description: string;
  costPrice: number;
  sellingPrice: number;
  createdAt: Date;
};

export const columns: ColumnDef<Qrcode>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "sellingPrice",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Selling Price
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "costPrice",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Cost Price
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const createdAt: Date = row.getValue("createdAt");
      return <div className="lowercase">{createdAt.toLocaleString()}</div>;
    },
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created At
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const desc = row.original.description;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{formatString(desc, 10)}</TooltipTrigger>
            <TooltipContent>
              <p>{desc}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,

    cell: ({ row }) => <ActionComp row={row} />,
  },
];
