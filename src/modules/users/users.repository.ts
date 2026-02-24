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

export function findUserByID(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export function claimUsernameDB(id: string, password: string) {
  return prisma.user.update({
    where: { id },
    data: {
      password: password,
      claimed: true,
    },
  });
}
