"use server";
import { prisma } from "@workspace/db";

type QrCodeData = {
  name: string;
  costPrice: number;
  sellingPrice: number;
  description: string;
};

export async function upsertQrcode(code: string, data: QrCodeData) {
  try {
    if (code === "") {
      return await prisma.qrcode.create({
        data,
      });
    }
    return await prisma.qrcode.update({
      where: { code },
      data,
    });
  } catch (error) {
    console.error("Error upserting QR code:", error);
    throw new Error("Failed to upsert QR code");
  }
}
