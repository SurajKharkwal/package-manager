
"use server";

import { prisma } from "@workspace/db";

export async function getNofications (pageCount: number) {
    const data  = await prisma.notifications.findMany({
      skip: pageCount *10,
      take: (pageCount +1) *10,
      orderBy: {
        id: "desc"
      }
    })
  return {hasMore: data.length === 10, data};
}
