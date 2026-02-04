import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./router/auth.route";
import chatRouter from "./router/chats.route";
import userRouter from "./router/user.route";
import followRouter from "./router/follow.route";
const app = express();
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        [
          "http://localhost:5173",
          "http://192.168.101.15:5173",
          "http://127.0.0.1:5173",
        ].includes(origin)
      ) {
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
app.use("/api/chat", chatRouter);
app.use("/api/user", userRouter);
app.use("/api/follow", followRouter);
export default app;
