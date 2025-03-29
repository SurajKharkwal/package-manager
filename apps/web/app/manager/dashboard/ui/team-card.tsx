import { prisma } from "@workspace/db";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { UserIcon } from "lucide-react";

export default async function Colleagues() {
  const count = await prisma.account.count();
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">Colleagues</CardTitle>
        <UserIcon />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+{count}</div>
        <p className="text-xs text-muted-foreground">
          Total colleagues we have working in the team.
        </p>
      </CardContent>
    </Card>
  );
}
