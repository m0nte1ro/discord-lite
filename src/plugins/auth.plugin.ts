import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
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

async function authPlugin(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    const authHeader = request.headers.authorization;

    console.log("🔥 auth hook fired");

    if (!authHeader) return;

    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer" || !token) return;

    try {
      const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

      const session = await findValidSessionByToken(token);
      if (!session) return;

      request.user = { id: payload.sub };
    } catch {
      // ignore
    }
  });
}

export default fp(authPlugin);
