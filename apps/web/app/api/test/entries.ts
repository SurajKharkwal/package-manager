import { prisma } from "@workspace/db";
import { qrCodes } from "./qrcodes";

const accounts = ["user_1", "user_2", "user_3"];

const randomNumber = (low: number, high: number) =>
  Math.floor(low + Math.random() * (high - low + 1));

type Data = {
  noOfItemsIn: number;
  noOfItemsOut: number;
  qrcodeId: string;
  userId: string;
};

export async function generateEntries() {
  const arr: Data[] = qrCodes.map((ele) => {
    return {
      noOfItemsIn: randomNumber(1, 10),
      noOfItemsOut: randomNumber(1, 19),
      userId: accounts[randomNumber(0, accounts.length - 1)]!,
      qrcodeId: ele.code,
    };
  });

  // await prisma.qrcode.createMany({ data: qrCodes });

  await prisma.entry.createMany({ data: arr });
}

generateEntries()
  .then(() => console.log("Entries created successfully"))
  .catch((err) => console.error("Error creating entries", err));
