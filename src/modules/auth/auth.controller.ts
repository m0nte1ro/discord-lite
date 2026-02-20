import type { FastifyRequest, FastifyReply } from "fastify";
import * as authService from "./auth.service.js";
import type { ClaimUsernameInput, LoginInput } from "./auth.types.js";

export async function claimUsernameHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (!request.user) {
    return reply.code(401).send({ error: "UNAUTHORIZED" });
  }

  const { password } = request.body as { password: string };
  const userId = request.user.id;

  const input: ClaimUsernameInput = {
    userId,
    password,
  };

  const authResponse = await authService.claimUsername(input);

  return reply.code(200).send(authResponse);
}

export async function loginHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = request.body as LoginInput;

  const authResponse = await authService.login(body);

  return reply.code(200).send(authResponse);
}
