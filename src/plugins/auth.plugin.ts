import type { FastifyInstance, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "../shared/types/jwt.js";
import { findValidSessionByToken } from "../shared/infra/session-store.js";

const JWT_SECRET = process.env.JWT_SECRET!;

declare module "fastify" {
  interface FastifyRequest {
    user?: {
      id: string;
    };
  }
}

export async function authPlugin(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return;
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      return;
    }

    try {
      const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

      const session = findValidSessionByToken(token);

      if (!session) {
        return;
      }

      request.user = { id: payload.sub };
    } catch {
      // Invalid token, ignore and proceed without setting request.user
    }
  });
}
