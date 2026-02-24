import { buildApp } from "./app.js";

const port = Number(process.env.PORT) || 3001;
const host = "0.0.0.0";

async function start() {
  try {
    const app = await buildApp();

    const closeSignals = ["SIGINT", "SIGTERM"];
    for (const signal of closeSignals) {
      process.on(signal, async () => {
        await app.close();
        process.exit(0);
      });
    }

    await app.listen({ port, host });
    console.log(`Server running on http://${host}:${port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
