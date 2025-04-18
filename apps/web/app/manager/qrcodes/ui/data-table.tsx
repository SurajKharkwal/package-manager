import { TablePagination } from "@/components/table-pagination";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Input } from "@workspace/ui/components/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { useIsMobile } from "@workspace/ui/hooks/use-mobile";
import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowCount: number;
  loading: boolean;
  setFilterValue: Dispatch<SetStateAction<string>>;
  pagination: PaginationState;
  setPagination: Dispatch<
    SetStateAction<{
      pageIndex: number;
      pageSize: number;
    }>
  >;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  rowCount,
  setPagination,
  loading,
  pagination,
  setFilterValue,
}: DataTableProps<TData, TValue>) {
  const isMobile = useIsMobile();
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  useEffect(() => {
    setColumnVisibility({
      code: !isMobile,
      name: true,
      sellingPrice: !isMobile,
      costPrice: !isMobile,
      createdAt: !isMobile,
      description: !isMobile,
      action: true,
    });
  }, [isMobile]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    rowCount,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    autoResetPageIndex: false,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination: true,
    state: {
      sorting,
      columnVisibility,
      pagination,
    },
  });

  return (
    <div className="w-full flex  flex-col">
      <div className="flex w-full mx-auto items-center py-4">
        <Input
          onChange={(e) => setFilterValue(e.target.value)}
          placeholder="Filter qrcode..."
          className="max-w-sm md:ml-4"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:mr-4">
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    disabled={!column.getCanHide()}
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
      </div>

      <div className="rounded-md border w-full max-md:m-2 mx-auto">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-96 text-center"
                >
                  <div className="flex gap-2 items-center justify-center">
                    <aside className="w-6 aspect-square border-t-2 animate-spin rounded-full border" />
                    Processing…
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-96 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination table={table} />
      </div>
    </div>
  );
}
