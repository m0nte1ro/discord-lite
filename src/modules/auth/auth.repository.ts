import { prisma } from "../../shared/lib/prisma.js";

export function logoutUser(userId: string) {
  return prisma.session.deleteMany({
    where: {
      userId,
    },
  });
}

export function deleteSession(token: string) {
  return prisma.session.deleteMany({
    where: {
      token,
    },
  });
}
