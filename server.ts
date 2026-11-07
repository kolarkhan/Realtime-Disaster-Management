import { createServer } from "node:http";
import next from "next";
import { Server as SocketIOServer } from "socket.io";

declare global {
  // eslint-disable-next-line no-var
  var __io: SocketIOServer | undefined;
}

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

async function bootstrap() {
  await app.prepare();

  const httpServer = createServer((req, res) => {
    handler(req, res);
  });

  const io = new SocketIOServer(httpServer, {
    path: "/socket.io",
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
      credentials: true
    }
  });

  global.__io = io;

  io.on("connection", (socket) => {
    socket.on("subscribe", (payload: { role?: string; userId?: string }) => {
      if (payload.role) {
        socket.join(`role:${payload.role}`);
      }

      if (payload.userId) {
        socket.join(`user:${payload.userId}`);
      }
    });
  });

  httpServer.listen(port, hostname, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
}

bootstrap().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
