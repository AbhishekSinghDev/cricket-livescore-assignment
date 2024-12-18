import "dotenv/config";
import http from "http";
import express, { Request, Response } from "express";
import { Server } from "socket.io";
import cors from "cors";
import Env, { verifyEnv } from "./lib/env";
import connectDatabase from "./lib/connect-db";
import { errorHandler } from "./utils";

// routes
import AuthRoutes from "./routes/auth";
import UserRoutes from "./routes/user";
import MatchRoutes from "./routes/match";

import { universalApiRateLimiterMiddleware } from "./middleware";
import { corsOptions } from "./constants";
import SocketEvents from "./lib/socket-events";

verifyEnv(); // this function checks all the env vars before starting any process makesure at runtime we are not getting any env var as undefined.

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: corsOptions,
});

app.use(universalApiRateLimiterMiddleware); // limits 1000 req per ip address for 15 min [prevent api spamming]
app.use(express.json());
app.use(cors(corsOptions));

// routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/match", MatchRoutes);

app.use(errorHandler);

connectDatabase();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

io.on(SocketEvents.connect, (socket) => {
  console.log("socket connected: ", socket.id);
});

const PORT = Env.PORT;
server.listen(PORT, () => {
  console.log(`[server]: Server listening at PORT: ${PORT}`);
});
