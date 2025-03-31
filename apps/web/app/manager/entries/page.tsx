"use client";

import useEntriesData from "@/hooks/use-entries-data";
import { DataTable } from "./ui/data-table";
import { columns } from "./ui/columns";
import { useState } from "react";
import { PaginationState } from "@tanstack/react-table";

export default function Page() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, rowCount, loading } = useEntriesData(pagination);
  console.log(data, rowCount);
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Daily Entries</h2>
          <p className="text-muted-foreground">
            View the list of entries, tracking items moving in and out on a
            daily basis.
          </p>
        </div>
      </div>
      <DataTable
        data={data}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        rowCount={rowCount}
      />
    </div>
  );
}
