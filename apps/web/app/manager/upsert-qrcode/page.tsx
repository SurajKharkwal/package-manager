import { prisma } from "@workspace/db";
import QrcodeForm from "./ui/form";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ qrcode?: string }>;
}) {
  const { qrcode } = await searchParams;

  if (!qrcode) return <QrcodeForm code="" />;

  const data = await prisma.qrcode.findFirst({
    where: { code: qrcode },
  });

  if (!data) throw new Error("Qrcode is not right");

  return (
    <QrcodeForm
      code={qrcode ?? ""}
      description={data.description}
      costPrice={data.costPrice}
      sellingPrice={data.sellingPrice}
      name={data.name}
    />
  );
}
