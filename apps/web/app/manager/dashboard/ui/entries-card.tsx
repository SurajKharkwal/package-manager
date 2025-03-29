import { prisma } from "@workspace/db";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { List } from "lucide-react";

export default async function Entries() {
  const count = await prisma.entry.count();
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">Entries</CardTitle>
        <List />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+{count}</div>
        <p className="text-xs text-muted-foreground">
          Today&apos;s total in and out
        </p>
      </CardContent>
    </Card>
  );
}
