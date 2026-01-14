import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import authRouter from "./router/auth.route";
const app = express();
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || ["http://localhost:5175"].includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
const server = createServer(app);

const oi = new Server(server, {
  cors: {
    origin: "http://localhost:5175",
    credentials: true,
  },
});

oi.on("connection", (socket: Socket) => {
  socket.on("mensaje", (text: string) => {
    socket.emit("mensaje", {
      id: socket.id,
      text: text,
      date: new Date(),
    });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Iniciando puerto");
});
