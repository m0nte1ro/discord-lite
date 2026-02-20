import { prisma } from "../../shared/lib/prisma.js";

export function claimUsernameDB(id: string, password: string) {
  return prisma.user.update({
    where: { id },
    data: {
      password: password,
      claimed: true,
    },
  });
}
