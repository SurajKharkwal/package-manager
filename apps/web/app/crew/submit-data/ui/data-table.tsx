import { TablePagination } from "@/components/table-pagination";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { Badge } from "@workspace/ui/components/badge";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { cn } from "@workspace/ui/lib/utils";

interface DataTableProps<TData> {
  data: TData[];
  removeItem: (code: string) => void;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500 text-white",
  processing: "bg-orange-500 text-white",
  success: "bg-green-500 text-white",
  failed: "bg-red-500 text-white",
};

export function DataTable<
  TData extends {
    code: string;
    noOfItemIn: number;
    noOfItemOut: number;
    status: "pending" | "processing" | "success" | "failed";
  },
>({ data, removeItem }: DataTableProps<TData>) {
  const columns = useMemo<ColumnDef<TData>[]>(
    () => [
      {
        accessorKey: "code",
        header: "Qrcode",
      },
      {
        accessorKey: "noOfItemIn",
        header: "No Of Item In",
      },
      {
        accessorKey: "noOfItemOut",
        header: "No Of Item Out",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <Badge
              className={cn(
                "px-2 py-1 rounded-md",
                statusColors[status] || "bg-gray-500",
              )}
            >
              {status}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const { code } = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(code)}
                >
                  Copy QR Code ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => removeItem(code)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove Item
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [removeItem],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-muted">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination table={table} />
    </div>
  );
}
