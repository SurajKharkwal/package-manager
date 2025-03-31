"use client";
import { getQrcodeData } from "@/actions/qrcodes";
import { Qrcode } from "@/app/manager/qrcodes/ui/columns";
import { PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";

export default function useQrcodesData(
  pagination: PaginationState,
  filterValue: string,
) {
  const [data, setData] = useState<Qrcode[]>([]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      const { data, rowCount } = await getQrcodeData(filterValue, pagination);
      setData((p) => [...p, ...data]);
      setRowCount(rowCount);
      setLoading(false);
    }
    getData();
  }, [pagination.pageIndex, pagination.pageSize, filterValue]);
  return { pagination, rowCount, data, loading };
}
