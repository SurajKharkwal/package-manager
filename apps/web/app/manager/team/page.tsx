"use client";
import { DataTable } from "./ui/data-table";
import { useState } from "react";
import { columns } from "./ui/columns";
import { useTeamData } from "@/hooks/use-teams-data";
export default function Page() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const { loading, rowCount, data, setFilterValue } = useTeamData(pagination);
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Meet Your Team</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your colleagues and their details.
          </p>
        </div>
      </div>
      <DataTable
        pagination={pagination}
        loading={loading}
        rowCount={rowCount}
        data={data}
        setPagination={setPagination}
        setFilterValue={setFilterValue}
        columns={columns}
      />
    </div>
  );
}
