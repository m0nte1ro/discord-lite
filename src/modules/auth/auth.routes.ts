import type { FastifyInstance } from "fastify";
import { loginHandler, claimUsernameHandler } from "./auth.controller.js";

export async function authRoutes(app: FastifyInstance) {
  app.post("/auth/login", loginHandler);
  app.post("/auth/claim", claimUsernameHandler);
}
