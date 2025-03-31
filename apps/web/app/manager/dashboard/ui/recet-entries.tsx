import { prisma } from "@workspace/db";
import { DataTable } from "./data-table";
import { columns } from "./column";

export default async function RecentEntries() {
  const data = await prisma.entry.findMany({
    take: 10,
    orderBy: {
      date: "desc",
    },
    select: {
      noOfItemsIn: true,
      noOfItemsOut: true,
      userId: true,
      user: {
        select: {
          name: true,
          imagePath: true,
          role: true,
          mobileNo: true,
          email: true,
        },
      },
      qrcode: {
        select: {
          sellingPrice: true,
          costPrice: true,
        },
      },
    },
  });
  const formatedData = data.map(
    ({ userId, noOfItemsIn, noOfItemsOut, user, qrcode }) => ({
      role: user.role,
      name: user.name,
      email: user.email,
      userId,
      mobileNo: user.mobileNo,
      imagePath: user.imagePath,
      productsSold: noOfItemsOut * qrcode.sellingPrice,
      productsReceived: noOfItemsIn * qrcode.costPrice,
    }),
  );

  return <DataTable data={formatedData} columns={columns} />;
}
