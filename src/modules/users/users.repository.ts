import { prisma } from "../../shared/lib/prisma.js";

export async function findGuestUser(username: string) {
  return prisma.user.findFirst({
    where: {
      username,
      claimed: false,
    },
  });
}

export async function createGuestUser(username: string, displaySuffix: string) {
  return prisma.user.create({
    data: {
      username,
      displaySuffix,
      claimed: false,
    },
  });
}
