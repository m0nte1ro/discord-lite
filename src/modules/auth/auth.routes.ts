import type { FastifyInstance } from "fastify";
import { loginHandler } from "./auth.controller.js";

export async function authRoutes(app: FastifyInstance) {
  app.post("/auth/login", loginHandler);
}
