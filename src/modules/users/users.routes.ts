import type { FastifyInstance } from "fastify";
import { createUserHandler } from "./users.controller.js";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/signin", createUserHandler);
}
