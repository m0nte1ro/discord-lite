import Fastify from "fastify";
import websocket from "@fastify/websocket";
import { prisma } from "./prisma.js";

const app = Fastify({ logger: true });

app.register(websocket);

app.get("/health", async () => {
  return { status: "ok" };
});

app.post("/users", async (req, reply) => {
  const { username } = req.body as { username: string };

  const user = await prisma.user.create({
    data: {
      username,
      displaySuffix: Math.random().toString(36).slice(2, 8).toUpperCase(),
      claimed: false
    }
  });

  return user;
});

const port = Number(process.env.PORT) || 3001;

app.listen({ port: port, host: "0.0.0.0" })
  .then(() => console.log("Server running on 3001"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });