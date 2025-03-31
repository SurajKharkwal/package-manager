"use server";

import { prisma } from "@workspace/db";

type QrCodeData = {
  name: string;
  costPrice: number;
  sellingPrice: number;
  description: string;
};

export async function upsertQrcode(code: string, data: QrCodeData) {
  return await prisma.qrcode.upsert({
    where: { code },
    update: { ...data },
    create: { ...data },
  });
}
