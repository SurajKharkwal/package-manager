import { Suspense } from "react";
import Profit from "./ui/profit-card";
import Entries from "./ui/entries-card";
import Colleagues from "./ui/team-card";
import { Skeleton } from "@workspace/ui/components/skeleton";
import RecentEntries from "./ui/recet-entries";
import { DataTableSkeleton } from "./ui/table-loading";
import { columns } from "./ui/column";

export default function Page() {
  return (
    <div className="flex flex-1 container mx-auto w-full m-8 flex-col gap-4 p-4 pt-0">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
        <Suspense fallback={<Skeleton className="min-h-[150px]" />}>
          <Profit />
        </Suspense>
        <Suspense fallback={<Skeleton className="min-h-[150px]" />}>
          <Entries />
        </Suspense>
        <Suspense fallback={<Skeleton className="min-h-[150px]" />}>
          <Colleagues />
        </Suspense>
      </div>

      <Suspense fallback={<DataTableSkeleton columns={columns} />}>
        <RecentEntries />
      </Suspense>
    </div>
  );
}
