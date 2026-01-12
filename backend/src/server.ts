import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./router/auth.route";
const app = express();
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || ["http://localhost:5173"].includes(origin)) {
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Iniciando puerto");
});
