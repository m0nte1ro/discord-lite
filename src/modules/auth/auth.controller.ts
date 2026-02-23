import type { FastifyRequest, FastifyReply } from "fastify";
import * as authService from "./auth.service.js";
import type { LoginInput } from "./auth.types.js";

export async function loginHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = request.body as LoginInput;

  const authResponse = await authService.login(body);

  return reply.code(200).send(authResponse);
}
