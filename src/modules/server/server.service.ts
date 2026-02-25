import type { Server, ServerInput } from "./server.types.js";
import { createServer as repoCreateServer } from "./server.repository.js";
import { FailedToCreateServer } from "./server.errors.js";

export async function createServer(body: ServerInput): Promise<Server> {
    let server = await repoCreateServer(body.name);
    
    if (!server) {
        throw new FailedToCreateServer();
    }

    return {
        name: server.name,
        createdAt: server.createdAt
    };
}