import { prisma } from "@workspace/db";
import QrcodeForm from "./ui/form";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ qrcode?: string }>;
}) {
  const { qrcode } = await searchParams;

  if (!qrcode) return <QrcodeForm />;

  const data = await prisma.qrcode.findFirst({
    where: { code: qrcode },
  });

  if (!data) throw new Error("Qrcode is not right");

  return (
    <QrcodeForm
      description={data.code}
      costPrice={data.costPrice}
      sellingPrice={data.sellingPrice}
      name={data.name}
    />
  );
}
