import { getEntriesData } from "@/actions/entries";
import { EntryType } from "@/app/manager/entries/ui/columns";
import { PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";

export default function useEntriesData(pagination: PaginationState) {
  const [data, setData] = useState<EntryType[]>([]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const { data, rowCount } = await getEntriesData(pagination);
      setData((p) => p.concat(data));
      setRowCount(rowCount);
      setLoading(false);
    }
    getData();
  }, [pagination.pageSize, pagination.pageIndex]);

  return { pagination, rowCount, data, loading };
}
