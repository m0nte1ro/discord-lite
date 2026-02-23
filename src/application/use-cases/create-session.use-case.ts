import { prisma } from "../../shared/lib/prisma.js";
import jwt from "jsonwebtoken";
import type { Session } from "../../shared/types/session.js";

const JWT_SECRET = process.env.JWT_SECRET!;
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

export async function createSession(userId: string): Promise<Session> {
  let expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  let token = jwt.sign({ sub: userId }, JWT_SECRET, {
    expiresIn: SESSION_DURATION_MS / 1000,
  });

  await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  });

  return {
    token,
    expiresAt,
  };
}
