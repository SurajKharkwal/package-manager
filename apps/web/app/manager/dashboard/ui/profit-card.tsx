import { prisma } from "@workspace/db";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { IndianRupee } from "lucide-react";

export default async function Profit() {
  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);
  const data = await prisma.entry.findMany({
    orderBy: { date: "desc" },
    select: {
      noOfItemsIn: true,
      noOfItemsOut: true,
      qrcode: {
        select: {
          sellingPrice: true,
          costPrice: true,
        },
      },
    },
    where: {
      date: {
        gte: lastWeek,
        lte: today,
      },
    },
  });
  let totalSellingPrice = 0;
  let totalCostPrice = 0;

  data.forEach(({ noOfItemsOut, noOfItemsIn, qrcode }) => {
    totalSellingPrice += noOfItemsOut * qrcode.sellingPrice;
    totalCostPrice += noOfItemsIn * qrcode.costPrice;
  });
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-medium">Total Revenue</CardTitle>
        <IndianRupee />
      </CardHeader>
      <CardContent>
        <div className="text-2xl flex items-center font-bold">
          <IndianRupee />
          {totalSellingPrice - totalCostPrice}
        </div>
        <p className="text-xs text-muted-foreground">
          +{totalSellingPrice} out of {totalCostPrice} from last month
        </p>
      </CardContent>
    </Card>
  );
}
