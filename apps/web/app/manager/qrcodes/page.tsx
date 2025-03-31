"use client";

import { DataTable } from "./ui/data-table";
import { columns } from "./ui/columns";
import useQrcodesData from "@/hooks/use-qrcodes-data";
import { useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@workspace/ui/components/button";

export default function Page() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filterValue, setFilterValue] = useState("");
  const { data, rowCount, loading } = useQrcodesData(pagination, filterValue);
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            QR Code Management
          </h2>
          <p className="text-muted-foreground">
            View and manage the QR codes stored in the database.
          </p>
        </div>
        <Link href="/manager/upsert-qrcode" className={buttonVariants()}>
          <Plus /> Add QR Code
        </Link>
      </div>
      <DataTable
        pagination={pagination}
        loading={loading}
        data={data}
        setFilterValue={setFilterValue}
        setPagination={setPagination}
        rowCount={rowCount}
        columns={columns}
      />
    </div>
  );
}
