import { getTeamData } from "@/actions/team";
import { Account } from "@/app/manager/team/ui/columns";
import { PaginationState } from "@tanstack/react-table";
import { useEffect, useState } from "react";

export function useTeamData(pagination: PaginationState) {
  const [filterValue, setFilterValue] = useState("");
  const [data, setData] = useState<Account[]>([]);
  const [rowCount, setRowCount] = useState(0);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(async () => {
      setLoading(true);
      const { rowCount, data } = await getTeamData(filterValue, pagination);
      setData((p) => p.concat(data));
      setRowCount(rowCount);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, [pagination.pageSize, pagination.pageIndex, filterValue]);
  return { loading, data, rowCount, setFilterValue };
}
