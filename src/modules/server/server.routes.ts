import type { FastifyInstance } from "fastify";
import { createServerHandler } from "./server.controller.js";

export async function authRoutes(app: FastifyInstance) {
  app.post("/server", createServerHandler);
}
