import { prisma } from "../../shared/lib/prisma.js";

export function findClaimedUser(username: string) {
  return prisma.user.findFirst({
    where: {
      username,
      claimed: true,
    },
  });
}

export function findUserByID(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}
