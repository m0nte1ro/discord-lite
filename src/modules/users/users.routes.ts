import type { FastifyInstance } from "fastify";
import { createUserHandler, claimUsernameHandler } from "./users.controller.js";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/signin", createUserHandler);
  app.post("/claim", claimUsernameHandler);
}
