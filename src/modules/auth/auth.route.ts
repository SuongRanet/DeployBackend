import express from "express";
import { loginController, registerController } from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/auth/register", registerController);
authRouter.post("/auth/login", loginController);
// authRouter.get("/auth/:id", read);
// authRouter.put("/auth/:id", update);
// authRouter.delete("/auth/:id", Delete);


export default  authRouter;