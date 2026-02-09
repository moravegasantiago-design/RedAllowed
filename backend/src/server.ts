import { Server } from "socket.io";
import { createServer } from "http";
import app from "./app";
import { chatOnline } from "./sockets/chat.socket";
import { PORT } from "./keysEnv";
const server = createServer(app);
const oi = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://192.168.101.15:5173",
      "http://127.0.0.1:5173",
      "https://red-allowed.vercel.app",
    ],
    credentials: true,
  },
});
chatOnline(oi);
const PUERT = PORT ?? 4000;
server.listen(PUERT, () => {
  console.log("Iniciando puerto" + PORT);
});
