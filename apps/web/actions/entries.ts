"use server";
import { PaginationState } from "@tanstack/react-table";
import { prisma } from "@workspace/db";

export async function getEntriesData({ pageIndex, pageSize }: PaginationState) {
  const [rowCount, data] = await prisma.$transaction([
    prisma.entry.count(),
    prisma.entry.findMany({
      skip: pageIndex * pageSize,
      take: pageSize,
    }),
  ]);

  return { rowCount, data };
}
