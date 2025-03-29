import { prisma } from "@workspace/db";

export default async function Page() {
  const user = await prisma.user.findFirst({});
  return <div>{user?.name ?? "No user Found"}</div>;
}
