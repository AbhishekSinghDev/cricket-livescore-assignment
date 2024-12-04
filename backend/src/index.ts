import "dotenv/config";
import http from "http";
import express, { Request, Response } from "express";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 9090;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

io.on("connection", (socket) => {
  console.log("user connected: ", socket.id);
});

server.listen(PORT, () => {
  console.log(`[server]: Server listening at PORT: ${PORT}`);
});
