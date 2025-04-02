import { Button, buttonVariants } from "@workspace/ui/components/button";
import Scanner from "./ui/scanner";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ cameraId: string; cameraLabel: string }>;
}) {
  const { cameraId, cameraLabel } = await searchParams;
  if (!cameraLabel && !cameraId)
    throw new Error("cameraId and cameraLabel not found");
  return (
    <div className="w-full flex flex-col gap-8 items-center justify-center min-h-dvh">
      <Scanner cameraLabel={cameraLabel} cameraId={cameraId} />
      <Link
        className={buttonVariants({ variant: "outline" })}
        href={"/crew/submit-data"}
      >
        Submit All
      </Link>
    </div>
  );
}
