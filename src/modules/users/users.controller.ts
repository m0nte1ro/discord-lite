import type { FastifyRequest, FastifyReply } from "fastify";
import * as usersService from "./users.service.js";
import type { CreateUserInput, ClaimUsernameInput } from "./users.types.js";

export async function createUserHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = request.body as CreateUserInput;

  const user = await usersService.createUser(body);

  return reply.code(201).send(user);
}

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

  const authResponse = await usersService.claimUsername(input);

  return reply.code(200).send(authResponse);
}
