import express from "express";
import { authenticateHandler } from "../../middlewares/auth.middleware";
import { getUserController } from "../controllers/user.controller";
const userRouter = express.Router();

userRouter.get("/", authenticateHandler, getUserController);

export {userRouter}