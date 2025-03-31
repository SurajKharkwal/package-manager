"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma, Role } from "@workspace/db";

type Pagination = {
  pageIndex: number;
  pageSize: number;
};

export async function getTeamData(
  filterValue: string,
  { pageIndex, pageSize }: Pagination,
) {
  const where = filterValue ? { email: { contains: filterValue } } : undefined;

  const [rowCount, data] = await prisma.$transaction([
    prisma.account.count({ where }),
    prisma.account.findMany({
      where,
      skip: pageIndex * pageSize,
      take: pageSize,
    }),
  ]);

  return { rowCount, data };
}

export async function deleteUser(userId: string) {
  const { sessionClaims } = await auth();
  const role = sessionClaims?.role;

  if (!role || role !== "ADMIN") {
    return {
      title: "Unauthorized",
      description: "You do not have permission to delete users.",
      label: "OK",
    };
  }

  try {
    await prisma.account.delete({
      where: { userId },
    });
    return {
      title: "User Deleted",
      description: "For changes to take effect, please reload.",
      label: "Reload",
    };
  } catch (error) {
    return {
      title: "Error",
      description: "User not found or deletion failed.",
      label: "Try Again",
    };
  }
}

function getRole(toPromote: boolean, currentRole: Role): Role {
  const roles: Role[] = ["CREW", "MANAGER", "ADMIN"];
  const index = roles.indexOf(currentRole);

  if (toPromote) {
    return index < roles.length - 1 ? (roles[index + 1] as Role) : currentRole;
  } else {
    return index > 0 ? (roles[index - 1] as Role) : currentRole;
  }
}

export async function changeRole(userId: string, toPromote: boolean) {
  const { sessionClaims } = await auth();
  const role = sessionClaims?.role as Role;

  if (!role) throw new Error("Unauthenticated user");
  if (role !== "ADMIN") throw new Error("Unauthorized User");

  const userAccount = await prisma.account.findUnique({
    where: { userId },
    select: { role: true },
  });

  if (!userAccount) throw new Error("User not found");

  const newRole = getRole(toPromote, userAccount.role);

  const clerk = await clerkClient();
  await clerk.users.updateUserMetadata(userId, {
    publicMetadata: {
      role: newRole,
    },
  });

  await prisma.account.update({
    data: { role: newRole },
    where: { userId },
  });

  return {
    title: `Role changed to ${newRole}`,
    description: "For changes to take effect, please reload.",
    label: "Reload",
  };
}
