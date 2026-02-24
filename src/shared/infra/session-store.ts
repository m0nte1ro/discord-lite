import { prisma } from "../../shared/lib/prisma.js";

export async function findValidSessionByToken(token: string) {
  return prisma.session.findFirst({
    where: {
      token,
      expiresAt: { gt: new Date() },
    },
  });
}
