import express from "express";
import { read, list, update, Delete } from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/rbac.middleware";

const userRouter = express.Router();

userRouter.get("/user", authMiddleware, roleMiddleware(1), list);
userRouter.get("/user/:id", authMiddleware, read);
// userRouter.post("/user", create);
userRouter.put("/user/:id", update);
userRouter.delete("/user/:id", authMiddleware, roleMiddleware(1), Delete);

export default userRouter;
