import { prisma } from "../../shared/lib/prisma.js";

export async function createServer(name: string) {
    return prisma.server.create({
        data: {
            name: name,
            createdAt: new Date(),
        },
    });
}