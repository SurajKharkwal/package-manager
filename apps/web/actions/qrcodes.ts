"use server";

import { auth } from "@clerk/nextjs/server";
import { PaginationState } from "@tanstack/react-table";
import { prisma } from "@workspace/db";

export async function deleteQrcode(code: string) {
  const { sessionClaims, userId } = await auth();
  const role = sessionClaims?.role;

  if (role === undefined || role === "CREW") throw new Error("Un authorized");

  try {
    await prisma.qrcode.delete({
      where: { code },
    });

    return {
      title: "QR Code Deleted",
      label: "Refresh",
      description: "To see the changes, please refresh the page.",
    };
  } catch (error) {
    return {
      title: "Error",
      label: "Try Again",
      description: "QR Code not found or deletion failed.",
    };
  }
}

export async function getQrcodeData(
  filterValue: string,
  { pageIndex, pageSize }: PaginationState,
) {
  const where = filterValue ? { code: { contains: filterValue } } : undefined;

  const [rowCount, data] = await prisma.$transaction([
    prisma.qrcode.count({ where }),
    prisma.qrcode.findMany({
      where,
      skip: pageIndex * pageSize,
      take: pageSize,
    }),
  ]);

  return { rowCount, data };
}
