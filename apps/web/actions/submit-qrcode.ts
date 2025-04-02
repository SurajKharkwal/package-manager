"use server";

import { ItemType } from "@/app/crew/submit-data/page";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@workspace/db";

function toDateOnly(timestamp: string | number | Date): Date {
  const date = new Date(timestamp);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export async function sumbitAllEntries(data: ItemType[]) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized User");

  try {
    const results = await prisma.$transaction(
      data.map((ele) =>
        prisma.entry.upsert({
          where: {
            qrcodeId_date: {
              qrcodeId: ele.code,
              date: toDateOnly(new Date()),
            },
          },
          update: {
            noOfItemsIn: { increment: ele.noOfItemIn },
            noOfItemsOut: { increment: ele.noOfItemOut },
          },
          create: {
            qrcodeId: ele.code,
            userId,
            date: toDateOnly(new Date()),
            noOfItemsIn: ele.noOfItemIn,
            noOfItemsOut: ele.noOfItemOut,
          },
        }),
      ),
    );

    return results.map((res) => ({
      code: res.qrcodeId,
      noOfItemOut: res.noOfItemsOut,
      noOfItemIn: res.noOfItemsIn,
      status: "success",
    }));
  } catch (error) {
    console.error("Error processing entries:", error);
    return data.map((ele) => ({
      noOfItemOut: ele.noOfItemOut,
      noOfItemIn: ele.noOfItemIn,
      code: ele.code,
      status: "failed",
    }));
  }
}

export async function submitQrcode(
  code: string,
  noOfItemIn: number,
  noOfItemOut: number,
) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized User");

  await prisma.entry.upsert({
    where: {
      qrcodeId_date: {
        qrcodeId: code,
        date: toDateOnly(new Date()),
      },
    },
    update: {
      noOfItemsIn: { increment: noOfItemIn },
      noOfItemsOut: { increment: noOfItemOut },
    },
    create: {
      qrcodeId: code,
      userId,
      date: toDateOnly(new Date()),
      noOfItemsIn: noOfItemIn,
      noOfItemsOut: noOfItemOut,
    },
  });
}
