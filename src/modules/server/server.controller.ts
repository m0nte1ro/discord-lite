import type { FastifyRequest, FastifyReply } from "fastify";
import type { ServerInput } from "./server.types.js";
import * as serverServices from "./server.service.js";

export async function createServerHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = request.body as ServerInput;

  const serverResponse = await serverServices.createServer(body);

  return reply.code(200).send(serverResponse);
}
