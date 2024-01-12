import { userSchema, userSchemaLogin } from "./../models/user.model";
import { loginController, signUpController } from "../controllers/user-auth.controller";
import express from "express";
import { ValidateRequestMiddleware } from "../../middlewares/validated.request.middleware";

const authRouter = express.Router();

authRouter.post(
  "/login",
  ValidateRequestMiddleware(userSchemaLogin),
  loginController
);

authRouter.post(
  "/register",
  ValidateRequestMiddleware(userSchema),
  signUpController
);

export { authRouter };
