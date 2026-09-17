import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import userRouter from "./modules/user/user.route";
import authRouter from "./modules/auth/auth.route";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

// Routes
app.use("/api", authRouter);
app.use("/api", userRouter);

export default app;